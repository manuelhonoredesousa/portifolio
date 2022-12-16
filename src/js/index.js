AOS.init();
//
const $toTop = document.getElementById("toTop");
const $nav = document.querySelector("#nav");
const $btnMenu = document.querySelector("#btn-mobile");
const $listItem = document.querySelectorAll(".list-item");
const $showProjects = document.querySelector(".show-project-info");
const $btnClose = document.querySelector(".close");
const formData = document.querySelector("form")
const $firstName = document.querySelector("#first_name"); 
const $lastName = document.querySelector("#last_name"); 
const $email = document.querySelector("#email"); 
const $message = document.querySelector("#message"); 
const $loaddingElement = document.querySelector(".loaddingElement");
const $loadText = document.querySelector("#loadText");
const $loadSVG = document.querySelector(".different-directions");
let theProjects = Array();
const getInfoAPI = 'https://soudev-api.netlify.app/api';   
const emailAndDownloadAPI = 'https://soudev-email-download.up.railway.app/'    
const downloadRouter = `${emailAndDownloadAPI}download-cv`;
const emailRouter = `${emailAndDownloadAPI}send-email`;


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
    $loadText.innerText = 'Enviando Email...'
    $loadSVG.classList.remove("hide")
    $loaddingElement.classList.remove("hide")
    fetch(emailRouter, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        first_name: $firstName.value,
        last_name: $lastName.value,
        email: $email.value,
        messagem: $message.value,
        subject: "SOUDEV - Portifolio"	
      })
    })
    .then((res)=>{
      $loadSVG.classList.add("hide")
      $loadText.innerText = 'Email enviado com sucesso...!'
      $message.value=''
    })
    .catch((err)=>{
      $loadSVG.classList.add("hide")
      $loadText.innerText = 'Erro ao enviar o Email...!'
    })
.finally(()=>{
  setTimeout(() => {
    $loaddingElement.classList.add("hide")
  }, 1500);
})
})

//Functions Bellow
function loadding() {
  const $skills = document.querySelector(".skills");
  const $projects = document.querySelector(".project");
  const $header = document.querySelector("header");
  const $main = document.querySelector("main");

 
    fetch(getInfoAPI)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const { skills, projects } = data;
      theProjects = projects
      skills.forEach((item) => {
        $skills.insertAdjacentHTML(
          "beforeend",
          `
            <figure data-aos="zoom-in">
              <img src="${item.icon}" alt="${item.alt}"/>
              <figcaption>${item.name}</figcaption>
            </figure>
          `);
      });
      projects.forEach((item) => {
        $projects.insertAdjacentHTML(
          "beforeend",
          `
            <div data-aos="zoom-out" class="card">
            <div class="img"><img src="${item.thumbnail}" alt="#" /></div>
            <div class="card-info"><strong>${item.name}</strong> <button onclick="showProject('${item.name}')" class="btn_card">Ver</button></div>
            </div>
          `);
      });
      $header.classList.remove("hide")
      $main.classList.remove("hide")
      $loaddingElement.classList.add("hide")
    })
    .catch((err) => {
    
      const $btn_card = document.querySelector(".btn_card");
      
      $loadText.innerText = 'Infelizmente estou com problemas para obter os dados da API...Tente actualizar novamente a página.'
      $loadSVG.classList.add("hide")
      $btn_card.classList.remove("hide")
    });
}

function reloadPage(){
  location.reload();
}

function showProject(projectName){
  const $project = document.querySelector("#prjct")
  const $description = document.querySelector("#dscrptn")
  const $tags = document.querySelector(".tags")
  const $btn = document.querySelector(".btn")
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
function downloadCV() {
  window.location.href = downloadRouter
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
