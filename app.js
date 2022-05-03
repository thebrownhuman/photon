const auth = "563492ad6f917000010000016d05b7fa66ec4e5cb770df16772cf074";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let page = 1;
let searchValue;
let fetchLink;
let currentSearch;

////event listners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  console.log(e);
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);
async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}
function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <div class="gallery-info">
    <p>${photo.photographer}</p>
    <a href=${photo.src.original}>Downloads</a>
    </div>
    <img src=${photo.src.large}> </img>
    `;
    gallery.appendChild(galleryImg);
  });
}
async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}
async function searchPhotos(query) {
  clear();
  if (query) {
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    generatePictures(data);
  } else {
    curatedPhotos();
  }
}
function updateInput(e) {
  searchValue = e.target.value;
}
function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}
async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}
curatedPhotos();
