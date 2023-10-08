// frontend/src/components/BookRow.tsx
import React from 'react';

interface Props {
  book: { id: number; title: string; status: string };
  onUpdateStatus: (id: number, title: string, status: string) => void;
  onDelete: (id: number) => void;
}

const BookRow: React.FC<Props> = ({ book, onUpdateStatus, onDelete }) => {
  return (
    <div className="border p-4 rounded bg-black">
      <h2 className="text-lg font-bold">{book.title}</h2>
      <div className="mt-2 flex space-x-2">
      <button type="button" className={`py-1 px-2 rounded ${book.status === 'to-read' ? 'bg-green-500' : 'bg-yellow-500'} text-white`} onClick={() => onUpdateStatus(book.id, book.title, 'to-read')}>
          To read
        </button>
        <button type="button" className={`py-1 px-2 rounded ${book.status === 'reading' ? 'bg-green-500' : 'bg-yellow-500'} text-white`} onClick={() => onUpdateStatus(book.id, book.title, 'reading')}>
          Reading
        </button>
        <button type="button" className={`py-1 px-2 rounded ${book.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'} text-white`} onClick={() => onUpdateStatus(book.id, book.title, 'completed')}>
          Completed
        </button>

        <button type="button" className="bg-red-500 text-white py-1 px-2 rounded" onClick={() => onDelete(book.id)}>
          Delete
        </button>

      </div>
    </div>
  );
};

export default BookRow;
