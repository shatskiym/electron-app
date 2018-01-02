let imagesArray;

document.addEventListener('DOMContentLoaded', () => {
  fetchListOfElements();
  document.getElementById('select-button').addEventListener('click', () => {
    if (document.getElementsByTagName('select')[0].value == 'watcher1') {
      imagesArray = [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1024px-Faust_bei_der_Arbeit.JPG',
        'http://lokeshdhakar.com/projects/lightbox2/images/thumb-3.jpg'
      ];
    } else {
      imagesArray = [
        'https://static.pexels.com/photos/20974/pexels-photo.jpg',
        'http://www.longevitylive.com/wp-content/uploads/2014/08/shutterstock_90779018.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Save_the_Tree_then_You_can_Save_Your_Earth.jpg/800px-Save_the_Tree_then_You_can_Save_Your_Earth.jpg'
      ];
    }
    imageRefresher();
  });
});

function fetchListOfElements() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/active_watchers/all_watchers');
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

function imageRefresher() {
  document.getElementById('select-wrapper').style.display = 'none';
  document.getElementById('image-wrapper').style.display = 'block';
  let imageTag = document.getElementById('image-inner-container');
  console.log(imageTag);
  let currentPicture = 0;
  imageTag.src = imagesArray[currentPicture];
  setInterval(
    () => {
      currentPicture += 1;
      if (currentPicture > imagesArray.length - 1) { currentPicture = 0 }
      imageTag.src = imagesArray[currentPicture];
    },
    5000
  );
}
