export class Movie {
    constructor(title, year, genre, director, plot, posterUrl, actors) {
        this.title = title;
        this.year = year;
        if(genre) {
            this.genres = genre;
        }
        if(director){
            this.director = director;
        }
        if(plot) {
            this.plot = plot;
        }
        if(actors) {
            this.actors = actors;
        }
        if(posterUrl) {
            this.posterUrl = posterUrl
        }

    }
}