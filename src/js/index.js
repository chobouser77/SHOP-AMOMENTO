
$(document).ready(function() {
  // p1 s2 스와이퍼
  var s2swiper = new Swiper(".s2-swiper", {
    slidesPerView: 6,
    spaceBetween: 20,    
  });
  // p1 s3 스와이퍼
  var swiper = new Swiper(".s3-swiper", {
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
  });

});
