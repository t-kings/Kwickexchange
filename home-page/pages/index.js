import React, { useContext, useEffect } from "react";
import Head from "next/head";
import Nav from "../components/navbar";
import Notification from "../components/notification";
import Header from "../components/home/header";
import Exchange from "../components/home/exchange";
import Bitcoin from "../components/home/bitcoin";
import GiftCard from "../components/home/giftCard";
import Review from "../components/home/review";
import Footer from "../components/footer";
import axios from "axios";
import {
  TestimonialContext,
  BitcoinContext,
  apiUrl,
  GiftCardContext,
} from "../store/root";
const Index = ({ testimonials, bitcoinRate, giftCardRate }) => {
  const testimonialContext = useContext(TestimonialContext);
  const bitCoinContext = useContext(BitcoinContext);
  const giftCardContext = useContext(GiftCardContext);
  useEffect(() => {
    testimonialContext.getTestimonials(testimonials);
    bitCoinContext.getBitcoinRate(bitcoinRate);
    giftCardContext.getGiftCardRate(giftCardRate);
  }, []);
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Kwick Xchange</title>
        <meta
          name="description"
          content="The most reliable crypto currency exchange platform. Where you have easy access to your money anytime
                    you want it."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Kwick Xchange" />
        <meta property="og:url" content="" />
        <meta property="og:site_name" content="Kwick Xchange" />
        <meta property="og:image" content="" />
        <meta
          name="keywords"
          content="crypto currency, bitcoin, gift cards, Nigeria"
        />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Nav />
      <Notification />
      <Header />
      <Exchange />
      <Bitcoin />
      <GiftCard />
      <Review />
      <Footer />
    </>
  );
};
export default Index;
export async function getServerSideProps() {
  const testimonials = await getTestimonials();
  const bitcoinRate = await getBitcoinRate();
  const giftCardRate = await getGiftCardRate();
  return { props: { testimonials, bitcoinRate, giftCardRate } };
}

const getTestimonials = async () => {
  try {
    const res = await axios.get(apiUrl + "/misc/testimonial");
    if (res.status === 200) {
      return res.data.data;
    }
    return [];
  } catch (e) {
    return [];
  }
};

const getBitcoinRate = async () => {
  try {
    const res = await axios.get(apiUrl + "/misc/bitcoin-rates");
    if (res.status === 200) {
      return res.data.data;
    }
    return [];
  } catch (e) {
    return [];
  }
};

const getGiftCardRate = async () => {
  try {
    const res = await axios.get(apiUrl + "/misc/giftCard-rates");
    if (res.status === 200) {
      return res.data.data;
    }
    return [];
  } catch (e) {
    console.log(e.response.status);
    return [];
  }
};
