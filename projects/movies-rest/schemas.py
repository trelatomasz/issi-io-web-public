from typing import List, Union

from pydantic import BaseModel


class ActorBase(BaseModel):
    name: str
    age: int
    sex: str
    origin: str
    bio:str

class ActorCreate(ActorBase):
    pass

class Actor(ActorBase):
    id: int

    class Config:
        from_attributes = True


class MovieBase(BaseModel):
    title: str
    year: int
    genre:str
    director: str
    description: Union[str, None] = None


class MovieCreate(MovieBase):
    actors: List[int]

class Movie(MovieBase):
    id: int
    actors: List[Actor] = []

    class Config:
        from_attributes = True