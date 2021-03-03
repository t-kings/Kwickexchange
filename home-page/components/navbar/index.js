import Link from "next/link";
import React, { Component } from "react";
import { useRouter } from "next/router";
import style from "./Index.module.css";
const Index = () => {
  const router = useRouter();
  return (
    <div>
      <Nav router={router} />
    </div>
  );
};
export default Index;
class Nav extends Component {
  componentDidMount = () => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        document.querySelector("#mobile_nav").style.background = "black";
        document.querySelector("#web_nav").style.background = "black";
      } else {
        document.querySelector("#mobile_nav").style.background = "none";
        document.querySelector("#web_nav").style.background = "none";
      }
    });
  };
  render() {
    const { router } = this.props;
    return (
      <>
        <nav className={style.nav} id="web_nav">
          <ul className={style.hide_web}>
            <li></li>
          </ul>
          <ul className={style.hide_web}>
            <li className={style.logo}>
              <Link href="/">
                <a>
                  <svg
                    width="134"
                    height="11"
                    viewBox="0 0 134 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.81366 10.44L9.18166 9.072L8.31766 8.208C9.32566 7.428 9.91366 6.204 9.91366 4.704V4.608C9.91366 1.944 7.98166 0.3 5.36566 0.3C2.79766 0.3 0.829657 2.052 0.829657 4.668V4.764C0.829657 7.344 2.55766 9.144 5.32966 9.144C5.71366 9.144 6.07366 9.108 6.42166 9.036L7.81366 10.44ZM3.39766 4.752V4.656C3.39766 3.096 4.15366 2.22 5.36566 2.22C6.57766 2.22 7.34566 3.12 7.34566 4.644V4.74C7.34566 5.592 7.14166 6.228 6.78166 6.66L6.01366 5.88L4.63366 7.152C3.86566 6.852 3.39766 6.048 3.39766 4.752ZM16.4217 9.144C18.7857 9.144 20.2497 7.98 20.2497 5.484V0.42H17.7657V5.376C17.7657 6.66 17.4417 7.212 16.4217 7.212C15.3777 7.212 15.0777 6.624 15.0777 5.412V0.42H12.6177V5.52C12.6177 7.92 13.9977 9.144 16.4217 9.144ZM23.4497 9H25.9337V0.42H23.4497V9ZM33.2125 9.144C35.4325 9.144 37.0405 7.992 37.2085 5.772H34.7605C34.6405 6.72 34.0285 7.176 33.1645 7.176C31.9885 7.176 31.3285 6.3 31.3285 4.752V4.656C31.3285 3.096 32.0245 2.232 33.1285 2.232C33.9925 2.232 34.4725 2.712 34.5685 3.588H37.1005C36.8965 1.32 35.3485 0.288 33.1165 0.288C30.6085 0.288 28.7365 2.028 28.7365 4.668V4.764C28.7365 7.392 30.2125 9.144 33.2125 9.144ZM39.846 9H42.318V5.412L44.79 9H47.634L44.322 4.404L47.466 0.42H44.898L42.318 3.816V0.42H39.846V9ZM54.0402 9H60.1602V7.104H56.4882V5.544H59.2602V3.792H56.4882V2.316H59.9682V0.42H54.0402V9ZM62.3838 9H64.9158L66.5118 6.048L68.1078 9H70.9158L68.2638 4.5L70.5678 0.42H68.0478L66.7278 2.976L65.3838 0.42H62.5878L65.0358 4.584L62.3838 9ZM77.0008 9.144C79.2208 9.144 80.8288 7.992 80.9968 5.772H78.5488C78.4288 6.72 77.8168 7.176 76.9528 7.176C75.7768 7.176 75.1168 6.3 75.1168 4.752V4.656C75.1168 3.096 75.8128 2.232 76.9168 2.232C77.7808 2.232 78.2608 2.712 78.3568 3.588H80.8888C80.6848 1.32 79.1368 0.288 76.9048 0.288C74.3968 0.288 72.5248 2.028 72.5248 4.668V4.764C72.5248 7.392 74.0008 9.144 77.0008 9.144ZM83.6343 9H86.1063V5.616H88.9263V9H91.3863V0.42H88.9263V3.696H86.1063V0.42H83.6343V9ZM93.9324 9H96.2244L96.6804 7.404H99.5244L99.9804 9H102.584L99.8604 0.42H96.6804L93.9324 9ZM98.1084 2.412L99.0444 5.712H97.1604L98.1084 2.412ZM105.129 9H107.289V3.612L110.421 9H112.797V0.42H110.649V5.256L107.901 0.42H105.129V9ZM120.061 9.144C122.833 9.144 124.261 7.5 124.261 5.316V4.26H120.229V5.976H121.837C121.789 6.66 121.333 7.272 120.133 7.272C118.645 7.272 118.129 6.192 118.129 4.8V4.704C118.129 3.156 118.861 2.22 120.073 2.22C120.985 2.22 121.501 2.64 121.621 3.444H124.057C123.889 1.212 122.089 0.288 120.061 0.288C117.481 0.288 115.561 2.052 115.561 4.668V4.764C115.561 7.332 117.145 9.144 120.061 9.144ZM127.023 9H133.143V7.104H129.471V5.544H132.243V3.792H129.471V2.316H132.951V0.42H127.023V9Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </Link>
            </li>
          </ul>
          <ul className={style.hide_mobile}>
            <li>
              <Link href="/about">
                <a className={router.pathname == "/about" ? style.active : ""}>
                  About
                </a>
              </Link>
            </li>
            <li>
              <Link href="/faq">
                <a className={router.pathname == "/faq" ? style.active : ""}>
                  FAQ
                </a>
              </Link>
            </li>
            <li>
              <Link href="/rates">
                <a className={router.pathname == "/rates" ? style.active : ""}>
                  Rates
                </a>
              </Link>
            </li>
          </ul>
          <ul className={style.hide_mobile}>
            <li className={style.logo}>
              <Link href="/">
                <a>
                  <svg
                    viewBox="0 0 93 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26.0994 12.68L27.6954 11.084L26.6874 10.076C27.8634 9.166 28.5494 7.738 28.5494 5.988V5.876C28.5494 2.768 26.2954 0.85 23.2434 0.85C20.2474 0.85 17.9514 2.894 17.9514 5.946V6.058C17.9514 9.068 19.9674 11.168 23.2014 11.168C23.6494 11.168 24.0694 11.126 24.4754 11.042L26.0994 12.68ZM20.9474 6.044V5.932C20.9474 4.112 21.8294 3.09 23.2434 3.09C24.6574 3.09 25.5534 4.14 25.5534 5.918V6.03C25.5534 7.024 25.3154 7.766 24.8954 8.27L23.9994 7.36L22.3894 8.844C21.4934 8.494 20.9474 7.556 20.9474 6.044ZM36.1421 11.168C38.9001 11.168 40.6081 9.81 40.6081 6.898V0.99H37.7101V6.772C37.7101 8.27 37.3321 8.914 36.1421 8.914C34.9241 8.914 34.5741 8.228 34.5741 6.814V0.99H31.7041V6.94C31.7041 9.74 33.3141 11.168 36.1421 11.168ZM44.3415 11H47.2395V0.99H44.3415V11ZM55.7314 11.168C58.3214 11.168 60.1974 9.824 60.3934 7.234H57.5374C57.3974 8.34 56.6834 8.872 55.6754 8.872C54.3034 8.872 53.5334 7.85 53.5334 6.044V5.932C53.5334 4.112 54.3454 3.104 55.6334 3.104C56.6414 3.104 57.2014 3.664 57.3134 4.686H60.2674C60.0294 2.04 58.2234 0.836 55.6194 0.836C52.6934 0.836 50.5094 2.866 50.5094 5.946V6.058C50.5094 9.124 52.2314 11.168 55.7314 11.168ZM63.4704 11H66.3544V6.814L69.2384 11H72.5564L68.6924 5.638L72.3604 0.99H69.3644L66.3544 4.952V0.99H63.4704V11ZM0.106743 26H7.24674V23.788H2.96274V21.968H6.19674V19.924H2.96274V18.202H7.02274V15.99H0.106743V26ZM9.84101 26H12.795L14.657 22.556L16.519 26H19.795L16.701 20.75L19.389 15.99H16.449L14.909 18.972L13.341 15.99H10.079L12.935 20.848L9.84101 26ZM26.8941 26.168C29.4841 26.168 31.3601 24.824 31.5561 22.234H28.7001C28.5601 23.34 27.8461 23.872 26.8381 23.872C25.4661 23.872 24.6961 22.85 24.6961 21.044V20.932C24.6961 19.112 25.5081 18.104 26.7961 18.104C27.8041 18.104 28.3641 18.664 28.4761 19.686H31.4301C31.1921 17.04 29.3861 15.836 26.7821 15.836C23.8561 15.836 21.6721 17.866 21.6721 20.946V21.058C21.6721 24.124 23.3941 26.168 26.8941 26.168ZM34.6331 26H37.5171V22.052H40.8071V26H43.6771V15.99H40.8071V19.812H37.5171V15.99H34.6331V26ZM46.6477 26H49.3217L49.8537 24.138H53.1717L53.7037 26H56.7417L53.5637 15.99H49.8537L46.6477 26ZM51.5197 18.314L52.6117 22.164H50.4137L51.5197 18.314ZM59.7106 26H62.2306V19.714L65.8846 26H68.6566V15.99H66.1506V21.632L62.9446 15.99H59.7106V26ZM77.1315 26.168C80.3655 26.168 82.0315 24.25 82.0315 21.702V20.47H77.3275V22.472H79.2035C79.1475 23.27 78.6155 23.984 77.2155 23.984C75.4795 23.984 74.8775 22.724 74.8775 21.1V20.988C74.8775 19.182 75.7315 18.09 77.1455 18.09C78.2095 18.09 78.8115 18.58 78.9515 19.518H81.7935C81.5975 16.914 79.4975 15.836 77.1315 15.836C74.1215 15.836 71.8815 17.894 71.8815 20.946V21.058C71.8815 24.054 73.7295 26.168 77.1315 26.168ZM85.253 26H92.393V23.788H88.109V21.968H91.343V19.924H88.109V18.202H92.169V15.99H85.253V26Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </Link>
            </li>
          </ul>
          <ul className={style.hide_mobile}>
            <li>
              <a
                target="_blank"
                href="https://dashboardkwickexchange.netlify.app/"
                className={style.signIn}
              >
                Sign In
              </a>
            </li>
            <li>
              <a
                className={style.link_btn}
                target="_blank"
                href="https://dashboardkwickexchange.netlify.app/signup"
              >
                Get Started
              </a>
            </li>
          </ul>
          <ul className={style.hide_web}>
            <li className={style.bars_li}>
              <div
                className={style.bars}
                onClick={() => {
                  const element = document.querySelector("#mobile_nav");
                  if (element) element.style.display = "block";
                }}
              >
                <div></div>
                <div></div>
                <div></div>
              </div>
            </li>
          </ul>
        </nav>

        <nav className={style.mobileNav} id="mobile_nav">
          <div className={style.mobile_nav}>
            <div className={style.holder}>
              <div>
                <ul className={style.mobile_nav_title}>
                  <li>
                    <Link href="/">
                      <a>
                        <svg
                          width="134"
                          height="11"
                          viewBox="0 0 134 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.81366 10.44L9.18166 9.072L8.31766 8.208C9.32566 7.428 9.91366 6.204 9.91366 4.704V4.608C9.91366 1.944 7.98166 0.3 5.36566 0.3C2.79766 0.3 0.829657 2.052 0.829657 4.668V4.764C0.829657 7.344 2.55766 9.144 5.32966 9.144C5.71366 9.144 6.07366 9.108 6.42166 9.036L7.81366 10.44ZM3.39766 4.752V4.656C3.39766 3.096 4.15366 2.22 5.36566 2.22C6.57766 2.22 7.34566 3.12 7.34566 4.644V4.74C7.34566 5.592 7.14166 6.228 6.78166 6.66L6.01366 5.88L4.63366 7.152C3.86566 6.852 3.39766 6.048 3.39766 4.752ZM16.4217 9.144C18.7857 9.144 20.2497 7.98 20.2497 5.484V0.42H17.7657V5.376C17.7657 6.66 17.4417 7.212 16.4217 7.212C15.3777 7.212 15.0777 6.624 15.0777 5.412V0.42H12.6177V5.52C12.6177 7.92 13.9977 9.144 16.4217 9.144ZM23.4497 9H25.9337V0.42H23.4497V9ZM33.2125 9.144C35.4325 9.144 37.0405 7.992 37.2085 5.772H34.7605C34.6405 6.72 34.0285 7.176 33.1645 7.176C31.9885 7.176 31.3285 6.3 31.3285 4.752V4.656C31.3285 3.096 32.0245 2.232 33.1285 2.232C33.9925 2.232 34.4725 2.712 34.5685 3.588H37.1005C36.8965 1.32 35.3485 0.288 33.1165 0.288C30.6085 0.288 28.7365 2.028 28.7365 4.668V4.764C28.7365 7.392 30.2125 9.144 33.2125 9.144ZM39.846 9H42.318V5.412L44.79 9H47.634L44.322 4.404L47.466 0.42H44.898L42.318 3.816V0.42H39.846V9ZM54.0402 9H60.1602V7.104H56.4882V5.544H59.2602V3.792H56.4882V2.316H59.9682V0.42H54.0402V9ZM62.3838 9H64.9158L66.5118 6.048L68.1078 9H70.9158L68.2638 4.5L70.5678 0.42H68.0478L66.7278 2.976L65.3838 0.42H62.5878L65.0358 4.584L62.3838 9ZM77.0008 9.144C79.2208 9.144 80.8288 7.992 80.9968 5.772H78.5488C78.4288 6.72 77.8168 7.176 76.9528 7.176C75.7768 7.176 75.1168 6.3 75.1168 4.752V4.656C75.1168 3.096 75.8128 2.232 76.9168 2.232C77.7808 2.232 78.2608 2.712 78.3568 3.588H80.8888C80.6848 1.32 79.1368 0.288 76.9048 0.288C74.3968 0.288 72.5248 2.028 72.5248 4.668V4.764C72.5248 7.392 74.0008 9.144 77.0008 9.144ZM83.6343 9H86.1063V5.616H88.9263V9H91.3863V0.42H88.9263V3.696H86.1063V0.42H83.6343V9ZM93.9324 9H96.2244L96.6804 7.404H99.5244L99.9804 9H102.584L99.8604 0.42H96.6804L93.9324 9ZM98.1084 2.412L99.0444 5.712H97.1604L98.1084 2.412ZM105.129 9H107.289V3.612L110.421 9H112.797V0.42H110.649V5.256L107.901 0.42H105.129V9ZM120.061 9.144C122.833 9.144 124.261 7.5 124.261 5.316V4.26H120.229V5.976H121.837C121.789 6.66 121.333 7.272 120.133 7.272C118.645 7.272 118.129 6.192 118.129 4.8V4.704C118.129 3.156 118.861 2.22 120.073 2.22C120.985 2.22 121.501 2.64 121.621 3.444H124.057C123.889 1.212 122.089 0.288 120.061 0.288C117.481 0.288 115.561 2.052 115.561 4.668V4.764C115.561 7.332 117.145 9.144 120.061 9.144ZM127.023 9H133.143V7.104H129.471V5.544H132.243V3.792H129.471V2.316H132.951V0.42H127.023V9Z"
                            fill="black"
                          />
                        </svg>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <div
                      onClick={() => {
                        const element = document.querySelector("#mobile_nav");
                        if (element) element.style.display = "none";
                      }}
                      className={style.bars_cross}
                    >
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <ul className={style.mobile_nav_title}>
                  <li>
                    <Link href="/about">
                      <a
                        className={
                          router.pathname == "/about" ? style.active : ""
                        }
                      >
                        About
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <ul className={style.mobile_nav_title}>
                  <li>
                    <Link href="/rates">
                      <a
                        className={
                          router.pathname == "/rates" ? style.active : ""
                        }
                      >
                        Rates
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <ul className={style.mobile_nav_title}>
                  <li>
                    <Link href="/#products">
                      <a
                        className={
                          router.pathname == "/products" ? style.active : ""
                        }
                      >
                        Products
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <ul className={style.mobile_nav_title}>
                  <li>
                    <Link href="/faq">
                      <a
                        className={
                          router.pathname == "/faq" ? style.active : ""
                        }
                      >
                        FAQ
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <ul className={style.mobile_nav_title_bottom}>
                  <li>
                    <a
                      target="_blank"
                      href="https://dashboardkwickexchange.netlify.app/"
                    >
                      Sign In
                    </a>
                  </li>
                  <li>
                    <a
                      className={style.link_btn_black}
                      target="_blank"
                      href="https://dashboardkwickexchange.netlify.app/signup"
                    >
                      Get Started
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
}
