// Script for sidebar
let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".navbar");
menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};
window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};

// Script for dark mode
const chkl = document.getElementById("chkl");
const chks = document.getElementById("chks");
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const containerIndex = document.querySelector(".container-index");
const containerLast = document.querySelector(".container-last");
const confessionBox = document.querySelector(".confession-box");
const containerFeed = document.querySelector(".feed-container");
const ftxt = document.querySelector(".ftxt");
const confessionCard = document.querySelectorAll(".confession-card");
const search = document.querySelector(".search-box");

chkl.addEventListener("change", () => {
 if(chkl.checked)
 {
   toggleDark();
   localStorage.setItem("dark-mode","darkMode");
 }
  else
  {
    toggleLight();
    localStorage.setItem("dark-mode","lightMode");
  }
});

chks.addEventListener("change", () => {
 if(chks.checked)
 {
   toggleDark();
   localStorage.setItem("dark-mode","darkMode");
 }
  else
  {
    toggleLight();
    localStorage.setItem("dark-mode","lightMode");
  }
});

const toggleLight = () => {
  document.body.classList.remove("dark");
  header?.classList.remove("dark");
  footer?.classList.remove("dark");
  navbar?.classList.remove("dark");
  containerIndex?.classList.remove("dark");
  containerLast?.classList.remove("dark");
  confessionBox?.classList.remove("dark");
  containerFeed?.classList.remove("dark");
  search?.classList.remove("dark");
  ftxt?.classList.remove("dark");
  confessionCard?.forEach(card => {
    card?.classList.remove("dark");
  });
}

const toggleDark = () =>
  {
    document?.body.classList.add("dark");
    header?.classList.add("dark");
    footer?.classList.add("dark");
    navbar?.classList.add("dark");
    containerIndex?.classList.add("dark");
    containerLast?.classList.add("dark");
    confessionBox?.classList.add("dark");
    containerFeed?.classList.add("dark");
    search?.classList.add("dark");
    ftxt?.classList.add("dark");
    confessionCard?.forEach(card => {
      card?.classList.add("dark");
    });
  }

let darkMode =
  localStorage.getItem("dark-mode");
window.matchMedia("(prefers-color-scheme: dark)").matches;

if (darkMode == "darkMode"){
  chkl.checked = true;
  chks.checked = true;
  toggleDark();
}
else{
  chkl.checked = false;
  chks.checked = false;
  toggleLight();
}