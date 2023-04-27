import { type AppType } from "next/app";

import { MantineProvider } from "@mantine/core";
import ContextProvider from "../contexts/AppContext";
import Layout from "../components/layout";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
      }}
    >
      <ContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </MantineProvider>
  );
};

export default MyApp;
