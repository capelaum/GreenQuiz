import { AppProps } from "next/app";
import { QuestionProvider } from "../hooks/useQuestion";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QuestionProvider>
      <Component {...pageProps} />
    </QuestionProvider>
  );
}

export default MyApp;
