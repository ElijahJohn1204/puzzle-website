export interface Clue {
  id: string;
  text: string;
  solution: string;
  indicator: string[];
  fodder: string[];
  definition: string;
  explanation: {
    indicator: string;
    fodder: string;
    definition: string;
  };
  videoUrl: string;
  nowrapSequences?: string[];
}
export interface Puzzle {
  id: string;
  title: string;
  author: string;
  clues: Clue[];
}

export const puzzles: Puzzle[] = [
  { 
    id: "1",
    title: "Dance",
    author: "Fredrick Emula",
    clues: [
      {
        id: "1-1",
        text: "Dance, jumping around for joy in your brain? (5)",
        solution: "CADEN",
        indicator: ["jumping around"],
        fodder: ["dance"],
        definition: "joy in your brain",
        explanation: {
          indicator: "The indicator in this clue is 'jumping around', which suggests that we must find an anagram for the fodder.",
          fodder: "The word 'dance' is the fodder in this clue that we'll use to construct our answer, as guided by the indicator(s).",
          definition: "Our definition here is 'joy in your brain', which is a fun way to describe our answer."
        },
        videoUrl: "https://www.youtube.com/embed/JQkwk9G1FTM",
      }
    ]
  },
  { 
    id: "2",
    title: "Odd Joe Rae",
    author: "Fredrick Emula",
    clues: [
      {
        id: "1-2",
        text: "Odd Joe Rae, muy inteligente pero Niko es una mujer más inteligente (6)",
        solution: "JEREMY",
        indicator: ["odd"],
        fodder: ["Joe", "Rae", "muy"],
        definition: "inteligente pero Niko es una mujer más inteligente",
        explanation: {
          indicator: "The indicator in this clue is 'odd', which suggests that we must select certain letters of the fodder.",
          fodder: "The words 'Joe', 'Rae', and 'muy' are the fodder in this clue from which we will grab letters to form our answer, as guided by the indicator(s).",
          definition: "Our definition is 'muy inteligente pero Niko es una mujer más inteligente', which translates to 'very intelligent but Niko is a more intelligent woman'. This is a playful description of our answer."
        },
        videoUrl: "https://www.youtube.com/embed/6V2fuAjxt2U",
      }
    ]
  },
  { 
    id: "3",
    title: "Youthful",
    author: "Fredrick Emula",
    clues: [
      {
        id: "1-3",
        text: "Youthful pop group mangles disk after hiding in \n East Raymondtown (5, 4)",
        solution: "STRAY KIDS",
        indicator: ["mangles", "after", "hiding in"],
        fodder: ["disk", "East Raymondtown"],
        definition: "Youthful pop group",
        explanation: {
          indicator: "The indicators in this clue are 'mangles', 'after', and 'hiding in'. One tells us to anagram some fodder, another tells us to extract some letters within some fodder, and the third explains how they are positioned.",
          fodder: "The words 'disk' and 'East Raymondtown' are the fodder. We will need to manipulate these words and extract letters from them to get the answer, guided by the indicator(s).",
          definition: "Our definition here is 'Youthful pop group', which is a general description of our answer."
        },
        videoUrl: "https://www.youtube.com/embed/ggQ29VxcqRA",
        nowrapSequences: ["East Raymondtown"]
      }
    ]
  },
  { 
    id: "4",
    title: "Catholic Church",
    author: "Fredrick Emula",
    clues: [
      {
        id: "1-4",
        text: "Catholic Church ends after even Ezra is not a butt toucher (4)",
        solution: "ZACH",
        indicator: ["ends", "after", "even"],
        fodder: ["Catholic", "Church", "Ezra"],
        definition: "is not a butt toucher",
        explanation: {
          indicator: "The indicators in this clue are 'ends', 'after', and 'even'. Two will be used to select specific letters from the fodder, while the other gives information about how those letters should be ordered.",
          fodder: "The words 'Catholic', 'Church', and 'Ezra' are the fodder in this clue. We will need letters from each of them to form our answer.",
          definition: "Our definition here is 'is not a butt toucher', which refers to a memorable description of our answer."
        },
        videoUrl: "https://www.youtube.com/embed/Wdng4IUnkS4",
      }
    ]
  }
];
