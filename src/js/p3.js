
$(document).ready(function() {
  // p3 s3 스와이퍼
  var s3swiper = new Swiper(".s3-swiper", {
    slidesPerView: 2, // 기본 슬라이드 수
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 6, 
      },
    },
  });  
});
