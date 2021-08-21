/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/carousel.js":
/*!*************************!*\
  !*** ./src/carousel.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Carousel\": () => (/* binding */ Carousel)\n/* harmony export */ });\nclass Carousel {\n    /**\n     * @param {HTMLElement} element\n     * @param {Object} options\n     * @param {Object} options.slidesToScroll => number of elements to scroll\n     * @param {Object} options.slidesVisible => number of visible slides\n     * @param {boolean} options.loop => boucler en fin de carousel\n     */\n    constructor(element, options = {}) {\n        this.element = element\n        this.options = Object.assign({}, {\n            slidesToScroll: 1,\n            slidesVisible: 4,\n            loop: true\n        }, options)\n        let children = [].slice.call(element.children)\n        this.currentItem = 0\n        this.root = this.createDivWithClass('carousel')\n        this.container = this.createDivWithClass('carousel__container')\n        this.root.appendChild(this.container)\n        this.root.setAttribute('class', 'carousel')\n        this.element.appendChild(this.root)\n        this.moveCallbacks = []\n        this.items = children.map((child) => {\n            let item = this.createDivWithClass('carousel__item')\n            item.appendChild(child)\n            this.container.appendChild(item)\n            return item\n\n        })\n        this.setStyle()\n        this.createNavigation()\n        this.moveCallbacks.forEach(callbacks => callbacks(0))\n    }\n\n\n    setStyle() {\n        /**\n         * Applique les bonnes dimensions aux éléments du carousel\n         */\n        let ratio = this.items.length / this.options.slidesVisible\n        this.container.style.width = (ratio * 100) + \"%\"\n        this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ratio) + '%')\n    }\n\n\n    createDivWithClass(className) {\n        /**\n         * Facilite la création de div dans le carousel\n         * @param {string} className\n         * @returns {HTMLElement}\n         */\n        let div = document.createElement('div')\n        div.setAttribute('class', className)\n        return div\n\n    }\n\n\n    createNavigation() {\n        /**\n         * Permet de créer la navigation dans le carousel\n         */\n        let nextButton = this.createDivWithClass('carousel__next')\n        let prevButton = this.createDivWithClass('carousel__prev')\n        this.root.appendChild(nextButton)\n        this.root.appendChild(prevButton)\n        nextButton.addEventListener('click', this.next.bind(this))\n        prevButton.addEventListener('click', this.prev.bind(this))\n    }\n\n\n    next() {\n        /**\n         * mouvement du carousel sur la frame suivante\n         */\n        this.goToItem(this.currentItem + this.options.slidesToScroll)\n    }\n\n    prev() {\n        /**\n         * Mouvement du carousel sur la frame précédente\n         */\n        this.goToItem(this.currentItem - this.options.slidesToScroll)\n    }\n\n    goToItem(index) {\n        /**\n         * Active le retour à la première frame si user arrivé à la frame 7 et inversement\n         * @param index\n         */\n        if (index < 0) {\n            index = this.items.length - this.options.slidesVisible\n        } else if (index >= this.items.length || this.items[this.currentItem + this.options.slidesVisible] === undefined) {\n            index = 0\n        }\n        let translateX = index * -100 / this.items.length\n        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'\n        this.currentItem = index\n        this.moveCallbacks.forEach(callbacks => callbacks())\n    }\n\n}\n\n//# sourceURL=webpack://P6_npm/./src/carousel.js?");

/***/ }),

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"displayFeaturedFilm\": () => (/* binding */ displayFeaturedFilm),\n/* harmony export */   \"displayFilmFrame\": () => (/* binding */ displayFilmFrame),\n/* harmony export */   \"fetchFilm\": () => (/* binding */ fetchFilm)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n\n\n\nfunction displayFeaturedFilm(detailsFilm, div) {\n    let frame = document.querySelector('div.featured_frame')\n    frame.innerHTML = `<img class = 'frame' src = \"${detailsFilm.image_url}\" \n                        href = \"#modal1\" id=\"${detailsFilm.url}\" alt=\"image_film\"/>`\n\n    let info = document.querySelector('div.featured_infos')\n    let infoFeatured = {\n        'Titre': detailsFilm.title,\n        'Pays': detailsFilm.countries,\n        'Duree': detailsFilm.duration + 'mn',\n    }\n    info.innerHTML = `<h1 href=\"#modal1\" class=\"featuredTitle img_film\" id=\"featured_title\">${detailsFilm.title}</h1>\n                      <p class=\"featuredTitle\">${detailsFilm.countries}</p>\n                      <p class=\"featuredTitle\">${detailsFilm.duration} minutes</p>\n                      <p class=\"featuredTitle\">Résumé : ${detailsFilm.description}</p>`\n\n}\n\n\nfunction displayFilmFrame(detailsFilm, div) {\n    /**\n     * insère les jaquettes des 7 films dans des <div> individuelles\n     * @param detailsFilm\n     */\n    let filmFrame = [];\n    let filmURL = [];\n    // insert all urls in array\n    for (let elt of detailsFilm) {\n        filmFrame.push(elt.image_url);\n        filmURL.push(elt.url);\n    }\n    // Create a <div> to insert all url img\n    let divCat1 = document.querySelector(div);\n    let index = 0;\n    for (let frame of filmFrame) {\n        let film = document.createElement('div');\n        film.className = \"img_film\";\n        film.innerHTML = `<img src = \"${frame}\" href = \"#modal1\" id=\"${filmURL[index]}\" alt=\"image_film\"/>`\n        index += 1;\n        divCat1.appendChild(film)\n    }\n}\n\nasync function fetchFilm(filmURL) {\n    let filmDetails = await (0,_index__WEBPACK_IMPORTED_MODULE_0__.getFetch)(filmURL)\n    displayModalMovie(filmDetails)\n}\n\nfunction displayModalMovie(filmDetails) {\n    /**\n     * Init movie informations\n     * @param filmDetails\n     */\n    let modalImg = document.getElementById(\"modal_movie_image\")\n    modalImg.setAttribute(\"src\", filmDetails.image_url)\n    let modalInfos = document.querySelector(\"div.infos_movie\")\n    let infosMovie = {\n        'Titre': filmDetails.title, 'Genre(s)': filmDetails.genres, 'Date de sortie': filmDetails.date_published,\n        'Note': filmDetails.rated, 'Score IMDB': filmDetails.imdb_score, 'Realisateur(s)': filmDetails.directors,\n        'Acteurs': filmDetails.actors, 'Duree': filmDetails.duration, 'Pays d\\'origine': filmDetails.countries,\n        'Resultat au Box Office': filmDetails.worldwide_gross_income, 'Resume du film': filmDetails.long_description\n\n    }\n    let display = \"<ul>\";\n    for (const [key, value] of Object.entries(infosMovie)) {\n        display += `<li class=\"chip\"><strong>${key} :</strong>  ${value}</li>`;\n    }\n    display += \"</ul>\";\n    modalInfos.innerHTML = display;\n}\n\n//# sourceURL=webpack://P6_npm/./src/display.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getFetch\": () => (/* binding */ getFetch)\n/* harmony export */ });\n/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ \"./src/display.js\");\n/* harmony import */ var _carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./carousel */ \"./src/carousel.js\");\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal */ \"./src/modal.js\");\n\n\n\n\nlet url = \"http://localhost:8000/api/v1/titles/\";\n\nlet category = [\"adventure\", \"drama\", \"comedy\"];\n\n\nasync function main() {\n    // Featured movie ripping and viewing\n\n    // Extraction of the 7 films in the \"Meilleur films toutes categories\"\n    let bestMovie = await getMovies(url + \"?sort_by=-imdb_score\");\n    // Extraction of the best film in all categories\n    let featuredFilmUrl = bestMovie[0].url\n    let featuredFilm = await getFetch(featuredFilmUrl)\n    // display of the featured film\n    ;(0,_display__WEBPACK_IMPORTED_MODULE_0__.displayFeaturedFilm)(featuredFilm, 'div.featured_movie')\n    // display of the 7 films in the \"Meilleur films toutes categories\"\n    ;(0,_display__WEBPACK_IMPORTED_MODULE_0__.displayFilmFrame)(bestMovie, 'div.best_movie');\n    // Creation of the carousel of the 7 films in the \"Meilleur films toutes categories\"\n    new _carousel__WEBPACK_IMPORTED_MODULE_1__.Carousel(document.querySelector('div.best_movie'))\n    // Creation and display of the Carousel for the 7 best films in the category table\n    for (let cat of category) {\n        let Movies = await getMovies(url + \"?genre=\" + cat + \"&sort_by=-imdb_score\");\n        (0,_display__WEBPACK_IMPORTED_MODULE_0__.displayFilmFrame)(Movies, 'div.' + cat);\n        new _carousel__WEBPACK_IMPORTED_MODULE_1__.Carousel(document.querySelector('div.' + cat))\n    }\n    // Implement modal view if 'click' on a frame\n    let film = document.querySelectorAll('.img_film')\n    film.forEach(a => {\n        a.addEventListener('click', function (e) {\n            let urlMovieDetails = a.querySelector('img').id\n            ;(0,_display__WEBPACK_IMPORTED_MODULE_0__.fetchFilm)(urlMovieDetails)\n            ;(0,_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)(e)\n        })\n    })\n}\n\nasync function getMovies(url) {\n    /**\n     * send the url to getFetch, receive a promise and insert the movies in a table\n     * @type {[]} category films table\n     */\n    let array = []\n    // fetch url of page 1\n    let response = await getFetch(url);\n    // fetch url of page 2\n    let response2 = await getFetch((url + '&page=2'))\n    // insert in the table all the movies of page 1\n    for (let film of response.results) array.push(film)\n    // insert in table only the first 2 films on page 2\n    for (let i = 0; i < 2; i++) array.push(response2.results[i])\n    return array\n}\n\n\nasync function getFetch(url) {\n    /**\n     * Fetch url and return the result\n     * @type {Response}\n     */\n    let response = await fetch(url)\n    if (response.ok) {\n        return response.json()\n    } else {\n        return false\n    }\n}\n\nmain()\n\n\n//# sourceURL=webpack://P6_npm/./src/index.js?");

/***/ }),

/***/ "./src/modal.js":
/*!**********************!*\
  !*** ./src/modal.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"openModal\": () => (/* binding */ openModal)\n/* harmony export */ });\nlet modal = null\n\nfunction openModal(e) {\n    e.preventDefault()\n    const target = document.querySelector(e.target.getAttribute('href'))\n    target.style.display = null\n    target.removeAttribute('aria-hidden')\n    target.setAttribute('aria-modal', true)\n    modal = target\n    modal.addEventListener('click', closeModal)\n    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)\n    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)\n}\n\nfunction closeModal(e) {\n    if (modal === null) return\n    e.preventDefault()\n    modal.style.display = 'none'\n    modal.setAttribute('aria-hidden', true)\n    modal.removeAttribute('aria-modal')\n    modal.removeEventListener('click', closeModal)\n    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)\n    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)\n    modal = null\n}\n\nfunction stopPropagation(e) {\n    e.stopPropagation()\n}\n\nwindow.addEventListener('keydown', function (e) {\n    if (e.key === \"Escape\" || e.key === \"Esc\") {\n        closeModal(e)\n    }\n\n})\n\n//# sourceURL=webpack://P6_npm/./src/modal.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;