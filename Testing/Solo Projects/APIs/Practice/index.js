
// let postsArray = []
// const coloursForm = document.getElementById("new-post")

// const options = {
//     method: "GET",
//     body: JSON.stringify(data),
//     headers: {
//         "Content-Type": "application/json"
//     }
// }

fetch("https://www.thecolorapi.com/id?hex=0047AB&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33&format=html")
  .then(res => res.text())  // Use res.text() instead of res.json()
  .then(data => {
    console.log(data);
    document.getElementById("colors").innerHTML = data;  // Use innerHTML instead of textContent
  });




// let postsArray = []
// const titleInput = document.getElementById("post-title")
// const bodyInput = document.getElementById("post-body")
// const coloursForm = document.getElementById("new-post")

// function renderPosts() {
//     let html = ""
//     for (let post of postsArray) {
//         html += `
//             <h3>${post.title}</h3>
//             <p>${post.body}</p>
//             <hr />
//         `
//     }
//     document.getElementById("blog-list").innerHTML = html
// }

// fetch("https://apis.scrimba.com/jsonplaceholder/posts")
//     .then(res => res.json())
//     .then(data => {
//         postsArray = data.slice(0, 5)
//         renderPosts()
//     })