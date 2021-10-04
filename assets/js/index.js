const hamburger = document.querySelector(".hamburger");
const toggleMenu = () => {
  const nav = document.querySelector(".nav");
  nav.classList.toggle("open");
};

hamburger.addEventListener("click", toggleMenu);
