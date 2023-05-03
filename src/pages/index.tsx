import { Button } from "@mantine/core";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import SvgHero from "../components/SvgHero";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nevadapath - Grade distributions data for UNR</title>

        <meta name="title" content="UNR Course Grade Distributions" />
        <meta
          name="description"
          content="Get statistics and grade distributions for University of Nevada, Reno courses. Find out how courses compare to others."
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />

        <meta
          property="og:title"
          content="Nevadapath - UNR Grade Distributions"
        />
        <meta property="og:site_name" content="Nevadapath" />
        <meta property="og:url" content="https://www.nevadapath.com" />
        <meta
          property="og:description"
          content="Get statistics and grade distributions for University of Nevada, Reno courses. Find out how courses compare to others."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.nevadapath.com/og-landing.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nevadapath" />
        <meta name="twitter:creator" content="@nevadapath" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header id="hero" className="w-full lg:h-screen">
        <section
          className="container mx-auto my-0.5 flex flex-col items-center md:my-24 md:flex-row"
          role="article"
        >
          <div className="lg:w-1/2 flex w-full flex-col items-start justify-center px-6 pb-24 pt-12">
            <h1 className="my-4 text-3xl font-bold text-gray-700">
              Course Grade Distributions for UNR
            </h1>
            <p className="mb-4 leading-normal text-gray-600">
              Gain insight into the courses offered at UNR by viewing past grade
              distributions and other key statistics. Find out how each course
              compare to others. Use this information to make informed decisions
              when selecting courses and planning your academic journey at UNR.
            </p>
            <Link href="/grades" passHref>
              <Button variant="light" size="lg" role="button">
                See Grades
              </Button>
            </Link>
          </div>

          <div className="lg:w-1/2 w-full text-center lg:py-6">
            <SvgHero role="heroImg" />
          </div>
        </section>
      </header>
    </>
  );
};

export default Home;
