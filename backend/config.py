from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = r"sqlite:///C:\Users\HP\Desktop\work\book-tracking-app\backend\BookTracking.db"
    API_KEY: str = "default_api_key_value"
    APP_MAX: int = 100  # default value if env variable does not exist

# global instance
settings = Settings()
