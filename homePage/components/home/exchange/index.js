import React, { Component } from "react";
import { useRouter } from "next/router";
import style from "./Index.module.css";
const Index = () => {
  const router = useRouter();
  return (
    <div>
      <Exchange router={router} />
    </div>
  );
};
export default Index;
class Exchange extends Component {
  render() {
    return (
      <section className={style.header}>
        <div className={style.header_holder}>
          <div className={style.animated_payment}>
            <img src="./images/dashboard.svg" alt="animated bitcoin payment" />
          </div>
          <div className={style.info_holder}>
            <h1>
              Exchange all your <br /> crypto currency with on click
            </h1>
            <ul>
              <li>
                <img src="/images/bullets.svg" alt="bullet" />
                <p>Automation with just a single click</p>
              </li>
              <li>
                <img src="/images/bullets.svg" alt="bullet" />
                <p>Generate a solid market base from our made algorithms</p>
              </li>
              <li>
                <img src="/images/bullets.svg" alt="bullet" />
                <p>Effective and simple to use</p>
              </li>
              <li>
                <img src="/images/bullets.svg" alt="bullet" />
                <p>Scalable model of gathering and dispensing information</p>
              </li>
            </ul>
            <div className={style.action_buttons}>
              <a href="/contact/speak" className={style.link_btn_gold}>
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
