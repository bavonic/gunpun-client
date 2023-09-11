document.addEventListener("gesturestart", function (e) {
  e.preventDefault();
  document.body.style.zoom = 1;
});

document.addEventListener("gesturechange", function (e) {
  e.preventDefault();

  document.body.style.zoom = 1;
});
document.addEventListener("gestureend", function (e) {
  e.preventDefault();
  document.body.style.zoom = 1;
});