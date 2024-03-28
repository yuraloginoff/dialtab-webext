"use strict";

const themeChkbx = document.querySelector("#darktheme");
const statusBox = document.querySelector("#status");

function onError(error) {
  statusBox.textContent = `Error: ${error}`;
}

function setItem() {
  statusBox.textContent = "Saved!";
}


function saveOptions(e) {
  e.preventDefault();
  let setting = browser.storage.sync.set(
    { darktheme: themeChkbx.checked }
  );
  setting.then(setItem, onError);
}


function restoreOptions() {

  function setCurrentChoice(result) {
    if (result.darktheme) {
      themeChkbx.setAttribute('checked', 'checked')
    }
  }

  let getting = browser.storage.sync.get("darktheme");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
