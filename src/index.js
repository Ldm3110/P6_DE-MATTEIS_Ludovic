import {displayFeaturedFilm, displayFilmFrame, fetchFilm} from "./display"
import {Carousel} from "./carousel";
import {openModal} from "./modal";

let url = "http://localhost:8000/api/v1/titles/";

let category = ["adventure", "drama", "comedy"];


main()

async function main() {
    /**
     * Extract information from films and position in the correct category
     */
    // Extraction of the 7 films in the "Meilleur films toutes categories"
    let bestMovie = await getMovies(url + "?sort_by=-imdb_score");
    // Extraction of the best film in all categories
    let featuredFilmUrl = bestMovie[0].url
    let featuredFilm = await getFetch(featuredFilmUrl)
    // display of the featured film
    displayFeaturedFilm(featuredFilm, 'div.featured_movie')
    // display of the 7 films in the "Meilleur films toutes categories"
    displayFilmFrame(bestMovie, 'div.best_movie');
    // Creation of the carousel of the 7 films in the "Meilleur films toutes categories"
    new Carousel(document.querySelector('div.best_movie'))
    // Creation and display of the Carousel for the 7 best films in the category table
    for (let cat of category) {
        let Movies = await getMovies(url + "?genre=" + cat + "&sort_by=-imdb_score");
        displayFilmFrame(Movies, 'div.' + cat);
        new Carousel(document.querySelector('div.' + cat))
    }
    // Implement modal view if 'click' on a movie
    let film = document.querySelectorAll('.img_film')
    film.forEach(a => {
        a.addEventListener('click', function (e) {
            let urlMovieDetails = a.querySelector('img').id
            fetchFilm(urlMovieDetails)
            openModal(e)
        })
    })
}

async function getMovies(url) {
    /**
     * send the url to getFetch, receive a promise and insert the movies in a table
     * @type {[]} category films table
     */
    let array = []
    // fetch url of page 1
    let response = await getFetch(url);
    // fetch url of page 2
    let response2 = await getFetch((url + '&page=2'))
    // insert in the table all the movies of page 1
    for (let film of response.results) array.push(film)
    // insert in table only the first 2 films on page 2
    for (let i = 0; i < 2; i++) array.push(response2.results[i])
    return array
}

export async function getFetch(url) {
    /**
     * Fetch url and return the result
     * @type {Response}
     */
    let response = await fetch(url)
    if (response.ok) {
        return response.json()
    } else {
        return false
    }
}
