
// const input = element.innerHTML;

function encode(input) {
  const output = input;
  let id = 0,
    char = "0",
    syllabe = 0,
    mot = 0,
    ligne = 0,
    paragraphe = 0,
    isEspace = false,
    isTiret = false,
    isSaut = false,
    isSyllabe = false,
    A = 0;
  let chars = [];
  let syllabes = [];
  for (let i = 0; i < input.length; i++) {
    char = input.charAt(i);
    input.charAt(i) == "\n" ? (isSaut = true) : (isSaut = false);
    input.charAt(i) == " " ? (isEspace = true) : (isEspace = false);
    input.charAt(i) == "-" ? (isTiret = true) : (isTiret = false);
    if (!isEspace && !isSaut && !isTiret) {
      A = input.charCodeAt(i);
      chars[id] = { id, char, A, syllabe, mot, ligne, paragraphe };
      id++;
    }
    if (isTiret) {
      syllabe++;
    }
    if (isEspace || isSaut) {
      mot++;
      syllabe++;
    }
    if (isSaut) {
      mot++;
      ligne++;
    }
  }
  let motTemp = 0;
  let eval;
  for (let syllabe = -1; syllabe < chars[chars.length - 1].syllabe; syllabe++) {
    let res = chars.filter((char) => char.syllabe === syllabe + 1);
    let magie = 0;

    eval = false;
    if (res[0].mot !== motTemp) {
      eval = true;
    }
    for (let e = 0; e < res.length; e++) {
      magie += res[e].char.charCodeAt();
    }
    syllabes = [...syllabes, { eval: eval, id: parseFloat(hash(magie)) }];
    motTemp = res[0].mot;
  }
  return { chars, syllabes };
}

console.log(encode(input).syllabes);

function hash(input) {
  let res = (input ** 5 % 5555555555555555).toString();
  while (res.length != 16) {
    res += "5";
  }
  return res;
}
