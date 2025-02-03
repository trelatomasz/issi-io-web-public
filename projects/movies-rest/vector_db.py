import os

from qdrant_client import QdrantClient
from qdrant_client.http.models import PointStruct, UpdateResult

from models import Movie

qdrant_server_url = os.getenv('QDRANT_SERVER_URL')
qdrant_api_key = os.getenv('QDRANT_API_KEY')

print(f"{qdrant_server_url = } {qdrant_api_key[:4] = }")
qc = QdrantClient(
    url=qdrant_server_url,
    api_key=qdrant_api_key,
)
from sentence_encoder import encoder

class VectorDb:

    def __init__(self, collection_name="moviedb_collection"):
        self.collection_name = collection_name

    def _enc(self, sentence: str):
        return encoder.encode(sentence).tolist()
    def index_movie(self, movie: Movie):
        print(f"Store movie sentence: {movie.to_sentence() =}s")
        self.index_all_movies([movie])

    def index_all_movies(self, movies):
        print("Store all movies sentences...")
        qc.upsert(collection_name=self.collection_name,
                  points=[PointStruct(id=movie.get_id(),
                                      vector=self._enc(movie.to_sentence()),
                                      payload={'title':movie.title})
                          for movie in movies])
        print("Done")

    def delete_movie(self, movie):
        qc.delete(self.collection_name, [movie.id], wait=True,)

    def find_movie(self, filter:str):
        results = qc.search(collection_name=self.collection_name,
                      query_vector=self._enc(filter),limit=3)
        return [result.id for result in results]

v_db = VectorDb()