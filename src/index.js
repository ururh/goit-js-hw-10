import './css/styles.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import Notiflix from '../node_modules/notiflix';

elements = {
    breedSelect: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loaderText: document.querySelector('.loader'),
    errorText: document.querySelector('.error')
}

elements.loaderText.classList.add("invisible");
elements.errorText.classList.add("invisible")

function fillList() {

  fetchBreeds()
    .then((data) => {
      const breedList = data.map((el) => ({ name: el.name, id: el.id }));
      elements.breedSelect.insertAdjacentHTML('afterbegin', breedList.map(({ id, name }) =>
        `<option value = "${id}">${name}</option>`)
        .join(''));
    })
    .catch(() =>
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
  );
  
  elements.loaderText.classList.add("invisible");
};

fillList();

elements.breedSelect.addEventListener('change', (e) => {
  
  elements.loaderText.classList.remove("invisible");

    elements.catInfo.innerHTML = '';
    
    const value = e.target.value;

    console.log(elements.breedSelect);
  fetchCatByBreed(value)
    .then(catData => {
      elements.loaderText.classList.add("invisible");
      createCard(catData); 
  })
    .catch(() => {
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
    })
    
});

function createCard(cats) {
  const cat = cats[0];
  const markup = `
    <div>
    <img src="${cat.url}" class = "cat-img" alt="cat" width="500">
    </div>
    <div>
    <h2>${cat.breeds[0].name}</h2>
    <p> ${cat.breeds[0].description}</p>
    <h3>Temperamnet</h3>
    <p class ="cat-temp"> ${cat.breeds[0].temperament}</p> 
    </div> 
    `;
    elements.catInfo.insertAdjacentHTML('afterbegin', markup);
  };

