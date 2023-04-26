import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "@mantine/core";
import { InputSelections } from "../../components/selections";
import GradesGraph from "../../components/Graphs/GradesGraph";

// export const metadata: Metadata = {
//   title: "Nevadapath – Grades",
//   description:
//     "View grade distributions for University of Nevada, Reno courses.",
//   keywords:
//     "UNR, University of Nevada Reno, grade distributions, courses, grades",
// };

const CourseSelection: NextPage = () => {
  return (
    <Container fluid={true}>
      <Head>
        <title>Nevadapath – Grades</title>
        <meta
          name="description"
          content="View grade distributions for University of Nevada, Reno courses."
          key="UNR, University of Nevada Reno, grade distributions, courses, grades"
        />
        <meta
          property="og:title"
          content="View UNR Course Grade Distributions"
        />
        <meta
          property="og:description"
          content="View grade distributions for University of Nevada, Reno courses."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nevadapath.com/" />
        <meta
          property="og:image"
          content="https://yourdomain.com/images/og-image.jpg"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="View UNR Course Grade Distributions"
        />
        <meta
          name="twitter:description"
          content="View grade distributions for University of Nevada, Reno courses."
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/images/twitter-image.jpg"
        ></meta>

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InputSelections />

      <div className="container mt-20 lg:mt-52">
        <GradesGraph course={[]} />
      </div>
    </Container>
  );
};

export default CourseSelection;
