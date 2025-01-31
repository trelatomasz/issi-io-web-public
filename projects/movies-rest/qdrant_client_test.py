import os

from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams, PointStruct, ScoredPoint, Filter, FieldCondition, MatchValue

from vector_db import qc
import unittest

class QdrantClientTest(unittest.TestCase):
    test_collection_name = "test_collection"

    # @unittest.skip("Test collection already created.")
    def test_create_collection(self):
        qc.create_collection(
            collection_name=self.test_collection_name,
            vectors_config=VectorParams(size=384, distance=Distance.COSINE),
        )

    @unittest.skip("Test collection in use.")
    def test_remove_collection(self):
        qc.delete_collection(
            collection_name=self.test_collection_name,
        )

    def test_upsert_points(self ):
        qc.upsert(
            collection_name=self.test_collection_name,
            wait=True,
            points=[
                PointStruct(id=1, vector=[0.05, 0.61, 0.76, 0.74], payload={"city": "Berlin"}),
                PointStruct(id=2, vector=[0.19, 0.81, 0.75, 0.11], payload={"city": "London"}),
                PointStruct(id=3, vector=[0.36, 0.55, 0.47, 0.94], payload={"city": "Moscow"}),
                PointStruct(id=4, vector=[0.18, 0.01, 0.85, 0.80], payload={"city": "New York"}),
                PointStruct(id=5, vector=[0.24, 0.18, 0.22, 0.44], payload={"city": "Beijing"}),
                PointStruct(id=6, vector=[0.35, 0.08, 0.11, 0.44], payload={"city": "Mumbai"}),
            ],
        )

    def test_search_simillar_vectors(self):
        search_result = qc.search(
            collection_name=self.test_collection_name,
            query_vector=[0.2, 0.1, 0.9, 0.7],
            limit=3,
        )
        # [ScoredPoint(id=4, version=0, score=1.362, payload={'city': 'New York'}, vector=None, shard_key=None, order_value=None),
        # ScoredPoint(id=1, version=0, score=1.273, payload={'city': 'Berlin'}, vector=None, shard_key=None, order_value=None),
        # ScoredPoint(id=3, version=0, score=1.208, payload={'city': 'Moscow'}, vector=None, shard_key=None, order_value=None)]
        self.assertEqual(search_result[0].id, 4)
        self.assertEqual(search_result[0].payload['city'], 'New York')
        self.assertAlmostEqual(search_result[0].score, 1.362, places=3)


    def test_filter_results(self):
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

if __name__ == "__main__":
    unittest.main()