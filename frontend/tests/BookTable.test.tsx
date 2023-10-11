import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import BookTable from '../components/BookTable';

test('renders book table correctly', () => {
  const books = [
    { id: 1, title: 'Book 1', status: 'to-read' },
    { id: 2, title: 'Book 2', status: 'reading' },
    { id: 3, title: 'Book 3', status: 'completed' },
  ];

  render(<BookTable books={books} onUpdateStatus={() => {}} onDelete={() => {}} />);

  expect(screen.getByText('Book 1')).toBeInTheDocument();
});

test('calls onUpdateStatus correctly', async () => {
  const onUpdateStatusMock = jest.fn();
  const books = [
    { id: 1, title: 'Book 1', status: 'to-read' },
    { id: 2, title: 'Book 2', status: 'reading' },
    { id: 3, title: 'Book 3', status: 'completed' },
  ];

  render(<BookTable books={books} onUpdateStatus={onUpdateStatusMock} onDelete={() => {}} />);

  const inProgressButtons = screen.getAllByText('Reading');

  // Simulate button clicks
  inProgressButtons.forEach(button => {
    fireEvent.click(button);
  });

  // Wait for changes to reflect in the DOM
  await waitFor(() => {
    expect(onUpdateStatusMock).toHaveBeenCalledTimes(3);
    expect(onUpdateStatusMock).toHaveBeenCalledWith(1, "Book 1", 'reading');
    expect(onUpdateStatusMock).toHaveBeenCalledWith(2, "Book 2", 'reading');
    expect(onUpdateStatusMock).toHaveBeenCalledWith(3, "Book 3", 'reading');
  });
});

test('calls onDelete correctly', () => {
  const onDeleteMock = jest.fn();
  const books = [
    { id: 1, title: 'Book 1', status: 'to-read' },
    { id: 2, title: 'Book 2', status: 'reading' },
    { id: 3, title: 'Book 3', status: 'completed' },
  ];

  render(<BookTable books={books} onUpdateStatus={() => {}} onDelete={onDeleteMock} />);

  const deleteButtons = screen.getAllByText('Delete');
  deleteButtons.forEach((button) => {
    fireEvent.click(button);
  });

  // Check if onDelete is called with correct argument
  expect(onDeleteMock).toHaveBeenCalledWith(1);
});
