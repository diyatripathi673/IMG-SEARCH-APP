const acessKey = "WI6a-fq7mAyp-8jU0dYCUa9jNps8daB9YMFG2TEpbW8";
const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResult = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${acessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResult.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description; // Fix the typo here
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description; // Fix the typo here

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResult.appendChild(imageWrapper); // Append to searchResult, not imageWrapper
    });

    page++;

    if (page > 1) {
        showMore.style.display = "block";
    }
}

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", (event) => {
    searchImages();
});
