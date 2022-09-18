require("codemirror/mode/javascript/javascript");
require("codemirror/mode/htmlmixed/htmlmixed");
require("codemirror/mode/css/css");
require("codemirror/addon/display/autorefresh");
const Diff = require("diff");

import "scss/index/index.scss";

let textarea1 = null;
let textarea2 = null;
let results = null;
let textBtn1 = null;
let textBtn2 = null;
let resultsBtn = null;
let panelTextarea1 = null;
let panelTextarea2 = null;
let panelResults = null;
let text1Label = null;
let text2Label = null;
let textResultLabel = null;

const onLoad = () => {
  textBtn1 = document.querySelector(".text-btn-1");
  textBtn2 = document.querySelector(".text-btn-2");
  resultsBtn = document.querySelector(".results-btn");
  textarea1 = document.querySelector(".textarea-1");
  textarea2 = document.querySelector(".textarea-2");
  results = document.querySelector(".results");
  panelTextarea1 = document.querySelector(".panel-textarea-1");
  panelTextarea2 = document.querySelector(".panel-textarea-2");
  panelResults = document.querySelector(".panel-results");

  text1Label = document.querySelector(".text-1-color");
  text2Label = document.querySelector(".text-2-color");
  textResultLabel = document.querySelector(".text-result-color");

  text1Label.onkeyup = (evt) => {
    textBtn1.innerHTML = evt.target.value;
  };

  text2Label.onkeyup = (evt) => {
    textBtn2.innerHTML = evt.target.value;
  };

  textResultLabel.onkeyup = (evt) => {
    resultsBtn.innerHTML = evt.target.value;
  };

  textBtn1.onclick = () => {
    panelTextarea1.classList.toggle("hidden");
    if (!panelTextarea1.classList.contains("hidden")) {
      textBtn1.classList.add("active");
    } else {
      textBtn1.classList.remove("active");
    }
  };

  textBtn2.onclick = () => {
    panelTextarea2.classList.toggle("hidden");
    if (!panelTextarea2.classList.contains("hidden")) {
      textBtn2.classList.add("active");
    } else {
      textBtn2.classList.remove("active");
    }
  };

  resultsBtn.onclick = () => {
    panelResults.classList.toggle("hidden");
    if (!panelResults.classList.contains("hidden")) {
      resultsBtn.classList.add("active");
    } else {
      resultsBtn.classList.remove("active");
    }
  };

  textarea1.onkeyup = handleChange;
  textarea2.onkeyup = handleChange;
};

const handleChange = () => {
  const opacity = 0.75;
  const text1Color = `rgba(235, 64, 52, ${opacity})`;
  const text2Color = `rgba(0, 26, 255, ${opacity})`;
  //const textColorSame = "rgba(255,255,255, 0.25)";
  const textColorSame = "transparent";

  results.innerHTML = "";
  let span = null;

  const diff = Diff.diffLines(textarea1.value, textarea2.value, { ignoreWhitespace: false, newlineIsToken: true }),
    fragment = document.createDocumentFragment();

  diff.forEach((part) => {
    // green for additions, red for deletions
    // grey for common parts
    const color = part.added ? text1Color : part.removed ? text2Color : textColorSame;
    span = document.createElement("span");
    span.style.color = "#fff";
    span.style.backgroundColor = color;
    span.appendChild(document.createTextNode(part.value));
    fragment.appendChild(span);
  });

  results.appendChild(fragment);
};

window.onload = onLoad;
