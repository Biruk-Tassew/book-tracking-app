import databases
from config import settings

DATABASE_URL = settings.DATABASE_URL or "sqlite:///./test.db"
database = databases.Database(DATABASE_URL)