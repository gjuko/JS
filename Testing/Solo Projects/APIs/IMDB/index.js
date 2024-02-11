const searchBtn = document.getElementById("search-button");
const searchField = document.getElementById("search-field");

// Function to fetch random movies
function fetchRandomMovies() {
    const apiUrl = "http://www.omdbapi.com/?apikey=54847e20&type=movie&s=random&page=1";
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => data.Search);
}

// Function to render random movies
function renderRandomMovies() {
    fetchRandomMovies()
        .then(movies => {
            movies.forEach(movie => {
                const apiUrl = `http://www.omdbapi.com/?apikey=54847e20&i=${movie.imdbID}`;
                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => renderResults(data))
                    .catch(error => {
                        console.error('Error fetching movie details:', error);
                    });
            });
        })
        .catch(error => {
            console.error('Error fetching random movies:', error);
        });
}

// Call renderRandomMovies when the page is loaded
window.addEventListener("load", renderRandomMovies);


searchBtn.addEventListener("click", search);

searchField.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        search();
    }
});

function search() {
    const title = searchField.value;

    if (title) {
        const apiUrl = `http://www.omdbapi.com/?apikey=54847e20&t=${title}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                renderResults(data);
                searchField.value = ""; // Reset the value of the search field
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } else {
        console.log("Please enter a movie title");
    }
}

function renderResults(data) {
    const movieContainer = document.getElementById("movie-container");

    // Create container for the movie
    const movieWrapper = document.createElement("div");
    movieWrapper.classList.add("movie-wrapper");

    // Create movie element
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    const titleElement = document.createElement("h2");
    titleElement.textContent = data.Title;
    movieElement.appendChild(titleElement);

    const imdbRating = data.Ratings.find(rating => rating.Source === "Internet Movie Database");
    const imdbScore = document.createElement("h3");
    if (imdbRating) {
        const ratingValue = imdbRating.Value.split("/")[0]; // Extract the rating part before "/"
        imdbScore.innerHTML = `${ratingValue}<span>&#11088;</span>`;
    }
    movieElement.appendChild(imdbScore);

    const durationElement = document.createElement("p");
    durationElement.textContent = `Duration: ${data.Runtime}`;
    movieElement.appendChild(durationElement);

    const yearElement = document.createElement("p");
    yearElement.textContent = `Released: ${data.Released}`;
    movieElement.appendChild(yearElement);

    const genreElement = document.createElement("p");
    genreElement.textContent = `Genre: ${data.Genre}`;
    movieElement.appendChild(genreElement);

    const watchListButton = document.createElement("button");
    watchListButton.textContent = "Add to Watchlist";
    watchListButton.classList.add("watchlist-button"); // Add a CSS class for styling
    movieElement.appendChild(watchListButton);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = `Description: ${data.Plot}`;
    movieElement.appendChild(descriptionElement);

    const moviePosterElement = document.createElement("img");
    moviePosterElement.src = data.Poster;
    movieElement.appendChild(moviePosterElement);

    // Append the movie element to the movie wrapper
    movieWrapper.appendChild(movieElement);

    // Prepend the movie wrapper to the main movie container
    movieContainer.insertBefore(movieWrapper, movieContainer.firstChild);

    // Add a horizontal rule after each movie container
    const separator = document.createElement("hr");
    movieContainer.insertBefore(separator, movieWrapper.nextSibling);

    // Add a click event listener to the plus symbol
    watchListButton.addEventListener("click", () => {
        // Extract movie information
        const movieInfo = {
            title: data.Title,
            imdbRating: imdbRating ? imdbRating.Value : "N/A", // Handle cases where IMDb rating is not available
            duration: data.Runtime,
            year: data.Released,
            genre: data.Genre,
            description: data.Plot,
            poster: data.Poster
        };

        // Get the existing watchlist from local storage or initialize an empty array
        const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

        // Add the current movie to the watchlist array
        watchlist.push(movieInfo);

        // Save the updated watchlist to local storage
        localStorage.setItem("watchlist", JSON.stringify(watchlist));

        // Display a message indicating that the movie has been added to the watchlist
        const message = document.createElement("p");
        message.textContent = `${data.Title} has been added to your watchlist!`;
        movieWrapper.appendChild(message);

        // Remove the message after a certain time (e.g., 3 seconds)
        setTimeout(() => {
            movieWrapper.removeChild(message);
        }, 3000);
    });
}

