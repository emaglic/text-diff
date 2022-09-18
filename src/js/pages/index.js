require("codemirror/mode/javascript/javascript");
require("codemirror/mode/htmlmixed/htmlmixed");
require("codemirror/mode/css/css");
require("codemirror/addon/display/autorefresh");
const { updateDiffs, initDiffSelector } = require("../helpers/handle-diffs");
const { encodeQueryParam, decodeQueryParam, deleteQueryParam } = require("../helpers/query-params");

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
let helpModal = null;

const onLoad = () => {
  initDiffSelector();

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

  const defaultText1Label = "Text 1";
  const defaultText2Label = "Text 2";
  const defaultResultsLabel = "Difference";

  text1Label.value = decodeQueryParam("text1label") || defaultText1Label;
  text2Label.value = decodeQueryParam("text2label") || defaultText2Label;
  textResultLabel.value = decodeQueryParam("textresultslabel") || defaultResultsLabel;
  handleKeyUp(text1Label.value, textBtn1, "text1label");
  handleKeyUp(text2Label.value, textBtn2, "text2label");
  handleKeyUp(textResultLabel.value, resultsBtn, "textresultslabel");

  text1Label.onkeyup = (evt) => {
    handleKeyUp(evt.target.value, textBtn1, "text1label");
  };

  text2Label.onkeyup = (evt) => {
    handleKeyUp(evt.target.value, textBtn2, "text2label");
  };

  textResultLabel.onkeyup = (evt) => {
    handleKeyUp(evt.target.value, resultsBtn, "textresultslabel");
  };

  textBtn1.onclick = () => {
    handleBtnClick(textBtn1, panelTextarea1, "text1panel");
  };

  textBtn2.onclick = () => {
    handleBtnClick(textBtn2, panelTextarea2, "text2panel");
  };

  resultsBtn.onclick = () => {
    handleBtnClick(resultsBtn, panelResults, "resultspanel");
  };

  if (decodeQueryParam("text1panel")) {
    textBtn1.classList.remove("active");
    panelTextarea1.classList.add("hidden");
  }

  if (decodeQueryParam("text2panel")) {
    textBtn2.classList.remove("active");
    panelTextarea2.classList.add("hidden");
  }

  if (decodeQueryParam("resultspanel")) {
    resultsBtn.classList.remove("active");
    panelResults.classList.add("hidden");
  }

  textarea1.value = decodeQueryParam("text1") || "";
  textarea2.value = decodeQueryParam("text2") || "";

  textarea1.onkeyup = handleChange;
  textarea2.onkeyup = handleChange;

  handleChange();
};

const handleKeyUp = (value, btn, label) => {
  btn.innerHTML = value;
  encodeQueryParam(label, value);
};

const handleBtnClick = (btn, panel, label) => {
  panel.classList.toggle("hidden");
  if (!panel.classList.contains("hidden")) {
    btn.classList.add("active");
    deleteQueryParam(label);
  } else {
    btn.classList.remove("active");
    encodeQueryParam(label, "hidden");
  }
};

const handleChange = () => {
  if (textarea1.value.length) {
    encodeQueryParam("text1", textarea1.value);
  } else {
    deleteQueryParam("text1");
  }

  if (textarea2.value.length) {
    encodeQueryParam("text2", textarea2.value);
  } else {
    deleteQueryParam("text2");
  }
  updateDiffs(textarea1, textarea2, results);
};

window.onload = onLoad;
