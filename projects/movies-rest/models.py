import json

from peewee import *

from database import db


class BaseModel(Model):
    class Meta:
        database = db


class Actor(BaseModel):
    name = CharField(unique=True)
    age = IntegerField(null=True)
    sex = CharField(null=True)
    origin = CharField(null=True)
    bio = TextField(null=True)


class Movie(BaseModel):
    title = CharField()
    year = IntegerField()
    genres = CharField(null=True)
    director = CharField(null=True)
    runtime = IntegerField(null=True)
    posterUrl = CharField(null=True)
    plot = TextField(null=True)

    actors = ManyToManyField(Actor, backref='movies')

    def to_sentence(self):
        actor_names = " ".join([a.name for a in self.actors])
        return f"{self.title} {self.year} {self.genres} {self.director} {self.plot} {actor_names}"


ActorMovie = Movie.actors.get_through_model()

db.connect()
db.create_tables([Actor, Movie, ActorMovie])
db.close()


def load_movies_from_json():
    Movie.delete().execute()
    ActorMovie.delete().execute()
    Actor.delete().execute()
    with open('movies.json') as f:
        data = json.load(f)
    def create_movie(movie):
        movie['genres'] = ",".join(movie.pop('genres'))
        actors =movie.pop('actors').split(',')
        createdMovie = Movie.create(**movie)
        createdMovie.actors.add([Actor.get_or_create(name=actorName.strip())[0]
                                 for actorName in actors])
        print(f"{createdMovie = }")
        return createdMovie
    return [create_movie(movie) for movie in data['movies']]