import React, { useState, useEffect } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Nprogress from "nprogress";

import { LoadingScreen } from "../components/LoadingScreen";

import { QuestionProvider } from "../hooks/useQuestion";
import { AuthProvider } from "../hooks/useAuth";

import "../styles/globals.scss";

Nprogress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }: AppProps) {
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleStart = () => {
    setPageLoading(true);
    Nprogress.start();
  };

  const handleComplete = () => {
    Nprogress.done();
    setPageLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 2000);

    router.events.on("routeChangeStart", () => handleStart);
    router.events.on("routeChangeComplete", () => handleComplete);
    router.events.on("routeChangeError", () => handleComplete);
  }, [router]);

  return (
    <AuthProvider>
      <QuestionProvider>
        {pageLoading ? <LoadingScreen /> : <Component {...pageProps} />}
      </QuestionProvider>
    </AuthProvider>
  );
}

export default MyApp;
