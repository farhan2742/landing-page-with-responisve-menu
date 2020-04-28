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

const navList = document.querySelector("#navbar__list");
const items = document.querySelectorAll(".landing__container");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Helper function to dynamically build menu and add it to DOM

function buildMenu() {
	const fragment = document.createDocumentFragment(); 
	navList.classList.add("nav-menu");
	for (let i = 0; i < items.length; i++) {
		let listItem = document.createElement("li");
		let an = items[i].parentElement.id;
		let itemText = items[i].parentElement.getAttribute("data-nav");
		listItem.innerHTML = `<a href="#${an}">${itemText}</a>`;
		listItem.classList.add("nav-item");
		fragment.appendChild(listItem);
	}
	navList.appendChild(fragment);
};

// Helper function to check if a page element is in viewport

function beingViewed(sec) {
	let bounding = sec.getBoundingClientRect();
	return ( bounding.top >= 0 &&
        	bounding.left >= 0 &&
       		bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        	bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// Helper function to change states of elements that are in viewport to active

function setMenuActive(list) {
	for (var i = 0; i < list.length; i++) {
		if (beingViewed(list[i].lastElementChild)) {
			navList.children[i].classList.add("nav-active");
			list[i].parentElement.classList.add("active");
		}
		else {
			navList.children[i].classList.remove("nav-active");
			list[i].parentElement.classList.remove("active");
		}
	}
}

// Helper function to check if a page has stoped scrolling

function notScrolling(action) {
	if (!action || typeof action !== 'function') return;
	let isScrolling;
	window.addEventListener('scroll', function (event){
		window.clearTimeout(isScrolling);
		isScrolling = setTimeout(function() {
			action();
		}, 5000);
	}, false);
};

/**
}
 * End Helper Functions
 * Begin Main Functions
 * 
*/

function main(){


// build the nav

	buildMenu();

	// Add class 'active' to section when near top of viewport

	setInterval("setMenuActive(items)",1);

	// Scroll to anchor ID using scrollTO event

	navList.addEventListener("click", function(event) {
		event.preventDefault();
		const clicked = event.target;
		const ScrollToElement = document.querySelector(clicked.getAttribute("href"));
	  	ScrollToElement.scrollIntoView({block: 'end', behavior: 'smooth'})});
	}

	// hide menu bar if scrolling stoped

	notScrolling(function(){
		navList.classList.add("hidden");
		window.addEventListener("scroll", function(){
			navList.classList.remove("hidden");
		});
	})

/**
 * End Main Functions
 * Begin Events
 * 
*/

document.addEventListener("DOMContentLoaded",main());

