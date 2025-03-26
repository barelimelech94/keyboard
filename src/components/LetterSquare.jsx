import React from 'react';
import '../styles/LetterSquare.css';

export const LetterSquare = ({ letter, status }) => {
    const classNames = ['letter-square'];
    if (status === 'success') classNames.push('success');
    if (status === 'error') classNames.push('error');

    return <div className={classNames.join(' ')}>{letter}</div>;
};
