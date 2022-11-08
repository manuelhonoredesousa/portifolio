AOS.init();
// 
const $toTop = document.getElementById("toTop");
const $nav = document.querySelector("#nav")
const $btnMenu = document.querySelector("#btn-mobile")

//Activiti
window.onscroll = () => showScrollButtom();
$toTop.onclick = () => scrollPageToTop();
$btnMenu.addEventListener("click", toggleMenu)
$btnMenu.addEventListener("touchstart", toggleMenu)


//Functions Bellow

function toggleMenu(event) {
  const isCliked = event.type === 'touchstart';
  if (isCliked) event.preventDefault() 
  $nav.classList.toggle("active")
}
const showScrollButtom = () => {
  const isAbleToShowButtom = document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
  if (isAbleToShowButtom) return ($toTop.style.display = "flex");
  return ($toTop.style.display = "none");
};
const scrollPageToTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};
