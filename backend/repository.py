from dataclasses import dataclass

from pydantic import BaseModel
from database import database

@dataclass
class Book:
    id: int
    title: str
    status: str

class Item(BaseModel):
    eth_addr: str

class BookRepository:
    async def get_all_books(self):
        query = "SELECT * FROM books"
        return await database.fetch_all(query=query)
    
    async def get_book_by_id(self, book_id: int):
        query = "SELECT * FROM books WHERE id = :id"
        return await database.fetch_one(query=query, values={"id": book_id})

    async def create_book(self, title: Item):
        query = "INSERT INTO books (title, status) VALUES (:title, 'to-read')"
        await database.execute(query=query, values={"title": title})

    async def update_book(self, book_id: int, title: str, status: str):
        query = "UPDATE books SET title = :title, status = :status WHERE id = :id"
        await database.execute(query=query, values={"id": book_id, "title": title, "status": status})

    async def update_book_status(self, book_id: int, status: str):
        query = "UPDATE books SET status = :status WHERE id = :id"
        await database.execute(query=query, values={"id": book_id, "status": status})

    async def delete_book(self, book_id: int):
        query = "DELETE FROM books WHERE id = :id"
        await database.execute(query=query, values={"id": book_id})

book_repository = BookRepository()
