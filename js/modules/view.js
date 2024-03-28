"use strict";

import Mustache from "./mustache.js";

const nodes = {
  body      : document.querySelector("body"),
  templMain : document.querySelector("#groups-template").innerHTML,
  contMain  : document.querySelector("#container"),
}

export function index(allData) {
  Mustache.parse(nodes.templMain);
  nodes.contMain.innerHTML = Mustache.render(nodes.templMain, allData);
}
