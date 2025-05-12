import { fetchJSON } from "./api.js";
import { onChangeToggle, onRemoveClick } from "./events.js";

const elements = {
  pageBodyExt: document.querySelector(".page-body-extensions"),
};

function clearPageBody() {
  elements.pageBodyExt.innerHTML = "";
}

function addToPageBodyExtension(ext) {
  const container = document.createElement("div");
  container.classList.add("ext-container");
  container.innerHTML = `
      <div class="ext-top">
        <div class="ext-top-left">
          <img src=${"." + ext.logo}></img>
        </div>
        <div class="ext-top-right">
          <div class="ext-top-right-name">${ext.name}</div>
          <div class="ext-top-left-desc">${ext.description}</div>
        </div>
      </div>
      <div class="ext-bot">
        <button class="bid-${ext.id}">Remove</button>
        <div class="toggle-container">
          <input type="checkbox" class="toggle tid-${ext.id}" ${
    ext.isActive ? "checked" : ""
  }>
        </div>
      </div>
    `;
  const toggle = container.querySelector(`.tid-${ext.id}`);
  const remove = container.querySelector(`.bid-${ext.id}`);

  toggle.addEventListener("change", onChangeToggle);
  remove.addEventListener("click", onRemoveClick);

  elements.pageBodyExt.appendChild(container);
}

export function renderAllExtensions() {
  clearPageBody();
  fetchJSON().then((data) => {
    data.forEach((ext) => addToPageBodyExtension(ext));
  });
}

export function renderInactiveExtensions() {
  clearPageBody();
  fetchJSON().then((data) => {
    data.forEach((ext) => {
      if (!ext.isActive) {
        addToPageBodyExtension(ext);
      }
    });
  });
}

export function renderActiveExtensions() {
  clearPageBody();
  fetchJSON().then((data) => {
    data.forEach((ext) => {
      if (ext.isActive) {
        addToPageBodyExtension(ext);
      }
    });
  });
}
