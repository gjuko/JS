
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
            const somethingDiv = document.getElementById("something");
            somethingDiv.innerHTML = "";
        
            // Create HTML elements to display the results
            const titleElement = document.createElement("h2");
            titleElement.textContent = data.Title;
            const durationElement = document.createElement("p");
            durationElement.textContent = `Duration: ${data.Runtime}`;
            const genreElement = document.createElement("p");
            genreElement.textContent = `Genre: ${data.Genre}`;
            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = `Description: ${data.Plot}`;

            somethingDiv.appendChild(titleElement);
            somethingDiv.appendChild(durationElement);
            somethingDiv.appendChild(genreElement);
            somethingDiv.appendChild(descriptionElement);
        }


        // Title = data.Title
        // Rating = data.Ratings[0]
        // Duration = data.Runtime
        // Genre = data.Genre
        // Description = data.Plot