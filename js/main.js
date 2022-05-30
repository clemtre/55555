const count = 0;
let flagEspace = true;

function genSvg(vals, refs) {
  let spanRef = document.createElement("p");
  spanRef.innerHTML = refs;
  for (let i = 0; i < vals.length; i++) {
    vals[i] = range(parseFloat(vals[i]), 0, 1, 0, 0.01);
  }
  const temp = document.createElement("div");
  temp.setAttribute("class", "ph");
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

  document.getElementById("inject").appendChild(temp);
}

// console.log(phrase);

function polish() {
  document
    .querySelectorAll(".ph")
    .forEach(
      (e) =>
        (e.style.width =
          e.firstElementChild.firstElementChild.getBoundingClientRect().width /
            2 +
          "px")
    );

  document
    .querySelectorAll(".svg-debug")
    .forEach(
      (e) =>
        (e.style.width =
          e.firstElementChild.getBoundingClientRect().width + "px")
    );

    strokeWidth = document.getElementById("slide-graisse").value * (document.getElementById("slide-graisse").value * .1);

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
