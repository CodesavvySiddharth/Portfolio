var typed = new Typed(".text",{
    strings:["Frontend Developer","Backend Developer","Full Stack"],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1000,
    loop:true
})

// Get a reference to the navbar element
const navbar = document.querySelector('header .navbar');

// Function to toggle the active class on the navbar
function toggleNavbar() {
    navbar.classList.toggle('active');
}

// Get a reference to the menu bar element (assuming it has an ID of "menu-bar")
const menuBar = document.getElementById('menu-bar');

// Add a click event listener to the menu bar
menuBar.addEventListener('click', toggleNavbar);
