from fastapi import Body, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from repository import book_repository, Book

app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set this to your frontend origin(s) in production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

class Item(BaseModel):
    title: str
    status: str

@app.get("/api/books")
async def read_books():
    return await book_repository.get_all_books()

@app.post("/api/books")
async def create_book(book: Item):
    await book_repository.create_book(book.title)
    return {"message": "Book created successfully"}

@app.put("/api/books/status/{book_id}")
async def update_book_status(book: Item, book_id):
    existing_book = await book_repository.get_book_by_id(book_id)
    if not existing_book:
        raise HTTPException(status_code=404, detail="Book not found")
    await book_repository.update_book_status(book_id, book.status)
    return {"message": "Book status updated successfully"}

@app.put("/api/books/{book_id}")
async def update_book(book: Item, book_id):
    existing_book = await book_repository.get_book_by_id(book_id)
    if not existing_book:
        raise HTTPException(status_code=404, detail="Book not found")
    await book_repository.update_book(book_id, book.title, book.status)
    return {"message": "Book updated successfully"}

@app.delete("/api/books/{book_id}")
async def delete_book(book_id):
    book = await book_repository.get_book_by_id(book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    await book_repository.delete_book(book_id)
    return {"message": "Book deleted successfully"}
