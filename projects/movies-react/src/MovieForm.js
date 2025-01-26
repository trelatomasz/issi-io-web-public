import {useState} from "react";

import {Movie} from "./model/Movie.js";

export default function MovieForm(props) {

    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');


    function addMovie(event) {
        event.preventDefault();
        if (title.length < 2) {
            return alert('Too short title');
        }
        props.onMovieSubmit(new Movie(title, year, "director",[], "description"));
        setTitle('');
        setYear('');
    }

    return <form onSubmit={addMovie}>

        <div className="row">
            <div className="column">
                <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
                <em>Title</em>
            </div>
            <div className="column">
                <input type="text" value={year} onChange={(event) => setYear(event.target.value)}/>
                <em>Production year</em>
            </div>
            <div className="column">
                <button>{props.buttonName}</button>
            </div>
        </div>
    </form>
;
}