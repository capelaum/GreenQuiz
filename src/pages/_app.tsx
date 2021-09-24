import { AppProps } from "next/app";
import Router from "next/router";
import Nprogress from "nprogress";

import { QuestionProvider } from "../contexts/questionContext";
import { AuthProvider } from "../contexts/authContext";

import "../styles/globals.scss";

Nprogress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => Nprogress.start());
Router.events.on("routeChangeComplete", () => Nprogress.done());
Router.events.on("routeChangeError", () => Nprogress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QuestionProvider>
        <Component {...pageProps} />
      </QuestionProvider>
    </AuthProvider>
  );
}

export default MyApp;
