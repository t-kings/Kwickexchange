import Head from "next/head";
import { bitcoinContext } from "../store/root";
import Nav from "../components/nav";
import Header from "../components/home/header";
import Exchange from "../components/home/exchange";
export default function Home() {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Quick Exchange</title>
        <meta
          name="description"
          content="The most reliable crypto currency exchange platform. Where you have easy access to your money anytime
                    you want it."
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="The most reliable crypto currency exchange platform. Where you have easy access to your money anytime
                    you want it."
        />
        <meta property="og:url" content="" />
        <meta property="og:site_name" content="Quick Exchange" />
        <meta property="og:image" content="" />
        <meta
          name="keywords"
          content="crypto currency, bitcoin, gift cards, Nigeria"
        />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Nav />
      <Header />
      <Exchange />
    </>
  );
}
