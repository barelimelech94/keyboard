import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LetterSquares } from '../src/components/LetterSquares';
import config from '../src/config/config';

describe('LetterSquares Component', () => {
    test('renders without crashing', () => {
        render(<LetterSquares letters={['A', 'B', 'C']} status="success" />);
        expect(screen.getByTestId('letter-squares')).toBeInTheDocument();
    });

    test('renders the correct number of squares', () => {
        render(<LetterSquares letters={['A', 'B', 'C']} status="success" />);
        const squares = screen.getByTestId('letter-squares').querySelectorAll('.letter-square');
        expect(squares).toHaveLength(config.MAX_LETTERS);
    });

    test('displays the correct letters in squares', () => {
        render(<LetterSquares letters={['A', 'B', 'C']} status="success" />);
        const squares = screen.getByTestId('letter-squares').querySelectorAll('.letter-square');
        expect(squares[0]).toHaveTextContent('A');
        expect(squares[1]).toHaveTextContent('B');
        expect(squares[2]).toHaveTextContent('C');
        for (let i = 3; i < config.MAX_LETTERS; i++) {
            expect(squares[i]).toHaveTextContent('');
        }
    });

    test('applies the correct status class to squares', () => {
        render(<LetterSquares letters={['A', 'B', 'C']} status="success" />);
        const squares = screen.getByTestId('letter-squares').querySelectorAll('.letter-square');
        squares.forEach((square) => {
            expect(square).toHaveClass('success');
        });
    });
});
