import { Container, Stack, ActionIcon } from "@mantine/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import {
  IconSquareRoundedArrowRightFilled,
  IconSquareRoundedArrowLeftFilled,
} from "@tabler/icons-react";

import { InputSelections } from "../../components/selections";
import CourseCard from "../../components/CourseCard";
import GradesGraph from "../../components/Graphs/GradesGraph";
import Grades from "../../data/grades.json";
import * as vars from "../../variables/Variables";
import type { Grade, GradesData } from "~/data/gradeType";

const GradesList = Grades as GradesData;

type GradesType = (typeof GradesList.Grades)[0];

interface ICourse {
  title: string;
  description: string;
  term: string;
  color: string;
  instructor: string;
  courseIndex: number;
}

type GradeData = {
  [key: string]: number | null;
};

type CourseData = {
  title: string;
  description: string;
  term: string;
  instructor: string | null;
  color: string;
  courseIndex: number;
};

type Props = {
  [key: string]: {
    "Course Average": number | null;
    "Section Average": number | null;
  } & GradeData;
};

type GradesGraphProps = {
  course: CourseData[];
  payload?: Props[];
};

// ...

export default function CourseGrade() {
  const router = useRouter();

  //const parsePath = router.asPath.lastIndexOf("/") + 1;

  //const courseIndexStr = router.asPath.slice(parsePath);

  //const courseIndex = parseInt(courseIndexStr, 10);

  const [courses, setCourses] = useState<CourseData[]>([]);

  //const [index, setIndex] = useState(null);

  const [couseStats, setCourseStats] = useState<CourseData[]>([]);

  const colors = ["blue", "green", "red", "yellow"];

  useEffect(() => {
    if (!router.isReady) return;

    const query = router.query;

    const courseIndices: number[] = (query.grade as string)
      .split("&")
      .map((x) => parseInt(x, 10));

    const courseSet: CourseData[] = [];

    for (const courseIndex of courseIndices) {
      if (!GradesList.Grades) {
        continue;
      }
      const title = `${(GradesList.Grades[courseIndex] as Grade).Subject} ${
        (GradesList.Grades[courseIndex] as Grade).Number
      } ${(GradesList.Grades[courseIndex] as Grade).Section}`;
      const description = (GradesList.Grades[courseIndex] as Grade).Description;
      const term = (GradesList.Grades[courseIndex] as Grade).Term;
      const instructor = (GradesList.Grades[courseIndex] as Grade).Instructor;

      courseSet.push({
        title,
        description,
        term,
        color: "",
        instructor,
        courseIndex,
      });
    }

    setCourses(courseSet);
    courseData(courseIndices);
  }, [router.isReady, router.query]);

  function courseData(indices: number[]) {
    const stats = [];
    // const roundAccurately = (number: number, decimalPlaces: number) =>
    //   Number(
    //     Math.round(Number(String(number) + "e" + String(decimalPlaces))) +
    //       "e-" +
    //       String(decimalPlaces)
    //   );

    const roundAccurately = (number: number, decimalPlaces: number): number => {
      const roundedNumber = Math.round(Number(`${number}e${decimalPlaces}`));
      return Number(`${roundedNumber}e-${decimalPlaces}`);
    };
    for (const x of indices) {
      const i = x;

      //console.log(Grades.Grades[i]);
      const stat = [];

      /*

      for (let key of Object.keys(Grades.Grades[i]).slice(6, 25)) {
        if (Grades.Grades[i][key as keyof GradesType] === 0) {
          //continue;
        }
        const percent =
          ((Grades.Grades[i][key as keyof GradesType] as number) /
            Grades.Grades[i]["Enrollment"]) *
          100;
        const percentage = roundAccurately(percent, 2);
        const title = `${Grades.Grades[i]["Subject"]} ${Grades.Grades[i]["Number"]} ${Grades.Grades[i]["Section"]} - ${Grades.Grades[i]["Term"]}`;
        stat.push({ grade: key, [title]: percentage, title: title });
        //stat.push({grade: key}, {})
      }
      */

      for (const key of vars.letterGrades) {
        if (
          GradesList.Grades[i]![key as keyof GradesType] === 0 &&
          vars.miscLetterGrades.includes(key)
        ) {
          continue;
        }
        const percent =
          ((GradesList.Grades[i]![key as keyof GradesType] as number) /
            GradesList.Grades[i]!["Enrollment"]) *
          100;
        const percentage = roundAccurately(percent, 2);
        const title = `${GradesList.Grades[i]!["Subject"]} ${
          GradesList.Grades[i]!["Number"]
        } ${GradesList.Grades[i]!["Section"]} - ${
          GradesList.Grades[i]!["Term"]
        }`;
        stat.push({ grade: key, [title]: percentage, title: title });
        //stat.push({grade: key}, {})
      }
      //console.log(stat);
      stats.push(stat);
    }

    const map = new Map();

    stats[0]?.forEach((item) => map.set(item.grade, item));

    for (let i = 1; i < stats.length; i++) {
      stats[i]?.forEach((item) =>
        map.set(item.grade, { ...map.get(item.grade), ...item })
      );
    }
    const mergedArr = Array.from(map.values()).sort(
      (a: { grade: string }, b: { grade: string }) =>
        vars.letterGrades.indexOf(a.grade) - vars.letterGrades.indexOf(b.grade)
    );
    setCourseStats(mergedArr);
  }

  courses.map((item, i) => (item.color = colors[i] ?? item.color));

  const [scrollX, setScrollX] = useState<number>(0); // For detecting start scroll postion
  const [scrolEnd, setScrollEnd] = useState<boolean>(false); // For detecting end of scrolling

  const scrl = useRef<HTMLDivElement>(null);

  //Slide click
  const slide = (shift: number): void => {
    if (scrl.current !== null) {
      scrl.current.scrollLeft += shift;
      setScrollX(scrollX + shift);

      if (
        Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
        scrl.current.offsetWidth
      ) {
        setScrollEnd(true);
      } else {
        setScrollEnd(false);
      }
    }
  };

  const scrollCheck = (): void => {
    if (scrl.current !== null) {
      setScrollX(scrl.current.scrollLeft);

      if (
        Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
        scrl.current.offsetWidth
      ) {
        setScrollEnd(true);
      } else {
        setScrollEnd(false);
      }
    }
  };

  return (
    <Container fluid={true}>
      <Head>
        <title>Nevadapath – Grades </title>
        <meta name="description" content="View course grade distributions" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content={`nevadapath.com/api/og?courses=${
            router.query.grade
              ? router.query.grade.toString().split("&").join(",")
              : ""
          }`}
        />
      </Head>
      <Stack spacing="xl">
        <InputSelections />
        <div>
          <div className="mb-0.5">
            {scrollX !== 0 && courses.length > 1 && (
              <ActionIcon
                variant="subtle"
                className="absolute left-0 z-10 mt-20"
                onClick={() => slide(-100)}
              >
                <IconSquareRoundedArrowLeftFilled size="1.5rem" />
              </ActionIcon>
            )}
            {!scrolEnd && courses.length > 1 && (
              <ActionIcon
                variant="subtle"
                className="absolute right-0 z-10 mt-20"
                onClick={() => slide(+100)}
              >
                <IconSquareRoundedArrowRightFilled size="1.5rem" />
              </ActionIcon>
            )}
          </div>
          <div
            className="relative flex space-x-4 overflow-x-auto px-6"
            ref={scrl}
            onScroll={scrollCheck}
          >
            {router.isReady &&
              courses.map((course, i) => {
                return (
                  <CourseCard
                    key={i.toString()}
                    course={course.title}
                    description={course.description}
                    instructor={course.instructor}
                    term={course.term}
                    stats={GradesList.Grades[course.courseIndex]!}
                    index={course.courseIndex}
                    color={colors[i]}
                  />
                );
              })}
          </div>
        </div>
        {Object.keys(couseStats).length !== 0 && (
          <GradesGraph course={couseStats} payload={courses} />
        )}
      </Stack>
    </Container>
  );
}
