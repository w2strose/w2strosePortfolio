"use strict";

// make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
 
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

// navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click',()=>{
  navbarMenu.classList.toggle('open');
});


// handle scrolling when tapping on the contact me
const contactButton = document.querySelector(".home__contact");
contactButton.addEventListener("click", () => {
  scrollIntoView("#contact");
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}

// make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// show arrow-up btn when scrolling down
const arrowUp = document.querySelector(".arrow__up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// handle click on the 'arrow up' btn
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click',(e)=>{
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if(filter == null){
    return;
  }
  // selection new one
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  const target= 
    e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

  projectContainer.classList.add('anim-out');
  setTimeout(()=>{
    projects.forEach((project) => {
      console.log(project.dataset.type);
      if(filter === '*' || filter === project.dataset.type){
        project.classList.remove('invisible');
      }else{
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  },300);
});

// 모든 섹션 요소들을 가져온다
// IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
// 보여지는 섹션에 해당하는 메뉴 아이템을 활성화한다.
const sectionIds = [
  '#home','#about','#skills','#work','#testimonials','#contact'
];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));


const observerOptions = {
  root : null,
  rootMargin:'0px',
  threshold:0.3,
}

const observerCallback = (entries, observer) => {
  entries.forEach(entry =>{
    console.log(entry.target);
   });
}

const observer = new IntersectionObserver(observerCallback,observerOptions);
sections.forEach(section => observer.observe(section));