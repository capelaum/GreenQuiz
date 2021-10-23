import { AppProps } from "next/app";
import Router from "next/router";
import Nprogress from "nprogress";
import { ToastContainer } from "react-toastify";

import { QuestionProvider } from "../contexts/questionContext";
import { AuthProvider } from "../contexts/authContext";

import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";

Nprogress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => Nprogress.start());
Router.events.on("routeChangeComplete", () => Nprogress.done());
Router.events.on("routeChangeError", () => Nprogress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QuestionProvider>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </QuestionProvider>
    </AuthProvider>
  );
}

export default MyApp;
