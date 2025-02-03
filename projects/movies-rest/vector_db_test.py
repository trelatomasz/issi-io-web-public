import unittest

from qdrant_client.http.models import Distance, VectorParams, Filter, FieldCondition, \
    MatchValue

from models import Movie, Actor, ActorMovie, load_movies_from_json
from vector_db import qc, VectorDb


class MyApplicationTest(unittest.TestCase):
    test_collection_name = "test_collection"
    # test_collection_name = "moviedb_collection"
    vector_db = VectorDb(test_collection_name)

    create_db = False
    create_index = False
    clear_db = False
    clear_index = False

    @classmethod
    def setUpClass(cls):
        # load movies
        if cls.create_db:
            print("Clearing database PRE TEST ...")
            cls.movies = load_movies_from_json()
        else:
            cls.movies = Movie.select()

        if cls.create_index:
            print("Clearing index PRE TEST ...")
            try:
                qc.delete_collection(collection_name=cls.test_collection_name, )
            except Exception as e:
                print("Collection does not exist yet")

            qc.create_collection(
                collection_name=MyApplicationTest.test_collection_name,
                vectors_config=VectorParams(size=384, distance=Distance.COSINE),
            )
            cls.vector_db.index_all_movies(cls.movies)

    @classmethod
    def tearDownClass(cls):
        if cls.clear_index:
            print("DELETING test collection AFTER TEST ...")
            qc.delete_collection(
                collection_name=cls.test_collection_name,
            )
        if cls.clear_db:
            print("CLEARING DB AFTER TEST ...")
            ActorMovie.delete().execute()
            Movie.delete().execute()
            Actor.delete().execute()


    def setUp(self):
        pass

    def tearDown(self):
        ...

    def test_index_all_movies(self):
        self.vector_db.index_all_movies(self.movies)

    def test_find_movie(self):
        search_result = self.vector_db.find_movie("New York")

        self.assertEqual(len(search_result), 3)
        self.assertEqual(search_result, [7, 58, 120])

    @unittest.skip
    def test_quadrant_client_using_query_filter(self):
        search_result = qc.search(
            collection_name=self.test_collection_name,
            query_vector=[0.2, 0.1, 0.9, 0.7],
            query_filter=Filter(
                must=[FieldCondition(key="city", match=MatchValue(value="London"))]
            ),
            with_payload=True,
            limit=2,
        )

        print(search_result)


if __name__ == '__main__':
    unittest.main()
