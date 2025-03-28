import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LetterSquares } from './components/LetterSquares';
import { Keyboard } from './components/Keyboard';
import { isValidWord } from './utils/dictionary';
import { MyActionListener } from './utils/MyActionListener';
import {
    KEY_MAP,
    MAX_LETTERS,
    STATUS_SUCCESS,
    STATUS_ERROR,
    ACTION_BACKSPACE,
    ACTION_LETTER,
    ACTION_ENTER,
} from './config/constants';
import './App.css';

export function App() {
    const [status, setStatus] = useState('');
    const [letters, setLetters] = useState([]);
    const [checking, setChecking] = useState(false);
    const [activeKey, setActiveKey] = useState('');

    const actionListenerRef = useRef(new MyActionListener());
    const actionListener = actionListenerRef.current;

    useEffect(() => {
        const handleEnter = async (wordToCheck) => {
            setChecking(true);
            const valid = await isValidWord(wordToCheck);
            setStatus(valid ? STATUS_SUCCESS : STATUS_ERROR);
            setChecking(false);
        };

        const handleBackspace = () => {
            setLetters((prev) => prev.slice(0, -1));
            setStatus('');
        };

        const handleLetter = (letter) => {
            setLetters((prev) => [...prev, letter]);
        };

        actionListener.registerListener(ACTION_ENTER, handleEnter);
        actionListener.registerListener(ACTION_BACKSPACE, handleBackspace);
        actionListener.registerListener(ACTION_LETTER, handleLetter);
        return () => {
            actionListener.removeListener(ACTION_ENTER);
            actionListener.removeListener(ACTION_BACKSPACE, handleBackspace);
            actionListener.removeListener(ACTION_LETTER, handleLetter);
        };
    }, [actionListener]);

    const handleEnterClick = () => {
        if (letters.length === MAX_LETTERS) {
            try {
                actionListener.emit(ACTION_ENTER, letters.join(''));
            } catch (error) {
                console.error(error.message);
            }
        }
    };
    const handleBackspaceClick = () => {
        if (letters.length > 0) {
            actionListener.emit(ACTION_BACKSPACE);
        }
    };

    const handleLetterKeyClick = (letter) => {
        if (letters.length < MAX_LETTERS) {
            actionListener.emit(ACTION_LETTER, letter);
        }
    };
    const handleKeyClick = useCallback((key) => {
        const upperKey = key.toUpperCase();
        setActiveKey(upperKey);
        if (upperKey === ACTION_ENTER) {
            handleEnterClick();
        } else if (key === '⌫' || upperKey === 'BACKSPACE') {
            handleBackspaceClick();
        } else if (/^[a-zA-Z]$/.test(key)) {
            handleLetterKeyClick(key);
        }
    });

    useEffect(() => {
        const handleGlobalKeyDown = (event) => {
            if (!checking) {
                const key = KEY_MAP[event.key] || event.key;
                handleKeyClick(key);
            }
        };
        const handleGlobalKeyUp = () => {
            setActiveKey('');
        };

        window.addEventListener('keyup', handleGlobalKeyUp);
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => {
            window.removeEventListener('keyup', handleGlobalKeyUp);
            window.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, [checking, handleKeyClick]);

    return (
        <div className="app">
            {checking ? <h2 className="simple-pulse">Checking Word...</h2> : <h2>Type Anything</h2>}
            <LetterSquares letters={letters} status={status}></LetterSquares>
            <Keyboard onKeyClick={handleKeyClick} activeKey={activeKey}></Keyboard>
        </div>
    );
}
