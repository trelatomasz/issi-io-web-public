import {useState} from "react";

import {Movie} from "./model/Movie.js";

export default function MovieList(props) {
    const movies = props.movies;

    return <div>
        <ul>
            {movies.map((movie) => <li key={movie.title}>{movie.title}, year: {movie.year}</li>)}
        </ul>
    </div>
    ;
}