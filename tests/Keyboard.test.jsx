import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Keyboard } from '../src/components/Keyboard';
import config from '../src/config/config';

describe('Keyboard Component', () => {
    test('renders without crashing', () => {
        render(<Keyboard />);
        expect(screen.getByTestId('keyboard')).toBeInTheDocument();
    });

    test('renders the correct number of rows and keys', () => {
        render(<Keyboard onKeyClick={() => {}} activeKey={null} />);
        const rows = screen.getByTestId('keyboard').querySelectorAll('.keyboard-row');
        expect(rows).toHaveLength(config.KEYBOARD_ROWS.length);

        rows.forEach((row, index) => {
            const keys = row.querySelectorAll('button');
            expect(keys).toHaveLength(config.KEYBOARD_ROWS[index].length);
        });
    });

    test('triggers onKeyClick with the correct key', () => {
        const mockOnKeyClick = jest.fn();
        render(<Keyboard onKeyClick={mockOnKeyClick} activeKey={null} />);

        const firstKey = screen.getByText(config.KEYBOARD_ROWS[0][0]);
        firstKey.click();

        expect(mockOnKeyClick).toHaveBeenCalledWith(config.KEYBOARD_ROWS[0][0]);
    });

    test('applies the pressed class to the active key', () => {
        const activeKey = config.KEYBOARD_ROWS[0][0];
        render(<Keyboard onKeyClick={() => {}} activeKey={activeKey} />);

        const activeButton = screen.getByText(activeKey);
        expect(activeButton).toHaveClass('pressed');
    });
});
