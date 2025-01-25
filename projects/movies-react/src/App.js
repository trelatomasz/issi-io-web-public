import './App.css';
import {useEffect, useState} from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MovieList"

import MovieService from "./MovieService";

function App() {
    // Whole component is rendered
    console.log("Component App is regenerated");
    const movieService = new MovieService();

    const [addingMovie, setAddingMovie] = useState(false);
    const [searchMovie, setFilterMovie] = useState(false);

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        movieService.getMovies(setMovies)
    }, []);

    console.log(movies)


    return (
        <div className="container">
            <h1>My favourite movies to watch</h1>
            { searchMovie
                ? <>
                    <button onClick={() => setFilterMovie(false)}>Hide filter</button>
                    <MovieForm onMovieSubmit={(movie) => setMovies([...movies, movie])} buttonName="Filter"/>
                </>
                : <button onClick={() => setFilterMovie(true)}>Filter</button>}

            <MoviesList movies={movies} onDeleteMovie={(movie) => {}}/>

            {addingMovie
                ? <>
                    <button onClick={() => setAddingMovie(false)}>Hide movie</button>
                    <MovieForm onMovieSubmit={(movie) => setMovies([...movies, movie])} buttonName="Add movie"/>
                  </>
                : <button onClick={() => setAddingMovie(true)}>Add a movie</button>}
        </div>
    );
}

export default App;
