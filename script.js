var typed = new Typed(".text",{
    strings:["Frontend Developer","Backend Developer","Full Stack"],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1000,
    loop:true
})



document.getElementById('toggle-btn').addEventListener('click', function(event) {
    event.preventDefault();
    const para = document.getElementById('about-para');
    if (para.classList.contains('collapsed')) {
        para.classList.remove('collapsed');
        para.classList.add('expanded');
        this.textContent = '↑'; // Change to upward arrow
    } else {
        para.classList.remove('expanded');
        para.classList.add('collapsed');
        this.textContent = 'Know More'; // Change back to downward arrow
    }
});