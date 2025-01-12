from peewee import *

db = SqliteDatabase('peewee_movies.db')

class Actor(Model):
    name = CharField()
    class Meta:
        database = db
        table_name = 'actors'

class Movie(Model):
    title = CharField()
    year = IntegerField()
    description = CharField()
    director = CharField()
    actors = ManyToManyField(Actor, backref='movies')
    class Meta:
        database = db
        table_name = 'movies'


ActorMovie = Movie.actors.get_through_model() # automatycznie utworzymy klasę pośredniczącą, nie będziemy z niej korzystać

db.connect() # łączymy się z bazą, to już znasz
db.create_tables([Actor, Movie, ActorMovie])


def listMovies():
    for movie in Movie.select():
        print(f"{movie.id} {movie.title}, {movie.year}, {movie.director}, {movie.description}")
        for actor in movie.actors:
            print(f"\t {actor.id}: {actor.name}")

def addMovie( title:str, year: str, director: str, desc: str):
    movie = Movie.create(title=title, year = year, director = director, description = desc)
    return movie

roy = Actor.create(name="Roy", surname= "Scheider")
movie = addMovie('Jaws', 1975, "Steven Spielberg", "Awesome Thriller", )
movie.actors.add(roy)


listMovies()