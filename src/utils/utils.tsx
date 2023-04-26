function gpaToGrade(gpa: number) {
  if (gpa > 3.7) {
    return "A";
  }

  if (gpa > 3.3) {
    return "A-";
  }

  if (gpa > 3.0) {
    return "B+";
  }

  if (gpa > 2.7) {
    return "B";
  }

  if (gpa > 2.3) {
    return "B-";
  }

  if (gpa > 2.0) {
    return "C+";
  }

  if (gpa > 1.7) {
    return "C";
  }

  if (gpa > 1.3) {
    return "C-";
  }

  if (gpa > 1.0) {
    return "D+";
  }

  if (gpa > 0.7) {
    return "D";
  }

  if (gpa === 0.7) {
    return "D-";
  }

  return "F";
}

// const LETTER_GRADE_TO_GPA = new Map([
//   ["A", 4.0],
//   ["A-", 3.7],
//   ["B+", 3.3],
//   ["B", 3.0],
//   ["B-", 2.7],
//   ["C+", 2.3],
//   ["C", 2.0],
//   ["C-", 1.7],
//   ["D+", 1.3],
//   ["D", 1.0],
//   ["D-", 0.7],
//   ["F", 0.0],
// ])

// function gpaToLetterGrade(gpa: number) {
//   const values = []; const diff = [];
//   for (let [k, v] of LETTER_GRADE_TO_GPA) {
//     values.push([Math.abs(gpa - v), k]);
//     diff.push(Math.abs(gpa - v));
//     }
//     return values[diff.indexOf(Math.min(...diff))][1];
// }

function percentileToString(percentile: number) {
  if (percentile === 1) {
    return "100th";
  }
  if (percentile === 0) {
    return "0th";
  }
  const str = `${percentile}`.padEnd(4, "0").slice(2);
  if (str[0] === "0") {
    if (str[1] === "1") {
      return `${str[1]}st`;
    } else if (str[1] === "2") {
      return `${str[1]}nd`;
    } else if (str[1] === "3") {
      return `${str[1]}rd`;
    } else {
      return `${str[1] ?? ""}th`;
    }
  } else if (str[1] === "1" && str[0] !== "1") {
    return `${str}st`;
  } else if (str[1] === "2" && str[0] !== "1") {
    return `${str}nd`;
  } else if (str[1] === "3" && str[0] !== "1") {
    return `${str}rd`;
  } else {
    return `${str}th`;
  }
}

export { gpaToGrade, percentileToString };
