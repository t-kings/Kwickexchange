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
                <svg
                  width="34"
                  height="42"
                  viewBox="0 0 34 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_dd)">
                    <circle cx="17" cy="21" r="10" fill="white" />
                  </g>
                  <path
                    d="M13 21.75L15.1818 24L21 18"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <filter
                      id="filter0_dd"
                      x="0"
                      y="0"
                      width="34"
                      height="42"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      />
                      <feMorphology
                        radius="2"
                        operator="dilate"
                        in="SourceAlpha"
                        result="effect1_dropShadow"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="2.5" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      />
                      <feMorphology
                        radius="2"
                        operator="dilate"
                        in="SourceAlpha"
                        result="effect2_dropShadow"
                      />
                      <feOffset dy="-4" />
                      <feGaussianBlur stdDeviation="2.5" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.308333 0 0 0 0 0.308333 0 0 0 0 0.308333 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="effect1_dropShadow"
                        result="effect2_dropShadow"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect2_dropShadow"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <p>Automation with just a single click</p>
              </li>
              <li>
                <svg
                  width="34"
                  height="42"
                  viewBox="0 0 34 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_dd)">
                    <circle cx="17" cy="21" r="10" fill="white" />
                  </g>
                  <path
                    d="M13 21.75L15.1818 24L21 18"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <filter
                      id="filter0_dd"
                      x="0"
                      y="0"
                      width="34"
                      height="42"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      />
                      <feMorphology
                        radius="2"
                        operator="dilate"
                        in="SourceAlpha"
                        result="effect1_dropShadow"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="2.5" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      />
                      <feMorphology
                        radius="2"
                        operator="dilate"
                        in="SourceAlpha"
                        result="effect2_dropShadow"
                      />
                      <feOffset dy="-4" />
                      <feGaussianBlur stdDeviation="2.5" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.308333 0 0 0 0 0.308333 0 0 0 0 0.308333 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="effect1_dropShadow"
                        result="effect2_dropShadow"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect2_dropShadow"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <p>Generate a solid market base from our made algorithms</p>
              </li>
              <li>
                <svg
                  width="34"
                  height="42"
                  viewBox="0 0 34 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_dd)">
                    <circle cx="17" cy="21" r="10" fill="white" />
                  </g>
                  <path
                    d="M13 21.75L15.1818 24L21 18"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <filter
                      id="filter0_dd"
                      x="0"
                      y="0"
                      width="34"
                      height="42"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      />
                      <feMorphology
                        radius="2"
                        operator="dilate"
                        in="SourceAlpha"
                        result="effect1_dropShadow"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="2.5" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      />
                      <feMorphology
                        radius="2"
                        operator="dilate"
                        in="SourceAlpha"
                        result="effect2_dropShadow"
                      />
                      <feOffset dy="-4" />
                      <feGaussianBlur stdDeviation="2.5" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.308333 0 0 0 0 0.308333 0 0 0 0 0.308333 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="effect1_dropShadow"
                        result="effect2_dropShadow"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect2_dropShadow"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <p>Effective and simple to use</p>
              </li>
              <li>
                <svg
                  width="34"
                  height="42"
                  viewBox="0 0 34 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_dd)">
                    <circle cx="17" cy="21" r="10" fill="white" />
                  </g>
                  <path
                    d="M13 21.75L15.1818 24L21 18"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <filter
                      id="filter0_dd"
                      x="0"
                      y="0"
                      width="34"
                      height="42"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      />
                      <feMorphology
                        radius="2"
                        operator="dilate"
                        in="SourceAlpha"
                        result="effect1_dropShadow"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="2.5" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      />
                      <feMorphology
                        radius="2"
                        operator="dilate"
                        in="SourceAlpha"
                        result="effect2_dropShadow"
                      />
                      <feOffset dy="-4" />
                      <feGaussianBlur stdDeviation="2.5" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.308333 0 0 0 0 0.308333 0 0 0 0 0.308333 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="effect1_dropShadow"
                        result="effect2_dropShadow"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect2_dropShadow"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
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
