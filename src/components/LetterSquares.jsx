import React from 'react';
import { MAX_LETTERS } from './constants';
import '../styles/LetterSquares.css';

export const LetterSquares = ({ letters, status }) => {
    return (
        <div className="squares">
            {Array.from({ length: MAX_LETTERS }, (_, i) => (
                <div key={i} className={`letter-square ${status}`}>
                    {letters[i]}
                </div>
            ))}
        </div>
    );
};
