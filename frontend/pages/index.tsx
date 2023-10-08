// frontend/src/pages/index.tsx
import React, { useState, useEffect } from 'react';
import { getBooks, addBook, updateBookStatus, deleteBook } from '../services/bookServices';
import BookTable from '../components/BookTable';
import Notification from '../components/Notification';
import '../app/globals.css';

const Home: React.FC = () => {
  const [books, setBooks] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [notification, setNotification] = useState('');

  const fetchBooks = async () => {
    const fetchedBooks = await getBooks();
    setBooks(fetchedBooks);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async () => {
    if (newBookTitle) {
      await addBook(newBookTitle);
      fetchBooks();
      setNewBookTitle('');
    }
  };

  const handleUpdateBookStatus = async (id: number, title: string, status: string) => {
    await updateBookStatus(id, title, status);
    fetchBooks();
  };

  const handleDeleteBook = async (id: number) => {
    await deleteBook(id);
    fetchBooks();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Book Tracking App</h1>
      <div className="mb-4 flex">
        <input
          type="text"
          className="border text-black rounded py-1 px-2 mr-2"
          placeholder="Enter book title"
          value={newBookTitle}
          onChange={(e) => setNewBookTitle(e.target.value)}
        />
        <button className="bg-blue-500 text-white py-1 px-2 rounded" onClick={handleAddBook}>
          Add Book
        </button>
      </div>
      <Notification message={notification} onClose={() => setNotification('')} />
      <BookTable books={books} onUpdateStatus={handleUpdateBookStatus} onDelete={handleDeleteBook} />
    </div>
  );
};

export default Home;
