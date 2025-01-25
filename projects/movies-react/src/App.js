import './App.css';
import {useState} from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MovieList"

function App() {
    // Whole component is rendered
    console.log("Component App is regenerated");

    const [movies, setMovies] = useState([]);
    console.log(movies)

    function searchForMovie(newMovie) {
        const foundMovies = movies.filter(val => {
            console.log("Check movie: ", val, newMovie);
            return val.title == newMovie.title && val.year == newMovie.year;
        });
        console.log("Found movies: ", foundMovies)
        if(foundMovies.length > 0){
            alert("Movies found:" + foundMovies.length)
        }
        console.log("Looking for movie...");
    }

    return (
        <div>
            <h1>My favourite movies to watch</h1>
            <h2>My favourite movie for today:</h2>
            <MoviesList movies={movies} />
            <MovieForm onMovieSubmit={(movie) => setMovies([...movies, movie])} buttonName="Add movie"/>
            <MovieForm onMovieSubmit={searchForMovie} buttonName="Search for a movie"/>

        </div>
    );
}

export default App;
