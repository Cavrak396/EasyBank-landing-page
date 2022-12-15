let hamburger = document.querySelector(".header__hamburger");
let list = document.querySelector(".header__list");
let active = "active";

//Function 

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle(active);
    list.classList.toggle(active);
})