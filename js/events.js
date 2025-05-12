import {
  renderActiveExtensions,
  renderAllExtensions,
  renderInactiveExtensions,
} from "./ui.js";
import configs from "./constants.js";
import { changeDataStatus, deleteData } from "./api.js";

function changeTheme() {
  configs.theme = !configs.theme;
  let variables = configs.theme ? configs.lightTheme : configs.darkTheme;
  const root = document.documentElement;

  for (const variable in variables) {
    root.style.setProperty(variable, variables[variable]);
  }

  // change the svg in the top page bar
  const themeButton = document.querySelector(".top-bar-theme");
  if (configs.theme) {
    themeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22"><g clip-path="url(#a)"><path class="theme-logo" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.98" d="M20.125 11.877A7.333 7.333 0 1 1 10.124 1.875a9.168 9.168 0 1 0 10.001 10.002Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h22v22H0z"/></clipPath></defs></svg>`;
  } else {
    themeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22"><g clip-path="url(#a)"><path class="theme-logo" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.98" d="M11 1.833v1.834m0 14.666v1.834M3.667 11H1.833m3.955-5.212L4.492 4.492m11.72 1.296 1.297-1.296M5.788 16.215l-1.296 1.296m11.72-1.296 1.297 1.296M20.167 11h-1.834m-2.75 0a4.583 4.583 0 1 1-9.167 0 4.583 4.583 0 0 1 9.167 0Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h22v22H0z"/></clipPath></defs></svg>`;
  }
}

function handleChangeTheme() {
  const themeButton = document.querySelector(".top-bar-theme");
  themeButton.addEventListener("click", changeTheme);
}

function onTypeClick(e) {
  const currentActive = document.querySelector(".active");
  const type = e.target.classList[1];
  if (type === "all") {
    renderAllExtensions();
  } else if (type === "act") {
    renderActiveExtensions();
  } else {
    renderInactiveExtensions();
  }
  currentActive.classList.remove("active");
  this.classList.add("active");
}

function handleExtensionType() {
  const typeButtons = document.querySelectorAll(".page-body-top-btn");
  for (let btn of typeButtons) {
    btn.addEventListener("click", onTypeClick);
  }
}

export function onChangeToggle(e) {
  const id = Number(e.target.classList[1].split("-")[1]);
  const isActive = e.target.checked;
  changeDataStatus(id, isActive);
  // re render current extension type (active, all, ext)
  const currentActive = document.querySelector(".active");
  setTimeout(() => currentActive.click(), 300);
}

export function onRemoveClick(e) {
  const id = Number(e.target.classList[0].split("-")[1]);
  deleteData(id);

  // re render current extension type (active, all, ext)
  const currentActive = document.querySelector(".active");
  currentActive.click();
}

function handleEvents() {
  handleExtensionType();
  handleChangeTheme();
}

export function start() {
  renderAllExtensions();
  handleEvents();
}
