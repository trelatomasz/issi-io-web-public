from typing import List, Union

from pydantic import BaseModel


class ActorBase(BaseModel):
    name: str
    age:  Union[int, None] = None
    sex: Union[str, None] = None
    origin: Union[str, None] = None
    bio: Union[str, None] = None

class ActorCreate(ActorBase):
    pass

class Actor(ActorBase):
    id: int

    class Config:
        from_attributes = True


class MovieBase(BaseModel):
    title: str
    year: int
    genres: Union[str, None] = None
    director: Union[str, None] = None
    runtime: Union[int, None] = None
    posterUrl: Union[str, None] = None
    plot: Union[str, None] = None

class MovieCreate(MovieBase):
    actors: List[int]

class Movie(MovieBase):
    id: int
    actors: List[Actor] = []

    class Config:
        from_attributes = True