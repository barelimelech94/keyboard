const config = {
    // Min/Max letters allowed
    MAX_LETTERS: 5,
    MIN_LETTERS: 2,

    // Constant Names
    ENTER_NAME: 'ENTER',
    BACKSPACE_NAME: 'BACKSPACE',

    // Actions
    ACTION_ENTER: 'ENTER_ACTION',
    ACTION_BACKSPACE: 'BACKSPACE_ACTION',
    ACTION_LETTER: 'LETTER_ACTION',

    // Statuses
    STATUS_SUCCESS: 'success',
    STATUS_FAILURE: 'failure',
    STATUS_ERROR: 'error',

    // Keyboard layout
    KEYBOARD_ROWS: [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
    ],

    // Key mapping for special keys
    KEY_MAP: {
        Backspace: '⌫',
        Enter: 'ENTER',
    },
};

export default config;
