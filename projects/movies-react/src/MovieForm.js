import {useState} from "react";

import {Movie} from "./model/Movie.js";

export default function MovieForm(props) {

    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');

    function addMovie(event) {
        event.preventDefault();
        if (title.length < 5) {
            return alert('Too short title');
        }
        props.onMovieSubmit(new Movie(title, year));
        setTitle('');
        setYear('');
    }

    return <form onSubmit={addMovie}>
        <h2>Movie Form</h2>
        <div>
            <label>Title</label>
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
        </div>
        <div>
            <label>Production year</label>
            <input type="text" value={year} onChange={(event) => setYear(event.target.value)}/>
        </div>
        <button>{props.buttonName}</button>
    </form>;
}