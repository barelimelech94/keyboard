import React from 'react';
import '../styles/LetterSquares.css';

export const LetterSquare = ({ letters, status }) => {
    return (
        <div className="square">
            {letters.map((letter) => {
                <div className={`letter-square ${status}`}>{letter}</div>;
            })}
        </div>
    );
};
