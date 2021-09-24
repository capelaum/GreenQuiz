import { AppProps } from "next/app";
import { QuestionProvider } from "../hooks/useQuestion";

import "../styles/globals.scss";

import { AuthProvider } from "../hooks/useAuth";

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
