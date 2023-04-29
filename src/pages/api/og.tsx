// import { ImageResponse } from "@vercel/og";
// import type { NextRequest } from "next/server";
// import QuickChart from "quickchart-js";

// export const config = {
//   runtime: "edge",
// };

// export interface GradesData {
//   [key: string]: string | number | null;
//   Term: string;
//   Subject: string;
//   Number: number;
//   Ext: string;
//   Section: string;
//   Description: string;
//   Enrollment: number;
//   A: number;
//   "A-": number;
//   "B+": number;
//   B: number;
//   "B-": number;
//   "C+": number;
//   C: number;
//   "C-": number;
//   "D+": number;
//   D: number;
//   "D-": number;
//   F: number;
//   W: number;
//   I: number;
//   AD: number;
//   R: number;
//   S: number;
//   U: number;
//   X: number;
//   GPA: number;
//   Instructor: null;
//   "Course Average": number;
//   "Section Average": number;
// }
// export default async function handler(request: NextRequest) {
//   const { searchParams } = new URL(request.url);

//   const course = searchParams.get("course");

//   const myChart = new QuickChart();
//   const letterGrades = [
//     "A",
//     "A-",
//     "B+",
//     "B",
//     "B-",
//     "C+",
//     "C",
//     "C-",
//     "D+",
//     "D",
//     "D-",
//     "F",
//     "S",
//     "U",
//   ];

//   const response: Response = await fetch(
//     `https://grades-db.sultan7rs.workers.dev/api/grades/${course ?? ""}`
//   );
//   const data = (await response.json()) as unknown as GradesData[];
//   console.log(data);

//   const datasets = data.map((course) => {
//     const label = `${course["Subject"]} ${course["Number"]} ${course["Ext"]} ${course["Section"]}`;

//     const grades = letterGrades.map((key) => {
//       const grade = course[key];
//       const enrollment = course["Enrollment"];
//       if (typeof grade === "number" && typeof enrollment === "number") {
//         return (grade / enrollment) * 100;
//       } else {
//         return 0;
//       }
//     });

//     return {
//       label: label,
//       data: grades,
//     };
//   });

//   myChart.setConfig({
//     type: "bar",
//     data: {
//       labels: letterGrades,
//       datasets: datasets,
//     },
//     options: {
//       scales: {
//         yAxes: [
//           {
//             ticks: {
//               callback: (val: number) => {
//                 return val.toLocaleString() + "%";
//               },
//             },
//           },
//         ],
//       },
//     },
//   });

//   console.log(course);

//   return new ImageResponse(
//     <img src={myChart.getUrl()} height="100%" width="100%" />,
//     {
//       width: 1200,
//       height: 630,
//     }
//   );
// }
// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes

import type { NextRequest } from "next/server";
//import QuickChart from "quickchart-js";

export const config = {
  runtime: "edge",
};

// export interface GradesData {
//   [key: string]: string | number | null;
//   Term: string;
//   Subject: string;
//   Number: number;
//   Ext: string;
//   Section: string;
//   Description: string;
//   Enrollment: number;
//   A: number;
//   "A-": number;
//   "B+": number;
//   B: number;
//   "B-": number;
//   "C+": number;
//   C: number;
//   "C-": number;
//   "D+": number;
//   D: number;
//   "D-": number;
//   F: number;
//   W: number;
//   I: number;
//   AD: number;
//   R: number;
//   S: number;
//   U: number;
//   X: number;
//   GPA: number;
//   Instructor: null;
//   "Course Average": number;
//   "Section Average": number;
// }

export default function handler(req: NextRequest) {
  // const { searchParams } = new URL(req.url);

  // if (!searchParams.has("course")) {
  //   return new Response("Missing course parameter", { status: 400 });
  // }

  // const course = searchParams.get("course");

  // const myChart = new QuickChart();
  // const letterGrades = [
  //   "A",
  //   "A-",
  //   "B+",
  //   "B",
  //   "B-",
  //   "C+",
  //   "C",
  //   "C-",
  //   "D+",
  //   "D",
  //   "D-",
  //   "F",
  //   "S",
  //   "U",
  // ];

  // const response: Response = await fetch(
  //   `https://grades-db.sultan7rs.workers.dev/api/grades/${course ?? ""}`
  // );
  // const data = (await response.json()) as unknown as GradesData[];
  // console.log(data);

  // const datasets = data.map((course) => {
  //   const label = `${course["Subject"]} ${course["Number"]} ${course["Ext"]} ${course["Section"]}`;

  //   const grades = letterGrades.map((key) => {
  //     const grade = course[key];
  //     const enrollment = course["Enrollment"];
  //     if (typeof grade === "number" && typeof enrollment === "number") {
  //       return (grade / enrollment) * 100;
  //     } else {
  //       return 0;
  //     }
  //   });

  //   return {
  //     label: label,
  //     data: grades,
  //   };
  // });

  // myChart.setConfig({
  //   type: "bar",
  //   data: {
  //     labels: letterGrades,
  //     datasets: datasets,
  //   },
  //   options: {
  //     scales: {
  //       yAxes: [
  //         {
  //           ticks: {
  //             callback: (val: number) => {
  //               return val.toLocaleString() + "%";
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   },
  // });

  // console.log(course);

  // const chartImage = await fetch(myChart.getUrl());

  // const blob = await chartImage.blob();
  // const headers = { "Content-Type": "image/png" };
  // const myResponse = new Response(blob, { headers });
  // return myResponse;

  // return new ImageResponse(
  //   <div style={{ display: "flex" }}>Hello, world!</div>,
  //   {
  //     width: 1200,
  //     height: 630,
  //   }
  // );

  return new Response("Ayooo wassup");
}
