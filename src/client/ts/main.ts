import "../scss/main.scss";

const header = document.querySelector("header");
const currentPath = window.location.pathname;

if (currentPath === "/search" && header) {
  header.children[1].className = "hidden";
} else if (header) {
  header.children[1].className = "";
}
