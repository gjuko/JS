// Function to render watchlist
function renderWatchlist() {
    const watchlistContainer = document.getElementById("watchlist-container");

    // Get watchlist from local storage
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    // Clear previous content
    watchlistContainer.innerHTML = "";

    // Render each movie in the watchlist
    watchlist.forEach(movieInfo => {
        const movieElement = createMovieElement(movieInfo);
        watchlistContainer.appendChild(movieElement);
    });
}

// Function to create movie element
function createMovieElement(movieInfo) {
    // Create container for the movie
    const movieWrapper = document.createElement("div");
    movieWrapper.classList.add("movie-wrapper");

    // Create movie element
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    const titleElement = document.createElement("h2");
    titleElement.textContent = movieInfo.title;
    movieElement.appendChild(titleElement);

    const imdbRatingElement = document.createElement("p");
    imdbRatingElement.textContent = `IMDb Rating: ${movieInfo.imdbRating}`;
    movieElement.appendChild(imdbRatingElement);

    const durationElement = document.createElement("p");
    durationElement.textContent = `Duration: ${movieInfo.duration}`;
    movieElement.appendChild(durationElement);

    const genreElement = document.createElement("p");
    genreElement.textContent = `Genre: ${movieInfo.genre}`;
    movieElement.appendChild(genreElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = `Description: ${movieInfo.description}`;
    movieElement.appendChild(descriptionElement);

    const posterElement = document.createElement("img");
    posterElement.src = movieInfo.poster;
    movieElement.appendChild(posterElement);

    // Create remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-button"); // Add a CSS class for styling
    removeButton.addEventListener("click", () => {
        removeFromWatchlist(movieInfo.title);
    });
    movieElement.appendChild(removeButton);

    // Append the movie element to the movie wrapper
    movieWrapper.appendChild(movieElement);

    return movieWrapper;
}

// Function to remove a movie from the watchlist
function removeFromWatchlist(title) {
    // Get watchlist from local storage
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    // Filter out the movie to be removed
    watchlist = watchlist.filter(movie => movie.title !== title);

    // Save the updated watchlist to local storage
    localStorage.setItem("watchlist", JSON.stringify(watchlist));

    // Re-render the watchlist
    renderWatchlist();
}

// Call renderWatchlist when the page is loaded
window.addEventListener("load", renderWatchlist);
