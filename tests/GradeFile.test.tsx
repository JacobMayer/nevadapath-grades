import { expect, test } from "vitest";

import Grades from "../src/data/grades.json";
import { GradesData } from "../src/data/gradeType";

const GradesList = Grades as GradesData;

test("gradeData", () => {
  GradesList.Grades.forEach((grade) => {
    if (grade["Course Average"] !== null) {
      expect(grade["Course Average"]).toBeGreaterThanOrEqual(0);
      expect(grade["Course Average"]).toBeLessThanOrEqual(5);
    }
    if (grade["Section Average"] !== null) {
      expect(grade["Section Average"]).toBeGreaterThanOrEqual(0);
      expect(grade["Section Average"]).toBeLessThanOrEqual(5);
    }
    expect(grade["A"]).toBeGreaterThanOrEqual(0);
    expect(grade["A-"]).toBeGreaterThanOrEqual(0);
    expect(grade["B+"]).toBeGreaterThanOrEqual(0);
    expect(grade["B"]).toBeGreaterThanOrEqual(0);
    expect(grade["B-"]).toBeGreaterThanOrEqual(0);
    expect(grade["C+"]).toBeGreaterThanOrEqual(0);
    expect(grade["C"]).toBeGreaterThanOrEqual(0);
    expect(grade["C-"]).toBeGreaterThanOrEqual(0);
    expect(grade["D+"]).toBeGreaterThanOrEqual(0);
    expect(grade["D"]).toBeGreaterThanOrEqual(0);
    expect(grade["D-"]).toBeGreaterThanOrEqual(0);
    expect(grade["F"]).toBeGreaterThanOrEqual(0);
    expect(grade["W"]).toBeGreaterThanOrEqual(0);

    if (grade["GPA"] !== null) {
      expect(grade["GPA"]).toBeGreaterThanOrEqual(0);
      expect(grade["GPA"]).toBeLessThanOrEqual(5);
    }
  });
});

// Compare this snippet from tests/grades.test.tsx:
