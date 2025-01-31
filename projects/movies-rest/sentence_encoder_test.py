import unittest

from numpy import ndarray

from sentence_encoder import encoder

class SentenceEncoderTest(unittest.TestCase):


    def test_encode(self):

        res: ndarray[float] = encoder.encode("hello world Ala masdfaskfhjagsdf alskjf aslfkj aslfjhas flkajsh flaskdjhf asldkjf asldfhjk kota i ciekawe jaki długi testk da jak duży wektor, a jeśli wpiszę tutaj bardzo dużo wyrazów Titanic I Pter jackson i Fred i Alma i Scooby doo")

        self.assertEqual((384,), res.shape)
    def test_output_dimension(self):

        res: ndarray[float] = encoder.encode(sentences="hello world Ala masdfaskfhjagsdf alskjf aslfkj aslfjhas flkajsh flaskdjhf asldkjf asldfhjk kota i ciekawe jaki długi testk da jak duży wektor, a jeśli wpiszę tutaj bardzo dużo wyrazów Titanic I Pter jackson i Fred i Alma i Scooby doo",
                                              output_dimension=384)
        self.assertEqual((384,), res.shape)

if __name__ == "__main__":
    unittest.main()