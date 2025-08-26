// Fetch posts from your Go backend
fetch("http://localhost:8080/api/blogpost")
    .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
    })
    .then(postsArr => {
        let html = "";
        for (let post of postsArr.reverse()) {
            html += `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr />
            `;
        }
        document.getElementById("blog-list").innerHTML = html;
    })
    .catch(err => {
        console.error("Error fetching posts:", err);
    });

// Submit new post to your Go backend
document.getElementById("new-post").addEventListener("submit", function(e) {
    e.preventDefault()
    const postTitle = document.getElementById("post-title").value
    const postBody = document.getElementById("post-body").value
    const data = {
        title: postTitle,
        body: postBody
    }
    fetch("http://localhost:8080/api/blogpost", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(() => {
        // Optionally reload posts after adding
        location.reload()
    })
})