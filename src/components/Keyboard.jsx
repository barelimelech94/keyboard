import React from 'react';
import '../styles/Keyboard.css';

export const Keyboard = ({ onKeyClick }) => {
    // prettier-ignore
    const keysRows = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['ENTER','Z','X','C','V','B','N','M', '⌫']
  ];

    return (
        <div className="keyboard">
            {keysRows.map((keyRow, rowIndex) => (
                <div key={`row-${rowIndex}`} className="keyboard-row">
                    {keyRow.map((key) => (
                        <button key={key} onClick={() => onKeyClick(key)}>
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
};
