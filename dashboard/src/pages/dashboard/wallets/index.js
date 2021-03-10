import React, { Component } from "react";
import style from "../Index.module.css";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import Bitcoin from "./bitcoin";
import Naira from "./naira";
import Status from "./status";
import { motion } from "framer-motion";

class Index extends Component {
  render() {
    const containerVariants = {
      hidden: {
        opacity: 0.5,
      },
      visible: {
        opacity: 1,
        transition: { delay: 0, duration: 0.5 },
      },
      exit: {
        x: "-100vh",
        transition: { ease: "easeInOut" },
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
          <Route exact path="/home/wallet" component={Home} />
          <Route path="/home/wallet/bitcoin" component={Bitcoin} />
          <Route exact path="/home/wallet/naira" component={Naira} />
          <Route path="/home/wallet/naira/status" component={Status} />
          <Route component={Home} />
        </Switch>
      </motion.main>
    );
  }
}
export default Index;
