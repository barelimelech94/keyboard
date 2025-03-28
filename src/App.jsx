import React, { useState, useEffect, useRef, useCallback } from 'react';
import config from './config/config';
import { LetterSquares } from './components/LetterSquares';
import { Keyboard } from './components/Keyboard';
import { isValidWord } from './utils/dictionary';
import { MyActionListener } from './utils/MyActionListener';
import './App.css';

export function App() {
    const [status, setStatus] = useState('');
    const [letters, setLetters] = useState([]);
    const [checking, setChecking] = useState(false);
    const [activeKey, setActiveKey] = useState('');

    // Persistent instance of action listener
    const actionListenerRef = useRef(new MyActionListener());
    const actionListener = actionListenerRef.current;

    // Handle Enter key: validate word and update status
    const handleEnter = useCallback(async (wordToCheck) => {
        setChecking(true);
        try {
            const valid = await isValidWord(wordToCheck);
            setStatus(valid ? config.STATUS_SUCCESS : config.STATUS_FAILURE);
        } catch (error) {
            setStatus(config.STATUS_ERROR);
            console.error(error.message);
        } finally {
            setChecking(false);
        }
    }, []);

    // Handle backspace: remove last letter
    const handleBackspace = useCallback(() => {
        setLetters((prev) => prev.slice(0, -1));
        setStatus('');
    }, []);

    // Handle letter input: append letter
    const handleLetter = useCallback((letter) => {
        setLetters((prev) => [...prev, letter]);
    }, []);

    // Handle on-screen key press
    const handleKeyClick = useCallback(
        (key) => {
            const upperKey = key.toUpperCase();
            setActiveKey(upperKey);

            if (upperKey === config.ENTER_NAME && letters.length === config.MAX_LETTERS) {
                actionListener.emit(config.ACTION_ENTER, letters.join(''));
            } else if ((key === '⌫' || upperKey === 'BACKSPACE') && letters.length > 0) {
                actionListener.emit(config.ACTION_BACKSPACE);
            } else if (/^[a-zA-Z]$/.test(key) && letters.length < config.MAX_LETTERS) {
                actionListener.emit(config.ACTION_LETTER, key);
            }
        },
        [actionListener, letters]
    );

    // Register action handlers
    useEffect(() => {
        const actionEventHandlers = {
            [config.ACTION_ENTER]: handleEnter,
            [config.ACTION_BACKSPACE]: handleBackspace,
            [config.ACTION_LETTER]: handleLetter,
        };

        Object.entries(actionEventHandlers).forEach(([actionEvent, handler]) => {
            actionListener.registerListener(actionEvent, handler);
        });

        return () => {
            Object.keys(actionEventHandlers).forEach((action) => {
                actionListener.removeListener(action);
            });
        };
    }, [actionListener, handleBackspace, handleEnter, handleLetter]);

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
    }, [checking, handleGlobalKeyDown, handleKeyClick]);

    return (
        <div className="app">
            {checking ? <h2 className="simple-pulse">Checking Word...</h2> : <h2>Type Anything</h2>}
            <LetterSquares letters={letters} status={status} />
            <Keyboard onKeyClick={handleKeyClick} activeKey={activeKey} />
        </div>
    );
}
