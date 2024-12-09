const apiKey = '30fcb8c771c8b59de36e603d4eb75364'; // Reemplaza con tu clave de API de TMDB

async function fetchMovies(category) {
    let url = '';

    switch (category) {
        case 'popular':
            url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=1`;
            break;
        case 'recently_added':
            url = `https://api.themoviedb.org/3/movie/latest?api_key=${apiKey}&language=es-ES`;
            break;
        case 'anime':
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16&sort_by=popularity.desc`;
            break;
        default:
            throw new Error('Categoría inválida');
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
}

async function populateCarruseles() {
    try {
        const popularMovies = await fetchMovies('popular');
        const recentlyAddedMovies = await fetchMovies('recently_added');
        const animeMovies = await fetchMovies('anime');

        populateCarrusel('lo-mas-popular', popularMovies);
        populateCarrusel('recien-anadidas', recentlyAddedMovies);
        populateCarrusel('peliculas-anime', animeMovies);
    } catch (error) {
        console.error(error);
    }
}

function populateCarrusel(carruselId, movies) {
    const carruselContent = document.querySelector(`#${carruselId} .carrusel-content`);
    carruselContent.innerHTML = ''; // Limpiar contenido previo

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <p>${movie.title}</p>
        `;
        carruselContent.appendChild(movieItem);
    });
}

document.addEventListener('DOMContentLoaded', populateCarruseles);