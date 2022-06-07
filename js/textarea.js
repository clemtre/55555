function drawSignes() {
  document.querySelectorAll(".LIGNE").forEach((e) => e.remove());
  const textarea = document.getElementById("textarea")
  let phrase = encode(textarea.value.trim());
  // console.clear()
  // console.log(phrased)
 syllabesCtn = [];
  for (let i = 0; i < phrase.syllabes.length; i++) {
      genSvg(phrase.syllabes[i], phrase.syllabes[i].id);
    }
  polish();
}
drawSignes()