from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.auth import get_current_user
from app.database import get_supabase

app = FastAPI(
    title="EduNexus API",
    version="1.0.0",
    description="Education and Campus Management Platform"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def home():
    return {
        "message": "Welcome to EduNexus API",
        "status": "running"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/complaints")
def complaints():
    return {"module": "complaints", "status": "active", "data": []}

@app.get("/projects")
def projects():
    try:
        supabase = get_supabase()
        result = supabase.table("projects").select("*").execute()

        return {
            "module": "projects",
            "status": "active",
            "data": result.data
        }

    except Exception as e:
        print("PROJECT DATABASE ERROR:", repr(e))
        raise HTTPException(
            status_code=500,
            detail="Could not fetch projects from database"
        )