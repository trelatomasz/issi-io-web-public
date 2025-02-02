from typing import Union

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

import models
import schemas
from vector_db import v_db

app = FastAPI()
app.mount("/static", StaticFiles(directory="../ui/build/static", check_dir=False), name="static")


@app.get("/")
def serve_react_app():
    return FileResponse("../ui/public/index.html")


@app.get("/movies", response_model=list[schemas.Movie])
def get_movies(filter: Union[str, None] = None):
    if (filter):
        movie_ids = v_db.findMovieInVectorDb(filter)
        print("Found following movies for filter ", filter, ": ", movie_ids)
        return list(models.Movie.select().where(models.Movie.id << movie_ids))
    else:
        return list(models.Movie.select())


@app.get("/movies/{movie_id}", response_model=schemas.Movie)
def get_movie(movie_id: int):
    db_movie = models.Movie.get_by_id(movie_id)
    if db_movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")


@app.post("/movies", response_model=schemas.Movie, status_code=201)
def add_movie(movie: schemas.MovieCreate):
    actors = models.Actor.select().where(models.Actor.id << movie.actors)
    del movie.actors
    db_movie = models.Movie.create(**movie.dict())
    # TODO: sometimes there is error
    # UNIQUE constraint failed: movie_actor_through.movie_id, movie_actor_through.actor_id
    db_movie.actors.add(actors)
    v_db.storeMovieInVectorDb(db_movie)
    return db_movie


@app.delete("/movies/{movie_id}", status_code=204)
def delete_movie(movie_id: int):
    db_movie = models.Movie.get_by_id(movie_id)
    db_movie.delete_instance()
    v_db.deleteMovieInVectorDb(db_movie)
    return None


@app.delete("/movies/{movie_id}/actors/{actor_id}", status_code=204)
def delete_movie(movie_id: int, actor_id: int):
    db_movie = models.Movie.get_by_id(movie_id)
    models.ActorMovie.get(movie=db_movie, actor=models.Actor.get_by_id(actor_id)).delete_instance()
    v_db.deleteMovieInVectorDb(db_movie)
    v_db.storeMovieInVectorDb(db_movie)
    return None


@app.get("/actors", response_model=list[schemas.Actor])
def get_actors():
    return list(models.Actor.select())


@app.get("/actors/{actor_id}", response_model=schemas.Actor)
def get_actor(actor_id: int):
    db_actor = models.Actor.get_by_id(actor_id)
    if db_actor is None:
        raise HTTPException(status_code=404, detail="Actor not found")
    return db_actor


@app.post("/actors", response_model=schemas.Actor, status_code=201)
def add_actor(actor: schemas.ActorCreate):
    db_actor = models.Actor.create(**actor.dict())
    return db_actor


@app.delete("/actors/{actor_id}", status_code=204)
def delete_actor(actor_id: int):
    db_actor = models.Actor.get_by_id(actor_id)
    db_actor.delete_instance()
    return None
