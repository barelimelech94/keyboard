import React, { memo } from 'react';
import config from '../config/config';
import '../styles/LetterSquares.css';

export const LetterSquares = memo(({ letters, status }) => {
    // console.log('LETTER SQUARES RENDERED');
    return (
        <div className="squares">
            {Array.from({ length: config.MAX_LETTERS }, (_, i) => (
                <div key={i} className={`letter-square ${status}`}>
                    {letters[i] || ''}
                </div>
            ))}
        </div>
    );
});
