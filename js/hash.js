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
    isChar = false,
    A = 0;
  let chars = [];
  let syllabes = [];
  for (let i = 0; i < input.length; i++) {
    isChar = true
    char = input.charAt(i);
    input.charAt(i) == "\n" ? (isSaut = true) : (isSaut = false);
    input.charAt(i) == " " ? (isEspace = true) : (isEspace = false);
    input.charAt(i) == "-" ? (isTiret = true) : (isTiret = false);
    // if (!isEspace && !isSaut && !isTiret) {
    A = input.charCodeAt(i);
    if (isTiret || isEspace || isSaut) {
      isChar = false
      syllabe++;
    }
    if (isEspace || isSaut) {
      mot++;
    }
    if (isSaut) {
      ligne++;
    }
    chars[id] = {
      id,
      char,
      isChar,
      A,
      syllabe,
      mot,
      ligne,
      paragraphe,
      isEspace,
      isTiret,
      isSaut,
    };
    id++;
  }
  let motTemp = -1;
  let isMotDebut;
  let ligneTemp = -1;
  let a;
  for (let syllabe = -1; syllabe < chars[chars.length - 1].syllabe; syllabe++) {
    let trad = ''
    const primChar = chars.find((e) => e.syllabe === syllabe + 1);
    // console.log(primChar.mot, primChar.syllabe)
    let res = chars.filter((char) => char.syllabe === syllabe + 1);
    let magie = 0;
    if (res[0].ligne !== ligneTemp) {
      a = true;
    }
    if (res[0].mot !== motTemp) {
      isMotDebut = true;
    }
    for (let e = 0; e < res.length; e++) {
      if(res[e].isChar){
        trad += res[e].char
        magie += res[e].char.charCodeAt();

      }
    }
    // console.log(res)
    let magieParse = hash(magie);
    let magieSorted = [
      magieParse.slice(0, 2),
      magieParse.slice(4, 6),
      magieParse.slice(8, 10),
      magieParse.slice(12, 14),
    ];
    magieSorted.sort();
    syllabes = [
      ...syllabes,
      {
        mot: primChar.mot,
        syllabe: primChar.syllabe,
        a: a,
        trad:trad,
        isMotDebut: isMotDebut,
        id: magieParse,
        // x1: magieSorted[0] * 0.01,
        // y1: magieParse.slice(2, 4) * 0.01,
        // x2: magieSorted[1] * 0.01,
        // y2: magieParse.slice(6, 8) * 0.01,
        // x3: magieSorted[2] * 0.01,
        // y3: magieParse.slice(10, 12) * 0.01,
        // x4: magieSorted[3] * 0.01,
        // y4: magieParse.slice(14, 16) * 0.01,
        x1: magieParse.slice(0, 2) * 0.01,
        y1: magieParse.slice(2, 4) * 0.01,
        x2: magieParse.slice(4, 6) * 0.01,
        y2: magieParse.slice(6, 8) * 0.01,
        x3: magieParse.slice(8, 10) * 0.01,
        y3: magieParse.slice(10, 12) * 0.01,
        x4: magieParse.slice(12, 14) * 0.01,
        y4: magieParse.slice(14, 16) * 0.01,
      },
    ];
    motTemp = res[0].mot;
    ligneTemp = res[0].ligne;
  }
  return { chars, syllabes };
}

// console.table(encode(input).chars);

function hash(input) {
  let res = (input ** 5 % 5555555555555555).toString();
  while (res.length != 16) {
    res += "5";
  }
  return res;
}
