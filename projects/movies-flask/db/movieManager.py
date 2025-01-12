import sqlite3

import os
from os import path

class DbDaoManager():
    def __init__(self):
      pass

    def __enter__(self):
        db = sqlite3.connect('movies.db')
        self.cursor = db.cursor()
        return DbDao(self.cursor)

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.cursor.close()

class DbDao():
    def __init__(self, cursor):
        self.cursor = cursor

    def listMovies(self):
        self.cursor.execute("SELECT * FROM movies")
        for row in self.cursor:
            print('{0} {1}'.format(row[1], row[2]))

    def findMovie(self, phrase: str):
        self.cursor.execute(f"""SELECT * FROM movies WHERE title like '%{phrase}%'
        OR actors like '%{phrase}%'
        """)
        for row in self.cursor:
            print('{0} {1}'.format(row[1], row[2]))


with DbDaoManager() as db:
    db.findMovie("Ma")
