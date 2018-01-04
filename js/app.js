const fs = require('fs')
const electron = require('electron')
const pathToIdentifier = `${electron.remote.app.getPath('desktop')}/identifier.txt`

let selectedWatcher;
let carouselInterval;
let fetchNewDataInterval;
let alertPlace;

document.addEventListener('DOMContentLoaded', () => {
  alertPlace = document.getElementById('adv-place');
  fs.readFile(pathToIdentifier, 'utf8', (err, data) => {
    if (err) {
      alertPlace.innerHTML = `<h1>${err}</h1>`
      return
    }
    selectedWatcher = data;
    fetchAds();
    startFetchNewDataInterval();
  });
});

function fetchAds() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `https://promotive.herokuapp.com/current_adv?ident=${selectedWatcher}`);
  xhr.onload = () => {
    if (xhr.status === 200) {
      document.getElementById('image-wrapper').style.display = 'block';
      let response = JSON.parse(xhr.responseText);
      if (typeof response == "number") {
        document.getElementById('image-inner-container').style.display = 'none'
        alertPlace.innerHTML = '<h1 class="p-100">Here is your confirmation code:</h1><h1 style="letter-spacing: 20px;">' + response + '</h1>';
      } else if (typeof response == "boolean") {
        document.getElementById('image-inner-container').style.display = 'none'
        alertPlace.innerHTML = '<h1 class="p-100">Enable Your Display</h1>';
        stopCarousel();
      } else {
        let currentAdv = response;
        if (currentAdv.length) {
          document.getElementById('adv-place').style.display = 'none';
          document.getElementById('image-inner-container').style.display = 'block'
          document.getElementById('image-inner-container').src = currentAdv[0]
          startCarousel(currentAdv);
        } else {
          document.getElementById('image-inner-container').style.display = 'none'
          alertPlace.innerHTML = '<h1 class="p-100">There are no advertisings near you.</h1>';
          stopCarousel();
        }
      }
    }
  }
  xhr.send();
}

function stopCarousel() {
  if (carouselInterval){
    clearInterval(carouselInterval);
  }
}

function startCarousel(images) {
  stopCarousel();
  let currentPicture = 0;
  let imageTag = document.getElementById('image-inner-container');
  carouselInterval = setInterval(() => {
    currentPicture += 1;
    if (currentPicture > images.length - 1) { currentPicture = 0; }
    imageTag.src = images[currentPicture];
  }, 5000);
}

function startFetchNewDataInterval() {
  fetchNewDataInterval = setInterval(function(){
    fetchAds();
  }, 15000);
}
