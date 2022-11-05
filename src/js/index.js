AOS.init();
// 
const $toTop = document.getElementById("toTop");
//
window.onscroll = () => showScrollButtom();
$toTop.onclick = () => scrollPageToTop();

//Functions Bellow
const showScrollButtom = () => {
  const isAbleToShowButtom = document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
  if (isAbleToShowButtom) return ($toTop.style.display = "flex");
  return ($toTop.style.display = "none");
};
const scrollPageToTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};
