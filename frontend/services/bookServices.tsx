// frontend/src/services/bookService.ts
import api from './api';

export const getBooks = async () => {
  const response = await api.get('/');
  return response.data;
};

export const addBook = async (title: string) => {
  try {
    const response = await api.post('/', { title: title, status: "to read" });
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

export const updateBookStatus = async (id: number, title: string, status: string) => {
  const response = await api.put(`/status/${id}`, { title: title, status: status });
  return response.data;
};

export const updateBook = async (id: number, title: string, status: string) => {
  const response = await api.put(`/${id}`, { title: title, status: status });
  return response.data;
};

export const deleteBook = async (id: number) => {
  await api.delete(`/${id}`);
};
