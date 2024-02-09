
const searchBtn = document.getElementById("search-button")

    searchBtn.addEventListener("click", () => {
        const title = document.getElementById("search-field").value;
    
        if (title) {
            const apiUrl = `http://www.omdbapi.com/?apikey=54847e20&t=${(title)}`;
            fetch(apiUrl)
                .then(response => {
                    return response.json();})
                .then(data => {
                    renderResults(data);
                });
        } else {
            console.log("Please enter a movie title");
        }
        });

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
                imdbScore.innerHTML = `${ratingValue} <span class="star">&#11088;</span>`;
            }
            movieElement.appendChild(imdbScore);
        
            const durationElement = document.createElement("p");
            durationElement.textContent = `Duration: ${data.Runtime}`;
            movieElement.appendChild(durationElement);
        
            const genreElement = document.createElement("p");
            genreElement.textContent = `Genre: ${data.Genre}`;
            movieElement.appendChild(genreElement);
        
            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = `Description: ${data.Plot}`;
            movieElement.appendChild(descriptionElement);
        
            const moviePosterElement = document.createElement("img");
            moviePosterElement.src = data.Poster;
            movieElement.appendChild(moviePosterElement);
        
            // Append the movie element to the movie wrapper
            movieWrapper.appendChild(movieElement);
        
            // Append the movie wrapper to the main movie container
            movieContainer.appendChild(movieWrapper);
        
            // Add a horizontal rule after each movie container
            const separator = document.createElement("hr");
            movieContainer.appendChild(separator);
        }
        