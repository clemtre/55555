let flagEspace = true;

let odd = true;
let syllabeCountTemp = -1;
let syllabeCount = 0;
let syllabesCtn = [];
function genSvg(vals, refs) {
  const temp = document.createElement("div");
  let spanRef = document.createElement("p");
  spanRef.innerHTML = refs;
  for (let i = 0; i < vals.length; i++) {
    vals[i] = range(parseFloat(vals[i]), 0, 1, 0, 0.01);
  }

  const xMin = Math.min(vals.x1, vals.x2, vals.x3, vals.x4);
  vals.x1 = parseFloat((vals.x1 - xMin).toFixed(2));
  vals.x2 = parseFloat((vals.x2 - xMin).toFixed(2));
  vals.x3 = parseFloat((vals.x3 - xMin).toFixed(2));
  vals.x4 = parseFloat((vals.x4 - xMin).toFixed(2));

  vals.y1 = parseFloat(vals.y1.toFixed(2));
  vals.y2 = parseFloat(vals.y2.toFixed(2));
  vals.y3 = parseFloat(vals.y3.toFixed(2));
  vals.y4 = parseFloat(vals.y4.toFixed(2));
  temp.setAttribute("class", "syllabe")
  let o = {
    x1: vals.x1,
    y1: vals.y1,
    x2: vals.x2,
    y2: vals.y2,
    x3: vals.x3,
    y3: vals.y3,
    x4: vals.x4,
    y4: vals.y4,
  };

  const pCtn = document.createElement("div");
  const lCtn = document.createElement("div");

  const poignees = [];
  const lignes = [];

  //  M x1 y1 C x2 y2 x3 y3 x4 y4
  const _w = 200;
  const _h = hauteur;
  temp.style.width = _w + "px";
  temp.style.height = _h + "px";
  temp.innerHTML = bezArg(
    _w,
    _h,
    o.x1,
    o.y1,
    o.x2,
    o.y2,
    o.x3,
    o.y3,
    o.x4,
    o.y4,
    col1,
    strokeWidth
  );
  spanRef.setAttribute("class", "ref");
  temp.appendChild(spanRef);
  for (let i = 0; i < 4; i++) {
    poignees[i] = document.createElement("div");
    poignees[i].style.width = "1px";
    poignees[i].style.height = "1px";
    poignees[i].style.position = "absolute";
    poignees[i].style.borderRadius = "5px";
  }

  for (let i = 0; i < 2; i++) {
    lignes[i] = document.createElement("div");
    lignes[i].style.position = "absolute";
  }
  let offSetX = 0;
  lignes[0].innerHTML = `<svg width="0" height="0" ><line x1="${vals.x1 * _w + offSetX}" y1="${
    vals.y1 * _w
  }" x2="${vals.x2 * _w + offSetX}" y2="${
    vals.y2 * _w
  }" stroke="${lignesStrokeCol}" stroke-width="${lignesStrokeWidth}" /></svg>`;

  lignes[1].innerHTML = `<svg width="0" height="0" ><line x1="${vals.x3 * _w + offSetX}" y1="${
    vals.y3 * _w
  }" x2="${vals.x4 * _w + offSetX}" y2="${
    vals.y4 * _w
  }" stroke="${lignesStrokeCol}" stroke-width="${lignesStrokeWidth}" /></svg>`;

  let poigneesOffset = 4;

  poignees[0].style.left = vals.x1 * _w - poigneesOffset + offSetX + "px";
  poignees[0].style.top = vals.y1 * _h - poigneesOffset + "px";
  poignees[0].style.border = poigneePrefix + "red";

  poignees[1].style.left = vals.x2 * _w - poigneesOffset + offSetX + "px";
  poignees[1].style.top = vals.y2 * _h - poigneesOffset + "px";
  poignees[1].style.border = poigneePrefix + "blue";

  poignees[2].style.left = vals.x3 * _w - poigneesOffset + offSetX + "px";
  poignees[2].style.top = vals.y3 * _h - poigneesOffset + "px";
  poignees[2].style.border = poigneePrefix + "orange";

  poignees[3].style.left = vals.x4 * _w - poigneesOffset + offSetX + "px";
  poignees[3].style.top = vals.y4 * _h - poigneesOffset + "px";
  poignees[3].style.border = poigneePrefix + "purple";

  for (let i = 0; i < 4; i++) {
    pCtn.appendChild(poignees[i]);
  }
  for (let i = 0; i < 2; i++) {
    lCtn.appendChild(lignes[i]);
  }

  temp.appendChild(pCtn);
  temp.appendChild(lCtn);

  pCtn.setAttribute("class", "trace");
  lCtn.setAttribute("class", "trace");

  if (!syllabesCtn[vals.mot]) {
    syllabesCtn[vals.mot] = document.createElement("div");
    syllabesCtn[vals.mot].setAttribute("class", "mot");
    document.getElementById("inject").appendChild(syllabesCtn[vals.mot]);
  }
  console.log(vals.x1);
  syllabesCtn[vals.mot].appendChild(temp);
}

// console.log(phrase);

function polish() {
  // document
  //   .querySelectorAll(".ph")
  //   .forEach(
  //     (e) =>
  //       (e.style.width =
  //         e.firstElementChild.firstElementChild.getBoundingClientRect().width +
  //         "px")
  //   );

  document.querySelectorAll(".syllabe").forEach(
    (e) =>
      (e.style.width =
        // -20 SEMBLE CONSTANT MAIS AUCUNE CONFIRMATION
        e.querySelector("path").getBoundingClientRect().width - 20 + "px")
  );
 

  for (let i = 0; i < document.querySelectorAll(".syllabe").length; i++) {
    const e = document.querySelectorAll(".syllabe")[i];
    const xPh = e.getClientRects()[0].x;
    const xPath = e.querySelector("path").getClientRects()[0].x;
    // e.style.width =
    const toDecal = xPath - xPh;
    e.querySelector("path").style.transform = "translateX(" + -toDecal + "px)";
    e.querySelectorAll(".trace").forEach((a) => a.style.transform = "translateX(" + -toDecal + "px)");
    e.querySelectorAll("line").forEach((b) => b.style.transform = "translateY(" + -20 + "px)");

    // console.log(i, e.querySelector("path").getClientRects()[0]);
  }
  document
    .querySelectorAll(".svg-debug")
    .forEach(
      (e) => e.querySelector("path").getBoundingClientRect().width + "px"
    );

  strokeWidth =
    document.getElementById("slide-graisse").value *
    (document.getElementById("slide-graisse").value * 0.1);

  document.documentElement.style.setProperty(
    "--intermot",
    document.getElementById("slide-intermot").value + "px"
  );

  document.documentElement.style.setProperty(
    "--approche",
    document.getElementById("slide-approche").value + "px"
  );
  if (document.getElementById("check-test").checked) {
    document.querySelectorAll(".mot").forEach((e) => e.classList.add("test"));
  }
  if (document.getElementById("check-trace").checked) {
    document.querySelectorAll(".trace").forEach((e) => e.classList.add("show-trace"));
  }
  if (document.getElementById("check-syllabe").checked) {
    document.querySelectorAll(".syllabe").forEach((e) => e.classList.add("syllabe-contour"));
  }
  if (document.getElementById("check-syllabe-souligne").checked) {
    document.querySelectorAll(".syllabe").forEach((e) => e.classList.add("syllabe-souligne"));
  }
  if (document.getElementById("check-mot").checked) {
    document.querySelectorAll(".mot").forEach((e) => e.classList.add("mot-contour"));
  }
  

  $(function () {
    $("#check-transcription")
      .change(function () {
        $(".ref").toggleClass("show-transcription", this.checked);
      })
      .change();
  });

  
}
