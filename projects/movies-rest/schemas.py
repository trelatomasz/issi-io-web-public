from datetime import date, datetime
from typing import Any, List, Union

from pydantic import BaseModel

class ActorBase(BaseModel):
    name: str
    surname: str
    born: date

class ActorCreate(ActorBase):
    pass

class Actor(ActorBase):
    id: int

    class Config:
        from_attributes = True


class MovieBase(BaseModel):
    title: str
    year: int
    director: str
    description: Union[str, None] = None


class MovieCreate(MovieBase):
    actors: List[int]

class Movie(MovieBase):
    id: int
    actors: List[Actor] = []

    class Config:
        from_attributes = True