// frontend/tests/BookTable.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import BookTable from '../components/BookTable';

test('renders book table correctly', () => {
  const books = [
    { id: 1, title: 'Book 1', status: 'to-read' },
    { id: 2, title: 'Book 2', status: 'in-progress' },
    { id: 3, title: 'Book 3', status: 'completed' },
  ];

  render(<BookTable books={books} onUpdateStatus={() => {}} onDelete={() => {}} />);

  expect(screen.getByText('Book 1')).toBeInTheDocument();
  expect(screen.getByText('Book 2')).toBeInTheDocument();
  expect(screen.getByText('Book 3')).toBeInTheDocument();
});
