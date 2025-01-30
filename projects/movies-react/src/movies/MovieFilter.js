import React, {useState} from "react";
import MovieService from "./MovieService";

const MovieFilter = (props) => {
    const [filterTerm, setFilterTerm] = useState("");
    const [filterButtonDisabled, setFilterButtonDisabled] = useState(false);
    const [lastSearchTerm, setLastSearchTerm] = useState("");

    const log = () => {
        console.log("filterTerm", filterTerm, "lastSearchTerm", lastSearchTerm, "buttonDisabled", filterButtonDisabled);
    }
    log()
    const filterResults = (event) => {
        new MovieService().getMovies(filterTerm).then(props.onFilterChange);
        setLastSearchTerm(filterTerm);
        log()
        setFilterButtonDisabled(true);
    };
    const newSearchTerm = (event) => {
        const newTerm = event.target.value;
        setFilterTerm(newTerm);
        setFilterButtonDisabled(newTerm == lastSearchTerm);
        log()
    }

    return (
        <div className="row">
            <div className="column">
                <input
                    type="text"
                    value={filterTerm}
                    onChange={newSearchTerm}
                    placeholder="Filter by any movie attribute"
                />
            </div>
            <div className="column">
                <button onClick={filterResults} disabled={filterButtonDisabled}>Filter</button>
            </div>
        </div>
    );
};

export default MovieFilter;