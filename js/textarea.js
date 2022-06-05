function drawSignes() {
  document.querySelectorAll(".ph").forEach((e) => e.remove());
  let phrase = encode(document.getElementById("textarea").value);
  // console.log(phrase);
  for (let i = 0; i < phrase.syllabes.length; i++) {
      genSvg(phrase.syllabes[i], phrase.syllabes);
    
  }
  polish();
}
