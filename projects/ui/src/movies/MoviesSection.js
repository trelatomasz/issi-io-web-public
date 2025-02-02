import MovieForm from "./MovieForm";
import MoviesList from "./MovieList";
import MovieService from "./MovieService";
import {useEffect, useState} from "react";
import MovieFilter from "./MovieFilter";


export default function MoviesSection(props) {
    const movieService = new MovieService();

    const [addingMovie, setAddingMovie] = useState(false);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        movieService.getMovies().then(movies => setMovies(movies))
    }, []);

    console.log(movies)

    return (
        <div>
            <h1>My favourite movies to watch</h1>
            <MovieFilter onFilterChange={(movies)=>setMovies(movies)}></MovieFilter>

            <MoviesList movies={movies} onDeleteMovie={(movie) => {
                movieService.deleteMovie(movie).then(() => {
                    setMovies(movies.filter(m => m.id !== movie.id))
                })
            }}
            />
            {
                addingMovie
                    ? <>
                        <button onClick={() => setAddingMovie(false)}>Hide movie</button>
                        <MovieForm onMovieSubmit={(movie) => {
                            movieService.addMovie(movie).then(newMovie => setMovies([...movies, newMovie]));
                        }}
                                   buttonName="Add movie"
                                   actors={props.actors}
                        />
                    </>
                    : <button onClick={() => setAddingMovie(true)}>Add a movie</button>
            }
        </div>
    );
}
