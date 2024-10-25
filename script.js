const images = document.querySelectorAll('.image');
let bannerImage= 0;

function changeBanner(){
    images[bannerImage].classList.remove('active')

    bannerImage = (bannerImage + 1) % images.length;

    images[bannerImage].classList.add('active')
}

setInterval(changeBanner, 3000)