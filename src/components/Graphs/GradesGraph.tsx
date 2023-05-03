import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Grades from "../../data/grades.json";
import { ActionIcon, Group, Text, HoverCard } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

import { IconInfoCircle, IconDatabaseOff } from "@tabler/icons-react";
import * as vars from "../../variables/Variables";
import { gpaToGrade, percentileToString } from "../../utils/utils";
import type { Grade, GradesData } from "~/data/gradeType";
import RMPLink from "../RMPLink";

const GradesList = Grades as GradesData;

const AsideMsg = ({ flag }: { flag: number }) => {
  return (
    <Group position="center">
      <HoverCard width={390} shadow="md">
        <HoverCard.Target>
          <ActionIcon
            variant="transparent"
            size="sm"
            style={{ marginTop: 15, opacity: 0.5 }}
            aria-label="Settings"
          >
            <IconInfoCircle />
          </ActionIcon>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <div style={{ display: "flex" }}>
            {flag === 1 && (
              <Text style={{ color: "#383838" }} size="sm">
                Course average is the average of every sections available across
                all years.
              </Text>
            )}
            {flag === 2 && (
              <Text style={{ color: "#383838" }} size="sm">
                Section average is the average of that section across all years.
              </Text>
            )}

            {flag === 3 && (
              <Text style={{ color: "#383838" }} size="sm">
                The percentile range of the students who received the respective
                grade.
              </Text>
            )}
          </div>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
};

const Disclaimer = () => {
  return (
    <div className="flex items-start pl-4 text-sm text-gray-500 sm:pl-16">
      <IconInfoCircle size={16} className="mr-2 mt-1" />

      <Text>
        Course grade information was requsted from the Division of&nbsp;
        <a
          className="text-blue-600 hover:underline"
          href="https://www.unr.edu/administration-and-finance"
        >
          Administration and Finance
        </a>
        .
      </Text>
    </div>
  );
};

const EmptyLabel = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <ActionIcon
        variant="transparent"
        color="gray"
        aria-label="No classes haven been added yet"
      >
        <IconDatabaseOff size={100} />
      </ActionIcon>
      <h3 className="mt-4 inline-block text-center text-base font-medium text-gray-500">
        No courses have been <br />
        added yet.
      </h3>
    </div>
  );
};

type Course = {
  title: string;
  description: string;
  term: string;
  courseIndex: number;
  // add any other properties of a course object here
};

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
  payload?: CourseData[];
};

type AsideProps = {
  props: CourseData[];
  hoveredOnGrade: {
    grade: string;
    index: number;
  };
};

const filteredKeys = (arr: Course[], filter: RegExp) => {
  let key;
  const keys = new Set();
  for (const obj of arr) {
    for (key in obj) {
      if (obj.hasOwnProperty(key) && filter.test(key)) keys.add(key);
    }
  }
  //return [...keys];
  return Array.from(keys.values());
};

const EmptyAside = () => {
  const AsideMsg = ({ flag }: { flag: number }) => {
    return (
      <Group position="center">
        <HoverCard width={390} shadow="md">
          <HoverCard.Target>
            <ActionIcon
              variant="transparent"
              size="sm"
              style={{ marginTop: 15, opacity: 0.5 }}
              aria-label="info"
            >
              <IconInfoCircle />
            </ActionIcon>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <div style={{ display: "flex" }}>
              {flag === 1 && (
                <Text style={{ color: "#383838" }} size="sm">
                  Course average is the average of every sections available
                  across all years.
                </Text>
              )}
              {flag === 2 && (
                <Text style={{ color: "#383838" }} size="sm">
                  Section average is the average of that section across all
                  years.
                </Text>
              )}
            </div>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>
    );
  };

  return (
    <div className="mb-52">
      <Group spacing="xs" className="w-48 whitespace-nowrap">
        <div className="h-4 w-4 rounded bg-gray-300"></div>
        <Text weight={700} size="lg">
          No Class Selected
        </Text>
      </Group>
      <Text style={{ padding: 2 }} size="sm" color="#595959">
        No Class Name Info
      </Text>
      <Text style={{ padding: 2 }} size="sm" color="#595959">
        No Section and Semester Info
      </Text>
      <div style={{ paddingTop: 25 }}>
        <Text
          weight={400}
          style={{ lineHeight: 0 }}
          mt="md"
          className="whitespace-nowrap"
        >
          Course Average
        </Text>
        <Group spacing={5}>
          <Text mt="md" color="#595959">
            No Data
          </Text>
          <AsideMsg flag={1} />
        </Group>
        <Text weight={400} style={{ lineHeight: 0 }} mt="md">
          Section Average
        </Text>
        <Group spacing={5}>
          <Text mt="md" color="#595959">
            No Data
          </Text>
          <AsideMsg flag={2} />
        </Group>
      </div>
    </div>
  );
};

const Aside = ({ props, hoveredOnGrade }: AsideProps) => {
  // console.log(
  //   props[hoveredOnGrade.grade],
  //   "props",
  //   hoveredOnGrade,
  //   "hoveredOnGrade"
  // );

  if (!(props && props.length > 0)) {
    return null;
  }
  const pass = props[hoveredOnGrade.index]
    ? props[hoveredOnGrade.index]
    : props[0];
  //console.log(pass, "pass");
  let index = pass?.courseIndex;
  if (index === undefined) {
    index = 0;
  }

  const gradeKey = hoveredOnGrade.grade;

  const percentage: string = (
    ((GradesList.Grades[index]?.[gradeKey as keyof Grade] as number) /
      GradesList.Grades[index]!.Enrollment) *
    100
  ).toFixed(1);

  const enrollment = GradesList.Grades[index]!.Enrollment;

  let diff = enrollment;
  const percentileRanges = [];
  let acc = 1;
  for (let i = 0; i < vars.letterGrades.length; i++) {
    diff =
      diff -
      (GradesList.Grades[index]?.[
        vars.letterGrades[i]! as keyof Grade
      ] as number);
    const pValue =
      Math.round((diff / enrollment + Number.EPSILON) * 100) / 100 < 0
        ? 0
        : Math.round((diff / enrollment + Number.EPSILON) * 100) / 100;
    percentileRanges.push([pValue, acc]);
    acc = pValue;
  }

  //   const gradeIndex = vars.letterGrades.indexOf(hoveredOnGrade.grade);
  // const [percentileLow = 0, percentileHigh = 0] = gradeIndex >= 0 ? percentileRanges[gradeIndex] as []: [];

  const [percentileLow = 0, percentileHigh = 0] = hoveredOnGrade.grade
    ? (percentileRanges[vars.letterGrades.indexOf(hoveredOnGrade.grade)] as [])
    : [];

  return (
    <div>
      <Group spacing="xs">
        <ActionIcon
          variant="filled"
          size={15}
          color={String(pass?.color)}
        ></ActionIcon>
        <Text weight={700} size="lg">
          {String(pass?.title)}
        </Text>
      </Group>

      <Text style={{ padding: 2 }} size="sm">
        {String(pass?.description)}
      </Text>
      <Text style={{ padding: 2 }} size="sm">
        {String(pass?.term)}{" "}
        {String(pass?.instructor) ? (
          <>
            •<RMPLink name={String(pass?.instructor)} />
          </>
        ) : (
          ""
        )}
      </Text>

      <div>
        <Group spacing={5}>
          <Text weight={700} mt="md">
            Course Average
          </Text>
          <AsideMsg flag={1} />
        </Group>
        <Group spacing="xs">
          <Text
            color={
              vars.gradeColor[ // No grade
                GradesList.Grades[index]!["Course Average"] != null
                  ? gpaToGrade(GradesList.Grades[index]!["Course Average"]!)
                  : "X"
              ]
            }
          >
            {GradesList.Grades[index]!["Course Average"] != null
              ? gpaToGrade(GradesList.Grades[index]!["Course Average"]!)
              : "N/A"}
          </Text>
          <Text>
            {GradesList.Grades[index]!["Course Average"] != null
              ? `${String(GradesList.Grades[index]!["Course Average"])}`
              : ""}
          </Text>
        </Group>
      </div>
      <div>
        <Group spacing={5}>
          <Text weight={700} mt="md">
            Section Average
          </Text>
          <AsideMsg flag={2} />
        </Group>
        <Group spacing="xs">
          <Text
            color={
              GradesList.Grades[index]!["Section Average"] != null
                ? vars.gradeColor[
                    gpaToGrade(GradesList.Grades[index]!["Section Average"]!)
                  ]
                : ""
            }
          >
            {GradesList.Grades[index]!["Section Average"] != null
              ? gpaToGrade(GradesList.Grades[index]!["Section Average"]!)
              : "N/A"}
          </Text>
          <Text>
            {GradesList.Grades[index]!["Section Average"] != null
              ? `(${String(GradesList.Grades[index]!["Section Average"])})`
              : ""}
          </Text>
        </Group>
      </div>
      {hoveredOnGrade.grade && (
        <div>
          <Group spacing={5}>
            <Text weight={700} mt="md">
              {percentileToString(percentileLow)}-
              {percentileToString(percentileHigh)} Percentile
            </Text>
            <AsideMsg flag={3} />
          </Group>
          <Group spacing="xs">
            <Text
              color={
                vars.gradeColor[
                  hoveredOnGrade.grade as keyof typeof vars.gradeColor
                ]
              }
            >
              {hoveredOnGrade.grade}
            </Text>
            <Text>
              ({GradesList.Grades[index]?.[hoveredOnGrade.grade as keyof Grade]}
              /{GradesList.Grades[index]!.Enrollment}, {percentage}%)
            </Text>
          </Group>
        </div>
      )}
    </div>
  );
};

const YAxisTickFormatter = (value: number) => {
  return `${Math.ceil(value / 10) * 10}`;
};

interface CustomLabelProps {
  x?: number;
  y?: number;
  width?: number;
  value?: number;
}

const PercentageLabel: React.FC<CustomLabelProps> = ({
  x,
  y,
  value,
  width,
}) => {
  //todo: change text color

  if (
    value == undefined ||
    width == undefined ||
    x == undefined ||
    y == undefined
  ) {
    return null;
  }

  const percentage =
    value === 0 ? "" : value < 1 ? "<1%" : `${Math.round(value * 10) / 10}%`;
  return (
    <text x={x + width} y={y} dx={20} dy={17} fontSize={12} textAnchor="middle">
      {percentage}
    </text>
  );
};

const SimpleBarChart = ({ course, payload }: GradesGraphProps) => {
  //const colors = ["#228be6", "#40c057", "#fa52w, "#fab005"];

  const titles = filteredKeys(course, /.*-.*/);

  //const xaxis = course.length > 0 ? "grade" : data;

  // const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  // const [hoveredGrade, setHoveredGrade] = useState<string>("");
  const [hoveredOnGrade, setHoveredOnGrade] = useState<{
    grade: string;
    index: number;
  }>({ grade: "", index: 0 });

  const handleLineHover = (grade: string, index: number) => {
    //setHoveredIndex(i);
    //setHoveredGrade(grade);
    setHoveredOnGrade({ grade, index });
  };

  const memoizedAside = useMemo(() => {
    return (
      <Aside
        props={payload ?? []}
        // hoveredIndex={hoveredIndex}
        // hoveredGrade={hoveredGrade}
        hoveredOnGrade={hoveredOnGrade}
      />
    );
  }, [hoveredOnGrade, payload]);

  //console.log(course, "course");

  interface CoursePayload {
    grade: string;
    title: string;
    [key: string]: number | string;
  }

  interface CustomMouseEvent extends React.MouseEvent<HTMLDivElement> {
    grade: string;
  }
  const { height, width } = useViewportSize();

  const formatGradeLabel = (gradeLabel: string) => {
    return `${gradeLabel}`;
  };

  return (
    <div className="relative">
      <div className="pb-6 pl-6 text-xl font-medium lg:hidden">
        Grade Distribution
      </div>
      {course.length <= 0 && ( // If no courses are selected, display the empty label
        <div className="absolute inset-0 ml-4 mt-24 lg:mr-44">
          <EmptyLabel />
        </div>
      )}

      <div className="flex min-w-0 flex-wrap-reverse pr-6 lg:flex-nowrap">
        {width <= 600 ? ( // If the screen width is less than 600px, display the aside below the graph
          <ResponsiveContainer
            width="100%"
            height={
              course.length >= 1
                ? 400 +
                  course.length *
                    (5 * Math.pow(payload?.length || 0, 2) +
                      15 * (payload?.length || 0) -
                      5)
                : 600
            }
          >
            <BarChart
              width={800}
              height={300}
              layout="vertical"
              onMouseMove={(event) => {
                if (event.activePayload && event.activePayload.length === 1) {
                  const payload = event.activePayload[0] as {
                    payload: CoursePayload;
                  };
                  //console.log(payload.payload, "payload");
                  handleLineHover(payload.payload.grade, 0);
                }
              }}
              data={course.length > 0 ? course : vars.defaultGradeGraph}
              margin={{ left: -30, bottom: 50, right: 30 }}
            >
              <YAxis
                dataKey="grade"
                type="category"
                opacity="0.5"
                interval={0}
                textAnchor="start"
                tickMargin={25}
                tickFormatter={formatGradeLabel}
              />
              {course.length > 0 ? (
                <XAxis
                  //domain={[0, 100]}
                  //tickFormatter={(tick) => `${tick}%`}
                  dx={5}
                  //textAnchor="center"
                  type="number"
                  unit="%"
                  opacity="0.5"
                />
              ) : (
                <XAxis
                  domain={[0, 100]}
                  //tickFormatter={(tick) => `${tick}%`}
                  //textAnchor="middle"
                  dx={5}
                  unit="%"
                  type="number"
                  opacity="0.5"
                />
              )}
              <Tooltip
                formatter={(value: string) => value + "%"}
                cursor={course.length <= 0 ? false : { fill: "#EAEAEA" }}
              />
              <Legend
                verticalAlign="top"
                align="left"
                iconType="circle"
                iconSize={10}
                wrapperStyle={{
                  paddingLeft: 55,
                  paddingRight: 10,
                  paddingBottom: 20,
                }}
              />
              {titles.map((item, i) => (
                <Bar
                  key={i}
                  dataKey={item as string}
                  fill={vars.chartBarcolors[i]}
                  onMouseEnter={(event: CustomMouseEvent) =>
                    handleLineHover(event.grade, i)
                  }
                  label={<PercentageLabel />}
                  radius={[0, 4, 4, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={400} className="max-w-5xl">
            <BarChart
              width={800}
              height={300}
              onMouseMove={(event) => {
                if (event.activePayload && event.activePayload.length === 1) {
                  const payload = event.activePayload[0] as {
                    payload: CoursePayload;
                  };
                  //console.log(payload.payload, "payload");
                  handleLineHover(payload.payload.grade, 0);
                }
              }}
              data={course.length > 0 ? course : vars.defaultGradeGraph}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis
                dataKey="grade"
                type="category"
                opacity="0.5"
                interval={0}
              />
              {course.length > 0 ? (
                <YAxis
                  //domain={[0, 100]}

                  type="number"
                  unit="%"
                  opacity="0.5"
                />
              ) : (
                <YAxis
                  domain={[0, 100]}
                  //tickFormatter={(tick) => `${tick}%`}
                  type="number"
                  unit="%"
                  opacity="0.5"
                />
              )}
              <Tooltip
                formatter={(value: string) => value + "%"}
                cursor={course.length <= 0 ? false : { fill: "#EAEAEA" }}
              />
              <Legend />
              {titles.map((item, i) => (
                <Bar
                  key={i}
                  dataKey={item as string}
                  fill={vars.chartBarcolors[i]}
                  onMouseEnter={(event: CustomMouseEvent) =>
                    handleLineHover(event.grade, i)
                  }
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
        <div className="hidden w-64 flex-shrink-0 px-6 lg:block">
          {course.length <= 0 ? <EmptyAside /> : memoizedAside}
        </div>
      </div>
      <Disclaimer />
    </div>
  );
};
export default SimpleBarChart;
