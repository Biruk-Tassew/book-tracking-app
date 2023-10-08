from fastapi.testclient import TestClient
from main import app
from database import database
import pytest

client = TestClient(app)

@pytest.fixture
async def setup():
    await database.connect()
    yield
    await database.disconnect()

def test_read_books(setup):
    response = client.get("/api/books")
    assert response.status_code == 200
    assert response.json() == []

    # You can further test other API endpoints similarly
