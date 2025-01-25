import {useState} from "react";

import {Movie} from "./model/Movie.js";
import MovieListItem from "./MovieListItem";

export default function MovieList(props) {
    const movies = props.movies;

    return <div>
        <ul>
              {movies.map(movie => <li key={movie.id}>
                <MovieListItem movie={movie} onDelete={() => props.onDeleteMovie(movie)}/>
            </li>)}
        </ul>
    </div>
    ;
}