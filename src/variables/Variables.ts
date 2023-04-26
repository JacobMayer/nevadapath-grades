export interface IGradeColor {
  A: string;
  "A-": string;
  "B+": string;
  B: string;
  "B-": string;
  "C+": string;
  C: string;
  "C-": string;
  "D+": string;
  D: string;
  "D-": string;
  F: string;
  S: string;
  U: string;
  W: string;
  R: string;
  AD: string;
  I: string;
  X: string;
}

export const letterGrades: string[] = [
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D+",
  "D",
  "D-",
  "F",
  "S",
  "U",
  "AD",
  "W",
  "I",
  "R",
  "X",
];

export const miscLetterGrades: string[] = ["AD", "W", "I", "R", "X"];

export const gradeColor: IGradeColor = {
  A: "#18de83",
  "A-": "#18de83",
  "B+": "#ffa414",
  B: "#ffa414",
  "B-": "#ffa414",
  "C+": "#fc7676",
  C: "#fc7676",
  "C-": "#fc7676",
  "D+": "#fc7676",
  D: "#fc7676",
  "D-": "#fc7676",
  F: "#fc7676",
  S: "#18de83",
  U: "#fc7676",
  W: "",
  R: "",
  AD: "",
  I: "",
  X: "",
};

export const chartBarcolors: string[] = [
  "#228be6",
  "#40c057",
  "#fa5252",
  "#fab005",
];

export const defaultGradeGraph: { grade: string }[] = [
  {
    grade: "A",
  },
  {
    grade: "A-",
  },
  {
    grade: "B+",
  },
  {
    grade: "B",
  },
  {
    grade: "B-",
  },
  {
    grade: "C+",
  },
  {
    grade: "C",
  },
  {
    grade: "C-",
  },
  {
    grade: "D+",
  },
  {
    grade: "D",
  },
  {
    grade: "D-",
  },
  {
    grade: "F",
  },
  {
    grade: "S",
  },
  {
    grade: "U",
  },
  //Irrelevant marks
  /*
    {
      grade: "AD",
    },
    {
      grade: "W",
    },
    {
      grade: "I",
    },
    {
      grade: "R",
    },
    {
      grade: "X",
    },
    */
];

export const defaultEnrollmentGraph: { day: number }[] = new Array(140)
  .fill(0)
  .map((_e, i) => {
    return { day: i };
  });

module.exports = {
  letterGrades,
  miscLetterGrades,
  gradeColor,
  chartBarcolors,
  defaultGradeGraph,
  defaultEnrollmentGraph,
};
