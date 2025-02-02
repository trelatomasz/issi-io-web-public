import {useEffect, useState} from "react";

import Select from 'react-select';

import {Movie} from "../model/Movie.js";
import ActorService from "../actors/ActorService";

export default function MovieForm(props) {
    const actorService = new ActorService();

    const [title, setTitle] = useState('');
    const [year, setYear] = useState('2025');
    const [genre, setGenre] = useState('');
    const [director, setDirector] = useState('');
    const [description, setDescription] = useState('');
    const [posterUrl, setPosterUrl] = useState('');
    const [actors, setActors] = useState([]);

    const [selectedActors, setSelectedActors] = useState([]);

    const handleSelectChange = (selectedActors) => {
        setSelectedActors(selectedActors);
    };
    useEffect(() => {
        // TODO: do not load actors every time adding new movie
        actorService.getActors().then(actors => setActors(actors.map(actor => ({value: actor.id, label: actor.name}))))
    }, []);

    function addMovie(event) {
        event.preventDefault();
        if (title.length < 2) {
            return alert('Too short title');
        }
        if (Number.isNaN(parseInt(year))) {
            return alert('Invalid Year');
        }
        const actorsIds = selectedActors.map(actor => actor.value);
        props.onMovieSubmit(new Movie(title, year, genre, director, description, posterUrl, actorsIds));
        setTitle('');
        setYear('');
        setGenre('');
        setDirector('');
        setPosterUrl('');
    }

    return <form onSubmit={addMovie}>

        <div className="row">
            <div className="column column-20">
                <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
                <em>Title</em>
            </div>
            <div className="column column-10">
                <input type="number" value={year} min={1900} max={2025}
                       onChange={(event) => setYear(event.target.value)}/>
                <em>Year</em>
            </div>
            <div className="column-10">
                <input type="text" value={genre} onChange={(event) => setGenre(event.target.value)}/>
                <em>Genre</em>
            </div>
            <div className="column">
                <input type="text" value={director} onChange={(event) => setDirector(event.target.value)}/>
                <em>Director</em>
            </div>
            <div className="column">
                <input type="text" value={posterUrl} onChange={(event) => setPosterUrl(event.target.value)}/>
                <em>PosterUrl</em>
            </div>
            <div className="column">
                <input type="text" value={description} onChange={(event) => setDescription(event.target.value)}/>
                <em>Description</em>
            </div>


        </div>
        <div className="row">
            <div className="column">
                <Select isMulti value={selectedActors} onChange={handleSelectChange} options={actors}/>
                <em>Actors</em>
            </div>
            <div className="column">
                <button>{props.buttonName}</button>
            </div>
        </div>
    </form>
        ;
}