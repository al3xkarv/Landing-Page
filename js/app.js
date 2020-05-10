/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll("section");
const navBar = document.getElementById("navbar__list");

//options for https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
const options = {
  threshold: 0.7,
};

/**
 * End Global Variables
 */

/**
 
 
 * Start Helper Functions
 *
 */

function addActive(element) {
  element.classList.add("activeClass");
}

function removeActive(element) {
  element.classList.remove("activeClass");
}

/**
 * End Helper Functions
 
 
 * Begin Main Functions
 *
 */
// build the nav
sections.forEach((element) => {
  let navElement = `<li class="menu__link " data-link=${element.id}><a href="#${element.id}">${element.dataset.nav}</li>`;
  navBar.insertAdjacentHTML("beforeend", navElement);
});

// Add class 'active' to section when near top of viewport
//using syntax from https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
const callback = (entries) => {
  entries.forEach((entry) => {
    let section = document.getElementById(entry.target.id);
    if (entry.isIntersecting) {
      addActive(section);
    } else {
      removeActive(section);
    }
  });
};
const observer = new IntersectionObserver(callback, options);

sections.forEach((element) => {
  observer.observe(document.getElementById(element.id));
});

// Scroll to anchor ID using scrollTO event
navBar.addEventListener("click", (event) => {
  event.preventDefault();

  document
    .getElementById(event.target.parentElement.dataset.link)
    .scrollIntoView({ behavior: "smooth" });
});

/**
 * End Main Functions
 * Begin Events
 *
 */
