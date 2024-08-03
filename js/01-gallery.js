import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery")

const createGalleryMarkup = (items) => {
    return items
    .map((item) =>{
        const { preview, original, description} = item;
        return `
        <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`
    }).join("");

};

const renderGallery = () => {
    galleryContainer.innerHTML= createGalleryMarkup
    (galleryItems);
};

renderGallery();

let instance = null;

function onGalleryClick(event) {
    event.preventDefault();
    const isGalleryImg = event.target.classList.contains
    ("gallery__image");

    if (!isGalleryImg) return;

    const imgSource = event.target.dataset.source;

    instance = basicLightbox.create(`
        <img src="${imgSource}" width="800" height= "800" />`
    );

    instance.show();

    document.addEventListener("keydown", onEscapePress);
}


function onEscapePress(event) {
    if (event.key === "Escape" && instance !== null) {
        instance.close();
        instance = null; 
        document.removeEventListener("keydown", onEscapePress); 
    }
}


galleryContainer.addEventListener("click", onGalleryClick);
