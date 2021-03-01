import React, { Component, useContext } from "react";
import { useRouter } from "next/router";
import style from "./Index.module.css";
import { TestimonialContext } from "../../../store/root";
const Index = () => {
  const router = useRouter();
  const testimonialContext = useContext(TestimonialContext);
  return (
    <div>
      <Testimonials router={router} testimonialContext={testimonialContext} />
    </div>
  );
};
export default Index;
class Testimonials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }
  intervalID = 0;
  componentDidMount = () => {
    this.intervalID = setInterval(() => {
      const count = this.props.testimonialContext.testimonials.length;
      const index = Math.floor(Math.random() * count);
      this.setState({
        ...this.state,
        index,
      });
    }, 5000);
  };
  componentWillUnmount = () => {
    clearInterval(this.intervalID);
  };
  render() {
    return (
      <section className={style.header}>
        <div className={style.flier}>
          <svg
            viewBox="0 0 687 313"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.1"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 -6C12.8066 172.315 161.527 313 343.105 313C524.684 313 673.404 172.315 686.211 -6H598.905C586.336 124.206 476.608 226 343.105 226C209.603 226 99.8752 124.206 87.3059 -6H0Z"
              fill="white"
            />
          </svg>
        </div>
        <div className={style.second_flier}>
          <svg
            className={style.second_flier}
            viewBox="0 0 221 523"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.1" filter="url(#filter0_f)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M221.017 17C144.986 22.4606 84.9998 85.8726 84.9998 163.295C84.9998 240.717 144.986 304.129 221.017 309.59L221.017 272.364C165.499 267.005 122.095 220.219 122.095 163.295C122.095 106.371 165.499 59.5853 221.017 54.2259L221.017 17Z"
                fill="white"
              />
            </g>
            <g opacity="0.1" filter="url(#filter1_f)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M238.016 15.595C107.206 24.9899 4.00006 134.09 4.00005 267.295C4.00004 400.5 107.206 509.6 238.016 518.995L238.016 454.948C142.498 445.727 67.8227 365.232 67.8227 267.295C67.8227 169.358 142.498 88.8629 238.016 79.642L238.016 15.595Z"
                fill="white"
              />
            </g>
            <defs>
              <filter
                id="filter0_f"
                x="67.9999"
                y="0"
                width="170.017"
                height="326.59"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="8.5"
                  result="effect1_foregroundBlur"
                />
              </filter>
              <filter
                id="filter1_f"
                x="0"
                y="11.595"
                width="242.016"
                height="511.4"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="2"
                  result="effect1_foregroundBlur"
                />
              </filter>
            </defs>
          </svg>
        </div>

        <div className={style.header_holder}>
          <div className={style.info_holder}>
            <div className={style.hold}>
              {this.props.testimonialContext.testimonials.length > 0 ? (
                this.props.testimonialContext.testimonials.map(
                  (item, index) => (
                    <div
                      key={index}
                      style={{
                        display: this.state.index === index ? "flex" : "none",
                      }}
                      className={style.holder}
                    >
                      <h1>
                        {item.name}
                        <br />
                        <span>{item.title}</span>
                      </h1>
                      <p className={style.subtitle}>{item.message}</p>
                      <div className={style.action_buttons}>
                        <a
                          href="https://dashboardkwickexchange.netlify.app/"
                          className={style.link_btn_gold}
                        >
                          Get Started
                        </a>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className={style.holder}>
                  <div className={style.load}>
                    <div className={style.loader}>Loading...</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
