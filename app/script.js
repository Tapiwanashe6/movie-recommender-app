// Secure API key handling (client-side limitation - ideally handle on server)
const apiKey = RAPIDAPI_KEY;
const apiHost = RAPIDAPI_HOST;
const apiUrl = 'https://imdb236.p.rapidapi.com/imdb/top250-movies'; // More descriptive variable name

let allMovies = []; // Store all fetched movies
let displayedMovies = []; // To hold the movies after filtering/searching
let initialMovies = []; // To store the initially loaded and shuffled movies for refresh

const apiOptions = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost
    }
};

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function fetchMovies() {
    document.getElementById('loadingSpinner').style.display = 'block'; // Show the spinner
    document.querySelector('.movies-container').style.display = 'none'; // Hide the content
    document.getElementById('error-message').textContent = ''; // Clear any previous error messages

    try {
        const response = await fetch(apiUrl, apiOptions);

        if (response.status === 403) {
            throw new Error("Access forbidden. Check your API key or plan.");
        }
        if (response.status === 429) {
            throw new Error("Too many requests. Slow down or upgrade your plan.");
        }
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Limit results to 12 movies for better demonstration of filtering
        allMovies = data.slice(0, 12);
        shuffleArray(allMovies); // Shuffle the movies initially
        displayedMovies = [...allMovies]; // Initialize displayed movies
        initialMovies = [...displayedMovies]; // Store the initial state
        displayMovies(displayedMovies);
        document.getElementById('loadingSpinner').style.display = 'none'; // Hide the spinner
        document.querySelector('.movies-container').style.display = 'block'; // Show the content
    } catch (error) {
        console.error("Error fetching movies:", error.message);
        document.getElementById('error-message').textContent = `Error: ${error.message}`;
        document.getElementById('loadingSpinner').style.display = 'none'; // Hide spinner on error
        document.querySelector('.movies-container').style.display = 'block'; // Show (empty or error message)
    }
}

function displayMovies(movies) {
    const moviesContainer = document.querySelector('.movies');
    if (moviesContainer) {
        moviesContainer.innerHTML = ''; // Clear previous movies
        const movieList = document.createElement('ul');
        moviesContainer.appendChild(movieList);

        movies.forEach(movie => {
            const posterUrl = movie.primaryImage;
            const title = movie.primaryTitle;
            const year = movie.startYear;
            const genres = movie.genres ? movie.genres.join(', ') : 'N/A';
            const imdbUrl = 'https://www.imdb.com/'; // Set the URL to IMDb homepage

            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = imdbUrl; // Use the IMDb homepage URL
            link.target = '_blank';
            link.innerHTML = `
                <img src="${posterUrl}" alt="${title}">
                <h2>${title}</h2>
                <p class="movie-details">Year: ${year}</p>
                <p class="movie-details movie-genres">Genres: ${genres}</p>
                <p class="movie-details">Rating: ${movie.averageRating}</p>
            `;
            listItem.appendChild(link);
            movieList.appendChild(listItem);
        });
    } else {
        console.error("Could not find the .movies container in the HTML.");
    }
}

function sortMoviesByRating() {
    if (displayedMovies.length > 0) {
        const sortedMovies = [...displayedMovies].sort((a, b) => b.averageRating - a.averageRating);
        displayMovies(sortedMovies);
        console.log("Movies sorted by rating."); // Basic user feedback
    }
}

function sortMoviesByTitle() {
    if (displayedMovies.length > 0) {
        const sortedMovies = [...displayedMovies].sort((a, b) => {
            const titleA = a.primaryTitle.toLowerCase();
            const titleB = b.primaryTitle.toLowerCase();
            return titleA.localeCompare(titleB);
        });
        displayMovies(sortedMovies);
        console.log("Movies sorted by title."); // Basic user feedback
    }
}

function sortMoviesByYear() {
    if (displayedMovies.length > 0) {
        const sortedMovies = [...displayedMovies].sort((a, b) => a.startYear - b.startYear);
        displayMovies(sortedMovies);
        console.log("Movies sorted by year."); // Basic user feedback
    }
}

function applyFilters() {
    const genreCheckboxes = document.querySelectorAll('.filters input[type="checkbox"]:checked');
    const selectedGenres = Array.from(genreCheckboxes).map(cb => cb.value);
    const selectedYear = document.getElementById('yearFilter').value;

    displayedMovies = allMovies.filter(movie => {
        let genreMatch = true;
        if (selectedGenres.length > 0 && movie.genres) {
            genreMatch = selectedGenres.some(genre => movie.genres.includes(genre));
        } else if (selectedGenres.length > 0 && !movie.genres) {
            genreMatch = false;
        }

        let yearMatch = true;
        if (selectedYear && selectedYear !== "") {
            yearMatch = movie.startYear.toString() === selectedYear;
        }

        return genreMatch && yearMatch;
    });

    displayMovies(displayedMovies);
    console.log("Filters applied."); // Basic user feedback
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', handleSearch);

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    displayedMovies = allMovies.filter(movie => {
        return (
            movie.primaryTitle.toLowerCase().includes(searchTerm) ||
            (movie.genres && movie.genres.some(genre => genre.toLowerCase().includes(searchTerm)))
        );
    });
    displayMovies(displayedMovies);
    console.log(`Search term: "${searchTerm}" applied.`); // Basic user feedback
}

// Refresh button functionality
document.getElementById('refreshButton').addEventListener('click', refreshMovies);

function refreshMovies() {
    displayedMovies = [...initialMovies]; // Reset to the initial shuffled movies
    displayMovies(displayedMovies);
    // Optionally reset filters and search
    const genreCheckboxes = document.querySelectorAll('.filters input[type="checkbox"]');
    genreCheckboxes.forEach(cb => cb.checked = false);
    document.getElementById('yearFilter').value = "";
    document.getElementById('searchInput').value = "";
    console.log("Movies refreshed."); // Basic user feedback
}

// Initial fetch to start loading
fetchMovies();

/*
SECURITY NOTE:
The API key is currently stored directly in the client-side JavaScript.
This is generally NOT recommended for production applications as it can expose your API key.

For a more secure approach, you should handle the API request on a backend server.
Your frontend would then make a request to your backend, which would in turn
make the request to the third-party API using the secure API key stored on the server.
*/
