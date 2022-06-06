function rdm(max) {
  let res = Math.random();
  return res;
}
function range(val, start1, stop1, start2, stop2) {
  return ((val - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

function bezArg(w, h, x1, y1, x2, y2, x3, y3, x4, y4, col, sw, terminaison) {
  let biseau = _biseau;
  let string = [];
  let res = "";
  for (let i = 0; i < biseau; i++) {
    strokeDeg = i * 8;
    string[i] =
      ` <svg width="0px" height="0" class="svg-debug"  height="${h}px"><path d="M
      ${x1 * w} , ${y1 * h} 
      C ${x2 * w /* * (i / _biseauAmp) /2 */} ${y2 * h /* * (i / _biseauAmp) */} 
      ${x3 * w} ${y3 * h},
      ${x4 * w /* * (i / _biseauAmp) */} ${y4 * h}"fill="transparent" 
        stroke-linecap="square" 
        stroke="hsl(${_hue},0%,0%)" 
        stroke-width="${sw}"
        stroke-linejoin="${terminaison}
        " /></svg>
        `;
    res += string[i];
  }
  return res;
}
