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
          indicator: "The indicator in this clue is 'jumping around', which suggests an anagram.",
          fodder: "The word 'dance' is the fodder in this clue that we'll use to construct our answer, as guided by the indicator",
          definition: "Our definition here is 'joy in your brain', which is a fun way to describe our answer"
        },
        videoUrl: "https://www.youtube.com/watch?v=-DXvOGMsWwo",
      }
    ]
  },
  { 
    id: "2",
    title: "Odd Joe Rae",
    author: "Fredrick Emula",
    clues: [
      {
        id: "1-1",
        text: "Odd Joe Rae, muy inteligente pero Niko es una mujer más inteligente (5)",
        solution: "JEREMY",
        indicator: ["odd"],
        fodder: ["Joe", "Rae", "muy"],
        definition: "inteligente pero Niko es una mujer más inteligente",
        explanation: {
          indicator: "The indicator in this clue is 'odd', which suggests we take the odd letters from the fodder.",
          fodder: "The word 'dance' is the fodder in this clue that we'll use to construct our answer, as guided by the indicator",
          definition: "Our definition here is 'joy in your brain', which is a fun way to describe our answer"
        },
        videoUrl: "https://www.youtube.com/watch?v=-DXvOGMsWwo",
      }
    ]
  },
  { 
    id: "3",
    title: "Youthful",
    author: "Fredrick Emula",
    clues: [
      {
        id: "1-1",
        text: "Youthful pop group mangles disk after hiding in \n East Raymondtown (5, 4)",
        solution: "STRAY KIDS",
        indicator: ["mangles", "after", "hiding in"],
        fodder: ["disk", "East Raymondtown"],
        definition: "Youthful pop group",
        explanation: {
          indicator: "The indicator in this clue is 'jumping around', which suggests an anagram.",
          fodder: "The word 'dance' is the fodder in this clue that we'll use to construct our answer, as guided by the indicator",
          definition: "Our definition here is 'joy in your brain', which is a fun way to describe our answer"
        },
        videoUrl: "https://www.youtube.com/watch?v=-DXvOGMsWwo",
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
        id: "1-1",
        text: "Catholic Church ends after even Ezra is not a butt toucher (4)",
        solution: "ZACH",
        indicator: ["ends", "after", "even"],
        fodder: ["Catholic Church", "Ezra"],
        definition: "is not a butt toucher",
        explanation: {
          indicator: "The indicator in this clue is 'jumping around', which suggests an anagram.",
          fodder: "The word 'dance' is the fodder in this clue that we'll use to construct our answer, as guided by the indicator",
          definition: "Our definition here is 'joy in your brain', which is a fun way to describe our answer"
        },
        videoUrl: "https://www.youtube.com/watch?v=-DXvOGMsWwo",
      }
    ]
  }
];
