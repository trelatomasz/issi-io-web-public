export default class MovieService {
    constructor() {

    }

    async getMovies(filterTerm) {
        const filterParam = filterTerm ? `?filter=${filterTerm}` : '';
        const response = await fetch(`/movies${filterParam}`);
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
            throw new Error("Failed to add movie");
        }

    }

    async deleteActorFromMovie(movieId, actorId) {
        const response = await fetch(`/movies/${movieId}/actors/${actorId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error("Failed to delete an actor from movie cast!");
        }
    }


}