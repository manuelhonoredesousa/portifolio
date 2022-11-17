AOS.init();
//
const $toTop = document.getElementById("toTop");
const $nav = document.querySelector("#nav");
const $btnMenu = document.querySelector("#btn-mobile");
const $listItem = document.querySelectorAll(".list-item");
const $skills = document.querySelector(".skills");
const $projects = document.querySelector(".project");
const $showProjects = document.querySelector(".show-project-info");
const $btnClose = document.querySelector(".close");
const $project = document.querySelector("#prjct")
const $description = document.querySelector("#dscrptn")
const $tags = document.querySelector(".tags")
const $btn = document.querySelector(".btn")
const $loaddingElement = document.querySelector(".loaddingElement");

const formData = document.querySelector("form")

let theProjects = Array();

//Activiti
window.onscroll = () => showScrollButtom();
$toTop.onclick = () => scrollPageToTop();
$btnClose.onclick = ()=> closeProjectShow()
$btnMenu.addEventListener("click", toggleMenu);
$btnMenu.addEventListener("touchstart", toggleMenu);
$listItem.forEach((item) => item.addEventListener("click", remuveActiveMobileMenu));
$listItem.forEach((item) =>item.addEventListener("touchstart", remuveActiveMobileMenu));
formData.addEventListener('submit', function (e) {
    e.preventDefault(e)
  console.log(e)
    // async function posta (f_n, l_n, s_l, d_t){
      // await fetch("http://localhost:3000/users",{
          // method: 'POST',
          // headers: {'Content-Type':'application/json'},
          // body: JSON.stringify({
              // firstName: f_n,
              // lastName: l_n,
              // sallary: s_l,
              // date: d_t
          // })
      // }).then(d=>d.json()).then(d=>console.log(d)).catch(e=> console.log('deu pau', e))
  // }

})

//Functions Bellow
function loadding() {
  fetch("http://localhost:3000/v1/soudev")
    .then((res) => res.json())
    .then((data) => {
      const { skills, projects } = data;
      theProjects = projects
      skills.forEach((item) => {
        $skills.insertAdjacentHTML(
          "beforeend",
          `
            <figure data-aos="zoom-out">
              <img src="${item.icon}" alt="${item.alt}"/>
              <figcaption>${item.name}</figcaption>
            </figure>
          `);
      });
      projects.forEach((item) => {
        $projects.insertAdjacentHTML(
          "beforeend",
          `
            <div data-aos="zoom-in" class="card">
            <div class="img"><img src="${item.thumbnail}" alt="#" /></div>
            <div class="card-info"><strong>${item.name}</strong> <button onclick="showProject('${item.name}')" class="btn_card">Ver</button></div>
            </div>
          `);
      });
      $loaddingElement.classList.add("hide")
    })
    .catch((err) => {
      const $loadText = document.querySelector("#loadText");
      $loadText.innerText = 'Infelizmente estou com problemas para obter os dados da API...Tente actualizar novamente a página.'
      // $loadText.innerText = 
      console.log('Infelizmente estou com problemas para obter os dados da API...Tente actualizar novamente a página.')
    });
}
function sendMail() {
  alert("Email send")
  // e.preventDefault(e)
}



function showProject(projectName){
  const thisOne = theProjects.find(item => item.name == projectName)

  $project.innerText = thisOne.name
  $description.innerText = thisOne.description
  $tags.innerHTML = thisOne.tags.map(item=> `<div class="tag">${item}</div>`)
  $btn.innerHTML = `<a href="${thisOne.viewproject}" target="_blank" class="link-project">Ver Projecto</a> <a href="${thisOne.sourceCode}" target="_blank" class="link-project">Ver Repositório</a>`
  $showProjects.classList.add("on")
}
function remuveActiveMobileMenu() {
  $nav.classList.remove("active");
}
function toggleMenu(event) {
  const isTouch = event.type === "touchstart";
  if (isTouch) event.preventDefault();
  $nav.classList.toggle("active");
}

const closeProjectShow = ()=>{
  $showProjects.classList.remove("on")
}
const showScrollButtom = () => {
  const isAbleToShowButtom =
    document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
  if (isAbleToShowButtom) return ($toTop.style.display = "flex");
  return ($toTop.style.display = "none");
};
const scrollPageToTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};
