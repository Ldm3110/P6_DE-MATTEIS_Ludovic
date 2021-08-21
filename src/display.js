import {getFetch} from "./index"


export function displayFeaturedFilm(detailsFilm, div) {
    /**
     * Shows the best film in all categories
     */
    let frame = document.querySelector('div.featured_frame')
    frame.innerHTML = `<img class = 'frame' src = "${detailsFilm.image_url}" 
                        href = "#modal1" id="${detailsFilm.url}" alt="image_film"/>`

    let info = document.querySelector('div.featured_infos')
    let infoFeatured = {
        'Titre': detailsFilm.title,
        'Pays': detailsFilm.countries,
        'Duree': detailsFilm.duration + 'mn',
    }
    info.innerHTML = `<h1 href="#modal1" class="featuredTitle img_film" id="featured_title">${detailsFilm.title}</h1>
                      <p class="featuredTitle">${detailsFilm.countries}</p>
                      <p class="featuredTitle">${detailsFilm.duration} minutes</p>
                      <p class="featuredTitle">Résumé : ${detailsFilm.description}</p>`

}


export function displayFilmFrame(detailsFilm, div) {
    /**
     * insert the covers of the 7 films in individual <div>
     * @param detailsFilm
     */
    let filmFrame = [];
    let filmURL = [];
    // insert all urls in array
    for (let elt of detailsFilm) {
        filmFrame.push(elt.image_url);
        filmURL.push(elt.url);
    }
    // Create a <div> to insert all url img
    let divCat1 = document.querySelector(div);
    let index = 0;
    for (let frame of filmFrame) {
        let film = document.createElement('div');
        film.className = "img_film";
        film.innerHTML = `<img src = "${frame}" href = "#modal1" id="${filmURL[index]}" alt="image_film"/>`
        index += 1;
        divCat1.appendChild(film)
    }
}

export async function fetchFilm(filmURL) {
    /**
     * Fetch the clicked film before sending for display
     */
    let filmDetails = await getFetch(filmURL)
    displayModalMovie(filmDetails)
}

function displayModalMovie(filmDetails) {
    /**
     * Initializes the movie information in the modal movie
     */
    let modalImg = document.getElementById("modal_movie_image")
    modalImg.setAttribute("src", filmDetails.image_url)
    let modalInfos = document.querySelector("div.infos_movie")
    let infosMovie = {
        'Titre': filmDetails.title, 'Genre(s)': filmDetails.genres, 'Date de sortie': filmDetails.date_published,
        'Note': filmDetails.rated, 'Score IMDB': filmDetails.imdb_score, 'Realisateur(s)': filmDetails.directors,
        'Acteurs': filmDetails.actors, 'Duree': filmDetails.duration, 'Pays d\'origine': filmDetails.countries,
        'Resultat au Box Office': filmDetails.worldwide_gross_income, 'Resume du film': filmDetails.long_description

    }
    let display = "<ul>";
    for (const [key, value] of Object.entries(infosMovie)) {
        display += `<li class="chip"><strong>${key} :</strong>  ${value}</li>`;
    }
    display += "</ul>";
    modalInfos.innerHTML = display;
}