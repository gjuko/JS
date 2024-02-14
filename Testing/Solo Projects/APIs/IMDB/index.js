const searchBtn = document.getElementById("search-button");
const searchField = document.getElementById("search-field");
const notificationContainer = document.getElementById("notification-container");

async function fetchMovieData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie data:', error);
        throw error;
    }
}

function renderMovie(movieData) {
    const movieContainer = document.getElementById("movie-container");

    // Create container for the movie
    const movieWrapper = document.createElement("div");
    movieWrapper.classList.add("movie-wrapper");

    // Create movie element
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    const titleElement = document.createElement("h2");
    titleElement.textContent = movieData.Title;
    movieElement.appendChild(titleElement);

    const imdbRating = movieData.Ratings.find(rating => rating.Source === "Internet Movie Database");
    const imdbScore = document.createElement("h3");
    if (imdbRating) {
        const ratingValue = imdbRating.Value.split("/")[0]; // Extract the rating part before "/"
        imdbScore.innerHTML = `${ratingValue}<span>&#11088;</span>`;
    }
    movieElement.appendChild(imdbScore);

    const durationElement = document.createElement("p");
    durationElement.textContent = `Duration: ${movieData.Runtime}`;
    movieElement.appendChild(durationElement);

    const yearElement = document.createElement("p");
    yearElement.textContent = `Released: ${movieData.Released}`;
    movieElement.appendChild(yearElement);

    const genreElement = document.createElement("p");
    genreElement.textContent = `Genre: ${movieData.Genre}`;
    movieElement.appendChild(genreElement);

    const watchListButton = document.createElement("button");
    watchListButton.textContent = "Add to Watchlist";
    watchListButton.classList.add("watchlist-button"); // Add a CSS class for styling
    movieElement.appendChild(watchListButton);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = `Description: ${movieData.Plot}`;
    movieElement.appendChild(descriptionElement);

    const moviePosterElement = document.createElement("img");
    moviePosterElement.src = movieData.Poster;
    movieElement.appendChild(moviePosterElement);

    // Append the movie element to the movie wrapper
    movieWrapper.appendChild(movieElement);

    // Prepend the movie wrapper to the main movie container
    movieContainer.insertBefore(movieWrapper, movieContainer.firstChild);

    // Add a click event listener to the "Add to Watchlist" button
    watchListButton.addEventListener("click", () => {
        // Extract movie information
        const movieInfo = {
            title: movieData.Title,
            imdbRating: imdbRating ? imdbRating.Value : "N/A", // Handle cases where IMDb rating is not available
            duration: movieData.Runtime,
            year: movieData.Released,
            genre: movieData.Genre,
            description: movieData.Plot,
            poster: movieData.Poster
        };

        // Get the existing watchlist from local storage or initialize an empty array
        let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

        // Check if the movie is already in the watchlist
        const movieIndex = watchlist.findIndex(movie => movie.title === movieInfo.title);
        if (movieIndex === -1) {
            // If the movie is not in the watchlist, add it
            watchlist.push(movieInfo);

            // Save the updated watchlist to local storage
            localStorage.setItem("watchlist", JSON.stringify(watchlist));

            // Display a toast notification
            const toastDetails = {
                id: "success",
                icon: "fa-check",
                text: `${movieData.Title} has been added to your watchlist!`
            };
            createToast(toastDetails);
        } else {
            // If the movie is already in the watchlist, display a message
            const toastDetails = {
                id: "warning",
                icon: "fa-exclamation-circle",
                text: `${movieData.Title} is already in your watchlist!`
            };
            createToast(toastDetails);
        }
    });
}

async function searchAndRenderMovie(title) {
    if (title) {
        const apiUrl = `https://www.omdbapi.com/?apikey=54847e20&t=${title}`;
        try {
            const data = await fetchMovieData(apiUrl);
            renderMovie(data);
            searchField.value = ""; // Reset the value of the search field
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    } else {
        console.log("Please enter a movie title");
    }
}

// Add event listeners
searchBtn.addEventListener("click", () => searchAndRenderMovie(searchField.value));
searchField.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        searchAndRenderMovie(searchField.value);
    }
});

const createToast = (details) => {
    const { icon, text } = details;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${text}</span>`;
    notificationContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = 0;
        setTimeout(() => {
            toast.remove();
        }, 1000); // Fade out transition duration
    }, 3000); // 3 seconds
};
