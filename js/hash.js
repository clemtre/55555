// const input = "aaa-aa aaaa aaa aa a";
function encode(input) {
  let res = input.trim().split(" ");
  let syllabes = [];
  for (let i = 0; i < res.length; i++) {
    syllabes[i] = res[i].split("-");
    res[i] = res[i].split("-");
    for (let j = 0; j < res[i].length; j++) {
      res[i][j] = res[i][j].split("");
      for (let k = 0; k < res[i][j].length; k++) {
        res[i][j][k] = res[i][j][k].charCodeAt();
      }
      let toHash = res[i][j].join("");
      if (toHash != "") {
        res[i][j] = hash(toHash).split(/(?<=^(?:.{2})+)(?!$)/);
      }
    }
  }
  return { res, syllabes };
}
// console.log(encode(input));
// x0,y0, x1,y1, x2,y2, x3,y3

function hash(input) {
  let res = (input ** 5 % 5555555555555555).toString();
  while (res.length != 16) {
    res += "5";
  }
  return res;
}
