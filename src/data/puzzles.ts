export interface Clue {
  id: string;
  text: string;
  solution: string;
  indicator: string;
  fodder: string;
  definition: string;
  explanation?: {
    indicator?: string;
    fodder?: string;
    definition?: string;
  };
  videoUrl?: string;
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
    title: "Dance...",
    author: "Fredrick Emula",
    clues: [
      {
        id: "1-1",
        text: "Dance, jumping around for joy in your brain (5)",
        solution: "CADEN",
        indicator: "jumping around",
        fodder: "dance",
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
    id: "1",
    title: "Odd Joe...",
    author: "Fredrick Emula",
    clues: [
      {
        id: "1-1",
        text: "Odd Joe Rae, muy amable (5)",
        solution: "CADEN",
        indicator: "jumping around",
        fodder: "dance",
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
    id: "1",
    title: "Dance...",
    author: "Fredrick Emula",
    clues: [
      {
        id: "1-1",
        text: "Dance, jumping around for joy in your brain (5)",
        solution: "CADEN",
        indicator: "jumping around",
        fodder: "dance",
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
    id: "1",
    title: "Dance...",
    author: "Fredrick Emula",
    clues: [
      {
        id: "1-1",
        text: "Dance, jumping around for joy in your brain (5)",
        solution: "CADEN",
        indicator: "jumping around",
        fodder: "dance",
        definition: "joy in your brain",
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
