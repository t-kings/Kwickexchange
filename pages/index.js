import React, { Component, useContext, useEffect } from "react";
import Head from "next/head";
import Nav from "../components/navbar";
import Header from "../components/home/header";
import Exchange from "../components/home/exchange";
import Bitcoin from "../components/home/bitcoin";
import GiftCard from "../components/home/giftCard";
import Review from "../components/home/review";
import Footer from "../components/footer";
import TestimonialState from "../store/actions/testimonials";
import { TestimonialContext } from "../store/root";
export default class Home extends Component {
  render() {
    return (
      <TestimonialState>
        <Index />
      </TestimonialState>
    );
  }
}
const Index = () => {
  const context = useContext(TestimonialContext);
  useEffect(() => {
    context.getTestimonials();
  }, []);
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
        <meta property="og:title" content="Quick Exchange" />
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
      <Bitcoin />
      <GiftCard />
      <Review />
      <Footer />
    </>
  );
};
