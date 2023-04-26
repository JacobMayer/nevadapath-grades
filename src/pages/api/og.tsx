import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import QuickChart from "quickchart-js";

export const config = {
  runtime: "edge",
};

export default async function handler(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const course = searchParams.get("course");

  const myChart = new QuickChart();
  const letterGrades = [
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
  ];

  const response = await fetch(
    "https://grades-db.sultan7rs.workers.dev/api/grades/" + course
  );
  const data = await response.json();
  console.log(data);

  const datasets = data.map((course: any) => {
    const label =
      course["Subject"] +
      " " +
      course["Number"] +
      " " +
      course["Ext"] +
      " " +
      course["Section"];
    const grades = letterGrades.map(
      (key) => (course[key] / course["Enrollment"]) * 100
    );

    return {
      label: label,
      data: grades,
    };
  });

  myChart.setConfig({
    type: "bar",
    data: {
      labels: letterGrades,
      datasets: datasets,
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: (val: number) => {
                return val.toLocaleString() + "%";
              },
            },
          },
        ],
      },
    },
  });

  const image = fetch(new URL(myChart.getUrl(), import.meta.url)).then((res) =>
    res.arrayBuffer()
  );

  console.log(course);
  const imageData = await image;
  // @ts-ignore
  return new ImageResponse(<img src={imageData} height="100%" width="100%" />, {
    width: 1200,
    height: 630,
  });
}
