const count = 0;
let flagEspace = true;

let odd = true

function genSvg(vals, refs) {
  let spanRef = document.createElement("p");
  spanRef.innerHTML = refs;
  console.log(vals)
  for (let i = 0; i < vals.length; i++) {
    vals[i] = range(parseFloat(vals[i]), 0, 1, 0, 0.01);
  }

  const xMin = Math.min(vals[0], vals[6])
  vals[0] = vals[0] - xMin
  vals[2] = vals[2] - xMin
  vals[4] = vals[4] - xMin
  vals[6] = vals[6] - xMin
  
  const temp = document.createElement("div");
  odd ? temp.setAttribute("class", "ph phEven") : temp.setAttribute("class", "ph phOdd");
  odd = !odd
  let o = {
    x1: vals[0],
    y1: vals[1],
    x2: vals[2],
    y2: vals[3],
    x3: vals[4],
    y3: vals[5],
    x4: vals[6],
    y4: vals[7],
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

  lignes[0].innerHTML = `<svg><line x1="${vals[0] * _w}" y1="${
    vals[1] * _w
  }" x2="${vals[2] * _w}" y2="${
    vals[3] * _w
  }" stroke="${lignesStrokeCol}" stroke-width="${lignesStrokeWidth}" /></svg>`;

  lignes[1].innerHTML = `<svg><line x1="${vals[4] * _w}" y1="${
    vals[5] * _w
  }" x2="${vals[6] * _w}" y2="${
    vals[7] * _w
  }" stroke="${lignesStrokeCol}" stroke-width="${lignesStrokeWidth}" /></svg>`;

  let poigneesOffset = 4;

  poignees[0].style.marginLeft = vals[0] * _w - poigneesOffset + "px";
  poignees[0].style.marginTop = vals[1] * _h - poigneesOffset + "px";
  poignees[0].style.border = poigneePrefix + "red";

  poignees[1].style.marginLeft = vals[2] * _w - poigneesOffset + "px";
  poignees[1].style.marginTop = vals[3] * _h - poigneesOffset + "px";
  poignees[1].style.border = poigneePrefix + "blue";

  poignees[2].style.marginLeft = vals[4] * _w - poigneesOffset + "px";
  poignees[2].style.marginTop = vals[5] * _h - poigneesOffset + "px";
  poignees[2].style.border = poigneePrefix + "orange";

  poignees[3].style.marginLeft = vals[6] * _w - poigneesOffset + "px";
  poignees[3].style.marginTop = vals[7] * _h - poigneesOffset + "px";
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

  document.getElementById("inject").appendChild(temp);
}

// console.log(phrase);

function polish() {
  document
    .querySelectorAll(".ph")
    .forEach(
      (e) =>
        (e.style.width =
          e.firstElementChild.firstElementChild.getBoundingClientRect().width +
          "px")
    );

  document
    .querySelectorAll(".svg-debug")
    .forEach(
      (e) =>
        (e.style.width =
          e.firstElementChild.getBoundingClientRect().width + "px")
    );

  strokeWidth =
    document.getElementById("slide-graisse").value *
    (document.getElementById("slide-graisse").value * 0.1);

  $(function () {
    $("#check-trace")
      .change(function () {
        $(".trace").toggleClass("show-trace", this.checked);
      })
      .change();
  });

  $(function () {
    $("#check-transcription")
      .change(function () {
        $(".ref").toggleClass("show-transcription", this.checked);
      })
      .change();
  });

  $(function () {
    $("#check-boundingbox")
      .change(function () {
        $(".svg-debug").toggleClass("bounding-box", this.checked);
      })
      .change();
  });
}
