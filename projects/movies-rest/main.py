from fastapi import FastAPI, HTTPException
import models, schemas

app = FastAPI()

@app.get("/movies/")
def get_movies():
    return list(models.Movie.select())

@app.get("movies/{movie_id}", response_model = schemas.Movie)
def get_movie(movie_id: int):
    db_movie = models.Movie.get_by_id(movie_id)
    if db_movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")