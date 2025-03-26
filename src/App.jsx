import React, { useState, useEffect, useRef } from 'react';
import { LetterSquare } from './components/LetterSquare';
import { Keyboard } from './components/Keyboard';
import { isValidWord } from './utils/dictionary';
import { MyActionListener } from './utils/MyActionListener';
import './App.css';

const MAX_LETTERS = 5;

export function App() {
    const [letters, setLetters] = useState([]);
    const [status, setStatus] = useState('');
    const actionListenerRef = useRef(new MyActionListener());
    const actionListener = actionListenerRef.current;

    useEffect(() => {
        const handleEnter = async (data) => {
            const valid = await isValidWord(data);
            setStatus(valid ? 'success' : 'error');
        };

        actionListener.registerListener('ENTER', handleEnter);
        return () => {
            actionListener.removeListener('ENTER');
        };
    }, [actionListener]);

    const handleEnterClick = () => {
        if (letters.length === MAX_LETTERS) {
            try {
                actionListener.emit('ENTER', letters.join(''));
            } catch (error) {
                console.error(error.message);
            }
        }
    };
    const handleBackspaceClick = () => {
        if (letters.length > 0) {
            setLetters((prev) => prev.slice(0, -1));
            setStatus('');
        }
    };

    const handleLetterKeyClick = (key) => {
        if (letters.length < MAX_LETTERS) {
            setLetters((prev) => [...prev, key]);
            setStatus('');
        }
    };
    const handleKeyClick = (key) => {
        if (key === 'ENTER') {
            handleEnterClick();
        } else if (key === '⌫') {
            handleBackspaceClick();
        } else {
            handleLetterKeyClick(key);
        }
    };

    const squares = [];
    for (let i = 0; i < MAX_LETTERS; i++) {
        squares.push(<LetterSquare key={i} letter={letters[i] || ''} status={status} />);
    }

    return (
        <div className="app">
            <div className="squares">{squares}</div>
            <Keyboard onKeyClick={handleKeyClick} />
        </div>
    );
}
