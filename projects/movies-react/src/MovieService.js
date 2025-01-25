export default class MovieService {
    constructor() {

    }

    getMovies(setMovies) {
        const fetchMovies = async () => {
            const response = await fetch(`/movies`);
            if (response.ok) {
                const movies = await response.json();
                setMovies(movies);
            }
            else {
                throw new Error("Failed to fetch movies");
            }
        };
        fetchMovies();
    }

    searchForMovie(movieDetails, setMovies) {
        // const foundMovies = movies.filter(val => {
        //     console.log("Check movie: ", val, newMovie);
        //     return val.title == newMovie.title && val.year == newMovie.year;
        // });
        // console.log("Found movies: ", foundMovies)
        // if (foundMovies.length > 0) {
        //     alert("Movies found:" + foundMovies.length)
        // }
        // console.log("Looking for movie...");
    }

    async addMovie(movie, setMovies) {
        const response = await fetch('/movies', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            // setMovies([...movies, movie]);
            // setAddingMovie(false);
        }
    }
}