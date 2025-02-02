import os

from qdrant_client import QdrantClient
from qdrant_client.http.models import PointStruct

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
    collection_name = "moviedb_collection"

    def storeMovieInVectorDb(self, movie: Movie):
        encoded = encoder.encode(movie.toSentence()).tolist()
        # print(f"{movie.get_id() =} => {encoded = }")
        point = PointStruct(id = movie.get_id(),
                            vector=encoded,
                            payload={"title": movie.title})

        qc.upsert(collection_name=self.collection_name, wait=True, points=[
            point
        ])

    def deleteMovieInVectorDb(self, movie):
        qc.delete(self.collection_name, [movie.id], wait=True,)

    def findMovieInVectorDb(self, filter):
        return [result.id for result in (
            qc.search(self.collection_name, encoder.encode(filter).tolist(),limit=10))]


v_db = VectorDb()