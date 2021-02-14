const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
  })

}

const getImages = (query) => {
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(error => displayError('No items matched!! Please put a specific name or a letter!'))
}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.add('added');

  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  }
  else {
    sliders.splice(item, 1)
    element.classList.remove('added');
  }
}
var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // crate slider previous next area
  else {
    sliderContainer.innerHTML = '';
    const prevNext = document.createElement('div');
    prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
    prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

    sliderContainer.appendChild(prevNext)
    document.querySelector('.main').style.display = 'block';
    // hide image aria
    imagesArea.style.display = 'none';
    let duration = document.getElementById('duration').value;
    duration = Math.abs(duration.value) || 1000;
    sliders.forEach(slide => {
      let item = document.createElement('div')
      item.className = "slider-item";
      item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
      sliderContainer.appendChild(item)
    })
    changeSlide(0)
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, duration);
  }
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  
  const searchField = document.getElementById('search').value;
  if (searchField === '') {
    alert('Input text in search field')

  }
  else {
    body.style.backgroundRepeat = "no-repeat";
    document.querySelector('.main').style.display = 'none';
    clearInterval(timer);
    const search = document.getElementById('search');
    getImages(search.value)
    sliders.length = 0;
    search.value = '';
  }
})

sliderBtn.addEventListener('click', function () {
  createSlider()
})

var go = document.getElementById("search-btn");
var txt = document.getElementById("search");

txt.addEventListener("keypress", function (event) {
  // event.preventDefault();
  if (event.key == 'Enter')
    go.click();
});

const body = document.body
fetch(`https://pixabay.com/api/?key=15674931-a9d714b6e9d654524df198e00&q=flower&image_type=photo&pretty=true`)
  .then(response => response.json())
  .then(data => backGround(data.hits))
const backGround = (para, none) => {
  let arr = 0;

  for (let i = 0; i < para.length; i++) {
    let num = 0;
    if (para) {
      const myTime = setInterval((() => {
        body.style.backgroundImage = `url('${para[num].largeImageURL}')`
        num++;
        if (num >= para.length) {
          num = 0;
        } else if (num <= 0) {
          num = para.length - 1;
        }
      }), 4000)
    } else if (none) {
      clearInterval(myTime);
    }
  }
  body.style.backgroundSize = "cover";
  body.style.backgroundRepeat = "no-repeat";

}

