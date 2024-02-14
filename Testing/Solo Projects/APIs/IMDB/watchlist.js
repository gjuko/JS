// Function to render watchlist
function renderWatchlist() {
    const watchlistContainer = document.getElementById("watchlist-container");
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    watchlistContainer.innerHTML = ""; // Clear previous content

    watchlist.forEach(movieInfo => {
        const movieElement = createMovieElement(movieInfo);
        watchlistContainer.appendChild(movieElement);
    });
}

// Function to create movie element
function createMovieElement(movieInfo) {
    const { title, imdbRating, duration, genre, description, poster } = movieInfo;
    const movieWrapper = document.createElement("div");
    movieWrapper.classList.add("movie-wrapper");

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    const titleElement = document.createElement("h2");
    titleElement.textContent = title;
    movieElement.appendChild(titleElement);

        // Create remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove from Watchlist";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener("click", () => removeFromWatchlist(title));
        movieElement.appendChild(removeButton);

    const elements = [
        { type: "p", text: `IMDb Rating: ${imdbRating}` },
        { type: "p", text: `Duration: ${duration}` },
        { type: "p", text: `Genre: ${genre}` },
        { type: "p", text: `Description: ${description}` },
        { type: "img", src: poster },
    ];
    

    elements.forEach(item => {
        const element = document.createElement(item.type);
        if (item.type === "img") element.src = item.src;
        else element.textContent = item.text;
        movieElement.appendChild(element);
    });

    movieWrapper.appendChild(movieElement);

    return movieWrapper;
}

// Function to remove a movie from the watchlist
function removeFromWatchlist(title) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    watchlist = watchlist.filter(movie => movie.title !== title);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    renderWatchlist();
}

// Call renderWatchlist when the page is loaded
window.addEventListener("load", renderWatchlist);

