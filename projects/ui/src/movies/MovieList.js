import {useState} from "react";

import {Movie} from "../model/Movie.js";
import MovieListItem from "./MovieListItem";

export default function MovieList(props) {
    const movies = props.movies;

    return <table>
        <thead>
        <tr>
            <th>Title</th>
            <th>Production Year</th>
            <th>Director</th>
            <th>Cast</th>
            <th>Description</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {movies.map((movie, index) =>
            <MovieListItem key={movie.id} movie={movie} onDelete={() => props.onDeleteMovie(movie)}/>
        )}
        </tbody>
    </table>
    ;
}