import React, { Component, useContext, useEffect } from "react";
import Head from "next/head";
import Nav from "../components/navbar";
import Notification from "../components/notification";
import Header from "../components/home/header";
import Exchange from "../components/home/exchange";
import Bitcoin from "../components/home/bitcoin";
import GiftCard from "../components/home/giftCard";
import Review from "../components/home/review";
import Footer from "../components/footer";
import { TestimonialContext, BitcoinContext } from "../store/root";
const Index = ({ testimonials, bitcoinRate }) => {
  const context = useContext(TestimonialContext);
  const bitCoinContext = useContext(BitcoinContext);
  useEffect(() => {
    context.getTestimonials(testimonials);
    bitCoinContext.getBitcoinRate(bitcoinRate);
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
export async function getServerSideProps() {
  // Fetch data from external API
  const testimonials = await getTestimonials();
  const bitcoinRate = await getBitcoinRate();
  // Pass data to the page via props
  return { props: { testimonials, bitcoinRate } };
}
export default Index;

const getTestimonials = async () => {
  try {
    //   const res = await axios.get(apiUrl + "/misc/testimonial");
    const res = {
      status: 200,
      data: {
        message: "success",
        data: [
          {
            id: "601deeec700d837dd51cb144",
            name: "Ben Murray",
            title: "Head Boy",
            message: " A good one",
          },
          {
            id: "601def1a700d837dd51cb145",
            name: "Ben Murray Bruce",
            title: "Head Boy",
            message: "Another A good one",
          },
        ],
      },
    };
    if (res.status === 200) {
      return res.data.data;
    }
    return [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getBitcoinRate = async () => {
  try {
    //   const res = await axios.get(apiUrl + "/misc/bitcoin-rates");
    const res = {
      status: 200,
      data: {
        message: "success",
        data: {
          buy: {
            type: "bitcoin-buy",
            usd: "37978.60",
            naira: "382.14",
          },
          sell: {
            type: "bitcoin-sell",
            usd: "37751.40",
            naira: "379.86",
          },
        },
      },
    };
    if (res.status === 200) {
      return res.data.data;
    }
    return [];
  } catch (e) {
    console.log(e);
    return [];
  }
};
