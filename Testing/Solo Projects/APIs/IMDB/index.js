fetch("http://www.omdbapi.com/?t=Titanic&y=1997&apikey=54847e20")
.then(response => response.json())
.then(data => 
    
    {
    Title = data.Title
    Rating = data.Ratings[0]
    Duration = data.Runtime
    Genre = data.Genre
    Description = data.Plot
    console.log(data)
}

    )