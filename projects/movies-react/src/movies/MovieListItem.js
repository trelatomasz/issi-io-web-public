import {useState} from "react";
import MovieService from "./MovieService";

export default function MovieListItem(props) {
    const [actors, setActors] = useState(props.movie.actors);


    const deleteActorFromMovie = (movieId, actorId) => {
        new MovieService().deleteActorFromMovie(movieId, actorId).then(() => {
            setActors(actors.filter(actor => actor.id !== actorId));
        })
    }
    return (
        <tr>
            <td>{props.movie.title}</td>
            <td>{props.movie.year}</td>
            <td>{props.movie.director}</td>

            <td>{actors.map((actor, index) => (
                <span>{actor.name} <a onClick={() => deleteActorFromMovie(props.movie.id, actor.id)}>X</a></span>
            ))}</td>
            <td>{props.movie.description}</td>
            <td><a onClick={props.onDelete}>Delete</a></td>
        </tr>
    );
}
