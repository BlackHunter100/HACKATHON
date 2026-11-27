from app.database import get_supabase

try:
    supabase = get_supabase()

    result = supabase.table("institutions").select(
        "id, name"
    ).limit(5).execute()

    print("Supabase database connection successful!")
    print("Institutions:", result.data)

except Exception as e:
    print("Database test failed:")
    print(e)