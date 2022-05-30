function drawSignes() {
  document.querySelectorAll(".ph").forEach((e) => e.remove());
  let phrase = encode(document.getElementById("textarea").value);
  console.log(phrase);
  for (let i = 0; i < phrase.res.length; i++) {
    for (let j = 0; j < phrase.res[i].length; j++) {
      genSvg(phrase.res[i][j], phrase.syllabes[i][j]);
    }
  }
  polish();
}
