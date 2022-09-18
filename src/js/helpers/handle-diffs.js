const Diff = require("diff");
const { encodeQueryParam, decodeQueryParam } = require("./query-params");

let currText1 = null;
let currText2 = null;
let currResults = null;

let diffType = Diff.diffChars;
let diffOptions = { ignoreWhitespace: false, newlineIsToken: true };

const initDiffSelector = () => {
  const select = document.querySelector(".set-diff-type");
  const types = [
    { label: "Chars (Default)", value: "diffChars" },
    { label: "Lines", value: "diffLines" },
    { label: "Words", value: "diffWordsWithSpace" },
    { label: "Trimmed Lines", value: "diffTrimmedLines" },
    { label: "Sentences", value: "diffSentences" },
    { label: "CSS", value: "diffCss" },
    { label: "JSON", value: "diffJson" },
  ];

  types.forEach((t) => {
    let option = document.createElement("option");
    option.innerHTML = t.label;
    option.value = t.value;
    select.appendChild(option);
  });

  select.onchange = setDiffType;

  if (decodeQueryParam("difftype")) {
    select.value = decodeQueryParam("difftype");
    setTimeout(() => {
      setDiffType({ target: { value: select.value } });
    }, 100);
  }
};

const setDiffType = (evt) => {
  if (!currText1 || !currText2 || !currResults) return;
  const type = evt.target.value;

  switch (type) {
    case "diffChars":
      diffType = Diff.diffChars;
      diffOptions = { ignoreWhitespace: false, newlineIsToken: true };
      break;

    case "diffLines":
      diffType = Diff.diffLines;
      diffOptions = { ignoreWhitespace: false, newlineIsToken: true };
      break;

    case "diffWordsWithSpace":
      diffType = Diff.diffWordsWithSpace;
      diffOptions = {};
      break;

    case "diffTrimmedLines":
      diffType = Diff.diffTrimmedLines;
      diffOptions = {};
      break;

    case "diffSentences":
      diffType = Diff.diffSentences;
      diffOptions = {};
      break;

    case "diffCss":
      diffType = Diff.diffCss;
      diffOptions = {};
      break;

    case "diffJson":
      diffType = Diff.diffJson;
      diffOptions = {};
      break;
  }
  encodeQueryParam("difftype", type);
  updateDiffs(currText1, currText2, currResults);
};

const updateDiffs = (text1, text2, results) => {
  currText1 = text1;
  currText2 = text2;
  currResults = results;

  const opacity = 0.75;
  const text1Color = `rgba(235, 64, 52, ${opacity})`;
  const text2Color = `rgba(0, 26, 255, ${opacity})`;
  //const textColorSame = "rgba(255,255,255, 0.25)";
  const textColorSame = "transparent";

  results.innerHTML = "";
  let span = null;

  const diff = diffType(text1.value, text2.value, diffOptions);
  const fragment = document.createDocumentFragment();

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

module.exports = { updateDiffs, initDiffSelector };
