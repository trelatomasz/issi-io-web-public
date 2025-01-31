from peewee import *

from database import db


class BaseModel(Model):
    class Meta:
        database = db


class Actor(BaseModel):
    name = CharField()
    age = IntegerField()
    sex = CharField()
    origin = CharField()
    bio = TextField()


class Movie(BaseModel):
    title = CharField()
    year = IntegerField()
    genre = CharField()
    director = CharField()

    description = TextField()

    actors = ManyToManyField(Actor, backref='movies')

    def toSentence(self):
        actor_names = "".join([a.name for a in self.actors])
        return f"{self.title} {self.year} {self.genre} {self.director} {self.description} {actor_names}"


ActorMovie = Movie.actors.get_through_model()

db.connect()
db.create_tables([Actor, Movie, ActorMovie])
db.close()
