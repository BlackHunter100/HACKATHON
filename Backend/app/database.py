from supabase import create_client, Client
from app.config import settings

_supabase_client = None


def get_supabase() -> Client:
    global _supabase_client

    if _supabase_client is None:

        if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
            raise RuntimeError(
                "Supabase credentials are missing. Check your .env file."
            )

        _supabase_client = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_KEY
        )

    return _supabase_client