import React from 'react';
import '../styles/LetterSquares.css';

export const LetterSquares = ({ letters, status, maxLength }) => {
    return (
        <div className="squares">
            {Array.from({ length: maxLength }, (_, i) => (
                <div key={i} className={`letter-square ${status}`}>
                    {letters[i] || ''}
                </div>
            ))}
        </div>
    );
};
