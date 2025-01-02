$(document).ready(function() {
  const open_bt = $(".op-mo-left");
  const close_bt = $(".close");
  const box = $(".mo-header-left");

  open_bt.on("click", function () {
    box.addClass("show");
  });
  close_bt.on("click", function () {
    box.removeClass("show");
  });  
});