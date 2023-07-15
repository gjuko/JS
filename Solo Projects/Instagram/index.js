const posts = [
    {
        name: "BMW-Mottorad",
        username: "gjuko",
        location: "Munich, Germany",
        avatar: "images/bmw-logo.png",
        post: "images/bmws1000rrm.jpg",
        comment: "Just look at this beauty",
        likes: 998
    },
    {
        name: "Ducati",
        username: "every.biker",
        location: "Italy",
        avatar: "images/ducati-logo.jpeg",
        post: "images/ducatipanigalev4.jpeg",
        comment: "what a stunning machine",
        likes: 760
    },
    {
        name: "Kawasaki",
        username: "Ninja",
        location: "Japan",
        avatar: "images/Kawasaki-Logo.jpg",
        post: "images/kawasakininjah2r.jpeg",
        comment: "This is a real missile",
        likes: 700
    }
];

const photos = [
    "images/like.svg",
    "images/comment.svg",
    "images/share.svg",
];
function createPostElements() {
    const container = document.getElementById("post-container");
    // container.innerHTML = ""; // Clear the container before adding new posts

    posts.forEach((post, index) => {
        const postContainer = document.createElement("div");
        postContainer.classList.add("post-container");

        const postDiv = document.createElement("div");
        postDiv.classList.add("post");

        const postInfo = document.createElement("div"); // Create a container for postAvatar, name, and location
        postInfo.classList.add("post-info");

        const postAvatar = document.createElement("img");
        postAvatar.classList.add("post-avatar");
        postAvatar.src = post.avatar;
        postInfo.appendChild(postAvatar);

        const postHeading = document.createElement("h2");
        postHeading.classList.add("name");
        postHeading.textContent = post.name;
        postInfo.appendChild(postHeading);

        postDiv.appendChild(postInfo);

        const postLocation = document.createElement("h2");
        postLocation.classList.add("location");
        postLocation.textContent = post.location;
        postInfo.appendChild(postLocation);

        const postImage = document.createElement("img");
        postImage.classList.add("post-image");
        postImage.src = post.post;
        postDiv.appendChild(postImage);

        const postLikes = document.createElement("p");
        postLikes.classList.add("likes");
        postLikes.textContent = post.likes + " likes";
        postDiv.appendChild(postLikes);

        const postUsername = document.createElement("p");
        postUsername.classList.add("username");
        postUsername.textContent = post.username;
        postDiv.appendChild(postUsername);

        const postComment = document.createElement("p");
        postComment.classList.add("comment");
        postComment.textContent = post.comment;
        postDiv.appendChild(postComment);

        photos.forEach(photo => {
            const photoImg = document.createElement("img");
            photoImg.classList.add("icons");
            photoImg.src = photo;
            postDiv.insertBefore(photoImg, postLikes);
        });

        postContainer.appendChild(postDiv);
        container.appendChild(postContainer);
    });
}


// Call the function when the page loads
window.addEventListener("load", createPostElements);
