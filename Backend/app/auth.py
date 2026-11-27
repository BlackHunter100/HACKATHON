from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client
from app.config import settings

security = HTTPBearer()


def get_authenticated_context(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    try:
        auth_client = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_KEY
        )

        # Validate the user's access token
        response = auth_client.auth.get_user(token)

        if not response.user:
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication token"
            )

        # Create a database client using this user's token
        if hasattr(auth_client, "with_token"):
            db_client = auth_client.with_token(token)
        else:
            auth_client.postgrest.auth(token)
            db_client = auth_client

        return {
            "user": response.user,
            "db": db_client
        }

    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=401,
            detail="Authentication failed"
        ) from exc


def get_current_user(
    context=Depends(get_authenticated_context)
):
    return context["user"]