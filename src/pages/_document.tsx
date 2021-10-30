import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;700&display=swap"
            rel="stylesheet"
          />
          <meta
            name="description"
            content="♻ Green Quiz - O quiz sustentável!"
          />
          <meta property="og:title" content="Green Quiz" />
          <meta property="og:type" content="web app" />
          <meta property="og:image" content="leaf.png" />
          <meta property="og:url" content="https://green-quiz.vercel.app" />
          <meta
            property="og:description"
            content="♻ Green Quiz - O quiz sustentável!"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
