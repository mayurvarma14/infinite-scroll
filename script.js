const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photos = [];
const count = 10;
const apiKey = `API_KEY`;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

async function getPhotos() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  photos = data;
  displayPhotos(photos);
}

function setAttributes(element, attributes) {
  for (const attribute in attributes) {
    // if (attributes.hasOwnProperty(attribute)) {
    const value = attributes[attribute];
    element.setAttribute(attribute, value);
    // }
  }
}
function displayPhotos() {
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
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
// getPhotos();
