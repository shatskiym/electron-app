let imagesArray;
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM LOADED');
  imagesArray = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1024px-Faust_bei_der_Arbeit.JPG',
    'http://lokeshdhakar.com/projects/lightbox2/images/thumb-3.jpg'
  ];

  imageRefresher();
});

function imageRefresher() {
  let imageTag = document.getElementById('image-inner-container');
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