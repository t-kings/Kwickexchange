import React, { Component } from "react";
import { useRouter } from "next/router";
import style from "./Index.module.css";
const Index = () => {
  const router = useRouter();
  return (
    <div>
      <Bitcoin router={router} />
    </div>
  );
};
export default Index;
class Bitcoin extends Component {
  render() {
    return (
      <section className={style.header}>
        <div className={style.header_holder}>
          <div className={style.animated_payment}>
            <img src="/images/image.png" alt="animated bitcoin payment" />
          </div>
          <div className={style.info_holder}>
            <h1>Sell Bitcoins</h1>
            <p className={style.subtitle}>
              Our APIs allow you to reach out to your exact target audience, and
              facilitate lorem ipsum
            </p>
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
