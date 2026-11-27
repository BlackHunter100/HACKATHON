import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    PROJECT_NAME = "EduNexus"
    PROJECT_VERSION = "1.0.0"

    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")


settings = Settings()