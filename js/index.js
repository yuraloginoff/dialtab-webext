"use strict";

import { Defaults } from "./modules/defaults.js";
import * as View from "./modules/view.js";
import * as helper from "./modules/helpers.js";
// import Mustache from "./modules/mustache.js";

class App {
  constructor() {
    this.init();
    this.AppFolder = {};
    this.nodes = {
      body: document.querySelector("body"),
      templMain: document.querySelector("#groups-template").innerHTML,
      contMain: document.querySelector("#container"),
      settingsLink: document.querySelector("#settings"),
    };
  }

  async init() {
    // Get theme
    browser.storage.sync.get("darktheme").then(
      (data) => {
        if (data.darktheme) {
          this.nodes.body.classList.add("dark");
        }
      },
      (error) => console.error(`Error: ${error}`)
    );


    // BOOKMARKS. Gets data and renders main template
    const tree = await browser.bookmarks.getSubTree("toolbar_____");
    const toolbar = tree[0]["children"];

    // 1. искать папку "Dial Tab"
    let isFoundObj = toolbar.find((item) => item.title === "Dial Tab");

    // 1.1. если нет, создать папку "Dial Tab"
    if (!isFoundObj) {
      console.log(this);
      this.AppFolder = await browser.bookmarks.create({
        index: 0,
        parentId: "toolbar_____",
        title: "Dial Tab",
      });
      helper.onCreated(this.AppFolder);

      // 2. если пустая, создать подпапку
      let sampleFolder = await browser.bookmarks.create({
        parentId: this.AppFolder.id,
        title: "Private Search",
      });
      helper.onCreated(sampleFolder);

      let link1 = await browser.bookmarks.create({
        parentId: sampleFolder.id,
        title: "DuckDuckGo",
        url: "https://duckduckgo.com/",
      });
      helper.onCreated(link1);

      let link2 = await browser.bookmarks.create({
        parentId: sampleFolder.id,
        title: "Startpage",
        url: "https://www.startpage.com/",
      });
      helper.onCreated(link2);

      const treeUpd = await browser.bookmarks.getSubTree("toolbar_____");
      const toolbarUpd = treeUpd[0]["children"];
      this.AppFolder = toolbarUpd.find((item) => item.title === "Dial Tab");
    } else {
      this.AppFolder = isFoundObj;
    }

    // Add favicon. No API for that:(
    for (const group of this.AppFolder.children) {
      for (const link of group.children) {
        const url = new URL(link.url);
        link.favicon = `https://icons.duckduckgo.com/ip3/${url.hostname}.ico`;
      }
    }

    View.index({ groups: this.AppFolder.children });

    this.bindEvents();
    // 3.1. если внутри есть ссылки без подпапок
    // отобразить ссылки

    // 3.2. если внутри есть ссылки и подпапки
    // отобразить ссылки и подпапки

    // 3.3. если внутри есть только подпапки
    // отобразить  подпапки
  }

  bindEvents() {
    function handleClick() {
      console.log("ok");
      browser.runtime.openOptionsPage();
    }

    this.nodes.settingsLink.onclick = handleClick;
  }
}

new App();
