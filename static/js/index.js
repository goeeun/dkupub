
// JavaScript 코드
var slideIndex = 0;
showSlide(slideIndex);

function showSlide(n) {
  var slides = document.getElementsByClassName("slide-images")[0].getElementsByTagName("img");
  if (n < 0) {
    slideIndex = slides.length - 1;
  } else if (n >= slides.length) {
    slideIndex = 0;
  } else {
    slideIndex = n;
  }

  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex].style.display = "block";
}

function slideNext() {
  showSlide(slideIndex + 1);
}

function slidePrev() {
  showSlide(slideIndex - 1);
}

// 이전 버튼과 다음 버튼에 이벤트 리스너 추가
document.getElementsByClassName("btn-prev")[0].addEventListener("click", slidePrev);
document.getElementsByClassName("btn-next")[0].addEventListener("click", slideNext);
