export default class MovieService {
    constructor() {

    }

    async getMovies() {
        const response = await fetch(`/movies`);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to fetch movies");
        }
    }

    async deleteMovie(movie) {

        const response = await fetch('/movies/' + movie.id, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error("Failed to delete movies");
        }

    }

    async addMovie(movie) {
        const response = await fetch('/movies', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Failed to delete movies");
        }

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


}