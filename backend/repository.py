from dataclasses import dataclass

from pydantic import BaseModel
import sqlite3

@dataclass
class Book:
    id: int
    title: str
    status: str

class Item(BaseModel):
    eth_addr: str

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

class BookRepository:
    def __init__(self):
        self.conn = sqlite3.connect('BookTracking.db')
        self.conn.row_factory = dict_factory
        
    async def get_all_books(self):
        query = "SELECT * FROM books"
        cur = self.conn.cursor()
        all_books = cur.execute(query).fetchall()
        return all_books
    
    async def get_book_by_id(self, book_id: int):
        query = "SELECT * FROM books WHERE id = ?"
        cur = self.conn.cursor()
        book = cur.execute(query, (book_id)).fetchall()
        return book

    async def create_book(self, title: str):
        query = "INSERT INTO books (title, status) VALUES (?, 'to-read')"
        cur = self.conn.cursor()
        cur.execute(query, (title,))
        self.conn.commit()

    async def update_book(self, book_id: int, title: str, status: str):
        query = "UPDATE books SET title = ?, status = ? WHERE id = ?"
        cur = self.conn.cursor()
        cur.execute(query, (title, status, book_id))
        self.conn.commit()

    async def update_book_status(self, book_id: int, status: str):
        query = "UPDATE books SET status = ? WHERE id = ?"
        cur = self.conn.cursor()
        cur.execute(query, (status, book_id))
        self.conn.commit()

    async def delete_book(self, book_id: int):
        query = "DELETE FROM books WHERE id = ?"
        cur = self.conn.cursor()
        cur.execute(query, (book_id,))
        self.conn.commit()


book_repository = BookRepository()
