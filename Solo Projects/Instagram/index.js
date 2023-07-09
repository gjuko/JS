const posts = [
    {
        name: "BMW S1000 RR M",
        username: "gjuko",
        location: "Munich, Germany",
        avatar: "/Solo Projects/Instagram/images/bmw-logo.png",
        post: "/Solo Projects/Instagram/images/bmws1000rrm.jpg",
        comment: "Just look at this beauty",
        likes: 998
    },
    {
        name: "Ducati Panigale V4",
        username: "every.biker",
        location: "Ornans, France",
        avatar: "/Solo Projects/Instagram/images/ducati-logo.jpeg",
        post: "/Solo Projects/Instagram/images/ducatipanigalev4.jpeg",
        comment: "what a stunning machine",
        likes: 760
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "/Solo Projects/Instagram/images/Kawasaki-Logo.jpg",
        post: "/Solo Projects/Instagram/images/kawasakininjah2r.jpeg",
        comment: "This is a real missile",
        likes: 700
    }
]

// Preload like images
const heartRegular = new Image();
heartRegular.src = "images/heart-regular.svg";
const heartHover = new Image();
heartHover.src = "images/heart-hover.svg";

const postSection = document.getElementById('post-section')

// Build each post in posts array
for (let i = 0; i < posts.length; i++) {
    // create elements
    const postDiv = document.createElement('div');
    const userInfoDiv = document.createElement('div');
    const avatarImg = document.createElement('img');
    const postNameP = document.createElement('p');
    const postImg = document.createElement('img');
    const postIconsDiv = document.createElement('div');
    const likeImg = document.createElement('img');
    const commentImg = document.createElement('img');
    const shareImg = document.createElement('img');
    const postLikesP = document.createElement('p');
    const postCaptionP = document.createElement('p');

}