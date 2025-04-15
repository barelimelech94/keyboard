import React, { memo } from 'react';
import config from '../config/config';
import '../styles/Keyboard.css';

export const Keyboard = memo(({ onKeyClick, activeKey }) => {
    // console.log('KEYBOARD RENDERED');
    return (
        <div className="keyboard" data-testid="keyboard">
            {config.KEYBOARD_ROWS.map((keyRow, rowIndex) => (
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
});
