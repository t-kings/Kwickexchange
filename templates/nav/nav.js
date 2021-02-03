function showNav() {
  document.querySelector("#mobile_nav").style.display = "block";
}
function closeNav() {
  document.querySelector("#mobile_nav").style.display = "none";
}
document.addEventListener("scroll", () => {
  // if (document.querySelector("body").scrollTop > 200) {
  //   document.querySelector("#mobile_nav").style.background = "black";
  //   document.querySelector("#web_nav").style.background = "black";
  // } else {
  //   document.querySelector("#mobile_nav").style.background = "none";
  //   document.querySelector("#web_nav").style.background = "none";
  // }
});
