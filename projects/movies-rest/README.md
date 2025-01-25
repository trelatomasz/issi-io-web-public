# RUN local
fastapi dev main.py

uvicorn main:app --reload

# TEST
IDE test.main.http

# Check API
http://localhost:8000/docs#/default/get_movies_movies__get