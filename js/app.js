let selectedWatcher;
let carouselInterval;
let fetchNewDataInterval;

document.addEventListener('DOMContentLoaded', () => {
  fetchListOfWatchers();
  document.getElementById('select-button').addEventListener('click', () => {
    selectedWatcher = document.getElementsByTagName('select')[0].value;
    fetchAds();
    startFetchNewDataInterval();
  });
});

function fetchAds() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `http://localhost:3000/current_adv?ident=${selectedWatcher}`);
  xhr.onload = () => {
    if (xhr.status === 200) {
      document.getElementById('select-wrapper').style.display = 'none';
      document.getElementById('image-wrapper').style.display = 'block';
      document.getElementsByTagName('body')[0].style.background = 'black';
      let alertPlace = document.getElementById('adv-place');
      let response = JSON.parse(xhr.responseText);
      if (typeof response == "number") {
        document.getElementById('image-inner-container').style.display = 'none'
        alertPlace.innerHTML = '<h1 style="color: white" class="p-100">Here is your confirmation code:</h1><h1 style="color: white; letter-spacing: 20px;">' + response + '</h1>';
      } else if (typeof response == "boolean") {
        document.getElementById('image-inner-container').style.display = 'none'
        alertPlace.innerHTML = '<h1 style="color: white" class="p-100">Enable Your Display</h1>';
        stopCarousel();
      } else {
        let currentAdv = response;
        console.log(currentAdv);
        if (currentAdv.length) {
          document.getElementById('adv-place').style.display = 'none';
          document.getElementById('image-inner-container').style.display = 'block'
          document.getElementById('image-inner-container').src = currentAdv[0]
          startCarousel(currentAdv);
        } else {
          document.getElementById('image-inner-container').style.display = 'none'
          alertPlace.innerHTML = '<h1 style="color: white" class="p-100">There are no advertisings near you.</h1>';
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

function fetchListOfWatchers() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/select_watcher');
  xhr.onload = () => {
    if (xhr.status === 200) {
      let response = JSON.parse(xhr.responseText)
      let select = document.getElementById('watchers-list');
      response.forEach((element, number) => {
        let option = document.createElement("option");
        option.value = element;
        option.innerHTML = element;
        select.appendChild(option);
      });
    }
    else {
      console.log(xhr.responseText);
    }
  };
  xhr.send();
}

function startFetchNewDataInterval() {
  fetchNewDataInterval = setInterval(function(){
    fetchAds();
  }, 60000);
}
