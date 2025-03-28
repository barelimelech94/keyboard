import React from 'react';
import '../styles/Keyboard.css';
import { KEY_ROWS } from '../config/constants';

export const Keyboard = ({ onKeyClick, activeKey }) => {
    return (
        <div className="keyboard">
            {KEY_ROWS.map((keyRow, rowIndex) => (
                <div key={`row-${rowIndex}`} className="keyboard-row">
                    {keyRow.map((key) => (
                        <button
                            key={key}
                            tabIndex="-1"
                            onMouseDown={(e) => e.preventDefault()}
                            className={activeKey === key ? 'pressed' : ''}
                            onClick={() => onKeyClick(key)}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
};
