import React, { Component } from "react";
import style from "../Index.module.css";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import Status from "./status";
import Summary from "./summary";
import { motion } from "framer-motion";
import GiftCard from "./[id]";
class Index extends Component {
  render() {
    const containerVariants = {
      hidden: {
        x: "20vw",
        opacity: 0.5,
      },
      visible: {
        x: "0vh",
        opacity: 1,
        transition: { delay: 0, duration: 0.3 },
      },
      exit: {
        opacity: 0,
        transition: { ease: "easeInOut", duration: 0.15 },
      },
    };
    return (
      <motion.main
        className={style.main_body}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Switch>
          <Route exact path="/home/gift-cards" component={Home} />
          {/* <Route path="/home/gift-cards/status" component={Status} /> */}
          <Route exact path="/home/gift-cards/:id" component={GiftCard} />
          <Route path="/home/gift-cards/:id/summary" component={Summary} />
          <Route path="/home/gift-cards/:id/status" component={Status} />
          <Route component={Home} />
        </Switch>
      </motion.main>
    );
  }
}
export default Index;
