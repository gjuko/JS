const posts = [
    {
      name: "BMW-Mottorad",
      username: "gjuko",
      location: "Munich, Germany",
      avatar: "images/bmw-logo.png",
      post: "images/bmws1000rrm.jpg",
      comment: "Just look at this beauty",
      likes: 998,
    },
    {
      name: "Ducati",
      username: "every.biker",
      location: "Italy",
      avatar: "images/ducati-logo.jpeg",
      post: "images/ducatipanigalev4.jpeg",
      comment: "what a stunning machine",
      likes: 760,
    },
    {
      name: "Kawasaki",
      username: "Ninja",
      location: "Japan",
      avatar: "images/Kawasaki-Logo.jpg",
      post: "images/kawasakininjah2r.jpeg",
      comment: "This is a real missile",
      likes: 700,
    },
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
  
      // Create a wrapper div for the images
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("image-wrapper");
  
      let img1 = document.createElement("img");
      img1.classList.add("like");
      img1.src = "/images/like.png";
  // Variables to store the state
  let isImage1Clicked = false;

  // Add event listener to img1
  img1.addEventListener("click", () => {
    if (isImage1Clicked) {
      // If image1 is clicked again, decrement the like count and change the background image back to the original
      post.likes--;
      img1.style.backgroundImage = "url('/images/like.png')";
    } else {
      // Otherwise, increment the like count and change the background image to the new image
      post.likes++;
      img1.style.backgroundImage = "url('/images/like-hover.png')";
    }

    // Update the text content of postLikes
    postLikes.textContent = post.likes + " likes";

    // Toggle the state
    isImage1Clicked = !isImage1Clicked;
  });
  
      let img2 = document.createElement("img");
      img2.classList.add("comment-icon");
      img2.src = "/images/comment.png";

      let img3 = document.createElement("img");
      img3.classList.add("share");
      img3.src = "/images/share.png";
  
      imageWrapper.appendChild(img1);
      imageWrapper.appendChild(img2);
      imageWrapper.appendChild(img3);
  
      postDiv.appendChild(imageWrapper);
  
      postContainer.appendChild(postDiv);
      container.appendChild(postContainer);
    });
  }
  
  // Call the function when the page loads
  window.addEventListener("load", createPostElements);
  