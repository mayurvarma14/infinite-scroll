const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let imagesLoaded = 0;
let totalImages = 0;
let photos = [];
const count = 30;
const apiKey = `KEY`;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

async function getPhotos() {
  const response = await fetch(apiUrl);
  photos = await response.json();
  displayPhotos();
}

function setAttributes(element, attributes) {
  for (const attribute in attributes) {
    const value = attributes[attribute];
    element.setAttribute(attribute, value);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photos.length;
  photos.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      title: photo.alt_description,
      alt: photo.alt_description,
    });
    img.addEventListener('load', () => {
      imagesLoaded++;
      if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
      }
    });
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready === true
  ) {
    ready = false;
    getPhotos();
  }
});
getPhotos();
