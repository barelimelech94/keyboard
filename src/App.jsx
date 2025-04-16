import React, { useState, useEffect, useCallback } from 'react';
import config from './config/config';
import { LetterSquares } from './components/LetterSquares';
import { Keyboard } from './components/Keyboard';
import { isValidWord } from './utils/dictionary';
import './App.css';

export function App() {
    const [status, setStatus] = useState('');
    const [letters, setLetters] = useState([]);
    const [checking, setChecking] = useState(false);
    const [activeKey, setActiveKey] = useState('');
    const [checkedOnce, setCheckedOnce] = useState(false);

    // Handle Enter key: validate word and update status
    const handleEnter = useCallback(async () => {
        if (letters.length >= config.MIN_LETTERS && letters.length <= config.MAX_LETTERS) {
            setChecking(true);
            try {
                const valid = await isValidWord(letters.join(''));
                setStatus(valid ? config.STATUS_SUCCESS : config.STATUS_FAILURE);
                setCheckedOnce(true);
            } catch (error) {
                setStatus(config.STATUS_ERROR);
                console.error(error.message);
            } finally {
                setChecking(false);
            }
        }
    }, [letters]);

    // Handle backspace: remove last letter
    const handleBackspace = useCallback(() => {
        setLetters((prev) => prev.slice(0, -1));
        setStatus('');
    }, []);

    // Handle letter input: append letter
    const handleLetter = useCallback(
        (letter) => {
            setLetters((prev) => {
                if (checkedOnce) {
                    setCheckedOnce(false);
                    setStatus('');
                    return [letter];
                }
                if (prev.length < config.MAX_LETTERS) {
                    return [...prev, letter];
                }
                return prev;
            });
        },
        [checkedOnce]
    );

    // Handle on-screen key press
    const handleKeyClick = useCallback(
        (key) => {
            const upperKey = key.toUpperCase();
            setActiveKey(upperKey);

            if (upperKey === config.ENTER_NAME) {
                handleEnter();
            } else if (key === '⌫' || upperKey === 'BACKSPACE') {
                handleBackspace();
            } else if (/^[a-zA-Z]$/.test(key)) {
                handleLetter(key);
            }
        },
        [handleEnter, handleBackspace, handleLetter]
    );

    // Handle physical keyboard input
    const handleGlobalKeyDown = useCallback(
        (event) => {
            if (!checking) {
                const key = config.KEY_MAP[event.key] || event.key;
                handleKeyClick(key);
            }
        },
        [checking, handleKeyClick]
    );

    // Clear active key state
    const resetActiveKey = () => {
        setActiveKey('');
    };

    // Register global key/mouse events
    useEffect(() => {
        const windowEventHandlers = {
            mouseout: resetActiveKey,
            keyup: resetActiveKey,
            keydown: handleGlobalKeyDown,
        };

        Object.entries(windowEventHandlers).forEach(([event, handler]) => {
            window.addEventListener(event, handler);
        });

        return () => {
            Object.entries(windowEventHandlers).forEach(([event, handler]) => {
                window.removeEventListener(event, handler);
            });
        };
    }, [handleGlobalKeyDown]);

    return (
        <div className="app">
            {checking ? <h2 className="simple-pulse">Checking Word...</h2> : <h2>Type Anything</h2>}
            <LetterSquares letters={letters} status={status} />
            <Keyboard onKeyClick={handleKeyClick} activeKey={activeKey} />
        </div>
    );
}
