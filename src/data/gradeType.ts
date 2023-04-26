export interface GradesData {
  Grades: Grade[];
}

export interface Grade {
  Term: string;
  Subject: string;
  Number: number;
  Ext: string;
  Section: number;
  Description: string;
  Enrollment: number;
  A: number;
  "A-": number;
  "B+": number;
  B: number;
  "B-": number;
  "C+": number;
  C: number;
  "C-": number;
  "D+": number;
  D: number;
  "D-": number;
  F: number;
  W: number;
  I: number;
  AD: number;
  R: number;
  S: number;
  U: number;
  X: number;
  GPA: number | null;
  Instructor: string;
  "Course Average": number | null;
  "Section Average": number | null;
}
