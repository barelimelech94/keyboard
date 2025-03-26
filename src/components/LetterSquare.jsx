import React from 'react';
import '../styles/LetterSquare.css';

export const LetterSquare = ({ letter, status }) => {
    return <div className={`letter-square ${status}`}>{letter}</div>;
};
