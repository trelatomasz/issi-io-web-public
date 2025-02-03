import {useState} from "react";
import MovieService from "./MovieService";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

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
                <span key={`movie-actor-${props.movie.id}-${actor.id}`}>{actor.name} <a
                    onClick={() => deleteActorFromMovie(props.movie.id, actor.id)}>X</a></span>
            ))}</td>
            <td>
                <Popup trigger={<button> Description</button>} position="right center">
                    <div>{props.movie.plot || 'No description'}</div>
                </Popup>
                {!!props.movie.posterUrl &&
                    <Popup trigger={<button> Image</button>} position="right center">
                        <img src={props.movie.posterUrl}></img>
                    </Popup>
                }
            </td>
            <td><a onClick={props.onDelete}>Delete</a></td>
        </tr>
    );
}
