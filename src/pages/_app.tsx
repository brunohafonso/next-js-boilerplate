import { AppProps } from 'next/app';
import Head from 'next/head';
import GlobalStyles from 'styles/global';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>NextJS Boilerplate</title>
        <link rel="shortcut icon" href="/img/icon-512.png" />
        <link rel="apple-touch-icon" href="/img/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#638ecf" />
        <meta
          name="description"
          content="A simple project to be used like base with the config of typescript, styled components and NextJS"
        />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default App;
