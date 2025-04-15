import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from '../src/App';
import { isValidWord } from '../src/utils/dictionary';

jest.mock('../src/utils/dictionary', () => ({
  isValidWord: jest.fn(),
}));

describe('App Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders initial UI correctly', () => {
        render(<App />);
        expect(screen.getByText('Type Anything')).toBeInTheDocument();
    });

    test('handles letter input correctly', () => {
        render(<App />);
        const letter = 'A';
        fireEvent.keyDown(window, { key: letter });
        const letterSquare = screen.getByTestId('letter-squares');
        expect(letterSquare).toHaveTextContent(letter);
    });

    test('handles backspace correctly', () => {
        render(<App />);
        fireEvent.keyDown(window, { key: 'A' });
        fireEvent.keyDown(window, { key: 'Backspace' });
        const letterSquare = screen.getByTestId('letter-squares');
        expect(letterSquare).not.toHaveTextContent('A');
    });

    test('validates word on Enter key press', async () => {
        isValidWord.mockResolvedValueOnce(true);
        render(<App />);

        fireEvent.keyDown(window, { key: 'A' });
        fireEvent.keyDown(window, { key: 'B' });
        fireEvent.keyDown(window, { key: 'Enter' });

        const successSquare = await screen.findByTestId('letter-squares');
        expect(successSquare.querySelector('.success')).toBeInTheDocument();
    });

    test('shows error for invalid word', async () => {
        isValidWord.mockResolvedValueOnce(false);
        render(<App />);

        fireEvent.keyDown(window, { key: 'A' });
        fireEvent.keyDown(window, { key: 'B' });
        fireEvent.keyDown(window, { key: 'Enter' });

        const failureSquare = await screen.findByTestId('letter-squares');
        expect(failureSquare.querySelector('.failure')).toBeInTheDocument();
    });

    test('handles error during word validation', async () => {
        isValidWord.mockRejectedValueOnce(new Error('Network Error'));
        render(<App />);

        fireEvent.keyDown(window, { key: 'A' });
        fireEvent.keyDown(window, { key: 'B' });
        fireEvent.keyDown(window, { key: 'Enter' });

        const errorSquare = await screen.findByTestId('letter-squares');
        expect(errorSquare.querySelector('.error')).toBeInTheDocument();
    });

    test('resets state after validation', async () => {
        isValidWord.mockResolvedValueOnce(true);
        render(<App />);

        fireEvent.keyDown(window, { key: 'A' });
        fireEvent.keyDown(window, { key: 'Enter' });
        await screen.findByTestId('letter-squares');

        fireEvent.keyDown(window, { key: 'B' });
        expect(screen.queryByTestId('letter-squares').querySelector('.success')).toBeNull();
    });

    test('ignores invalid key inputs', () => {
        render(<App />);
        fireEvent.keyDown(window, { key: '1' }); // Invalid input
        fireEvent.keyDown(window, { key: '@' }); // Invalid input
        const letterSquare = screen.getByTestId('letter-squares');
        expect(letterSquare).toHaveTextContent(''); // No letters should be added
    });
});