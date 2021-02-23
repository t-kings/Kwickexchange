import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import style from "./Index.module.css";
const Index = ({ user, balance, notifications }) => {
  return (
    <nav className={style.nav}>
      <div className={style.main_nav}>
        <ul className={style.balance_bars}>
          <li>
            <div id="bars" className={style.bars}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div id="bars_cross" className={style.bars_cross}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </li>
          <li className={style.balance}>
            <Link to="/home/wallet/bitcoin">
              <span>
                <h1
                  style={{
                    margin: 0,
                    padding: 0,
                    color: "black",
                    fontSize: "16px",
                  }}
                >
                  {balance.fiat.symbol}
                </h1>
                {/* <svg
                  width="13"
                  height="18"
                  viewBox="0 0 13 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10V14H0V16H3V18H5V16H7V18H9V15.949C10.968 15.7 12.5 14.034 12.5 12C12.5 10.68 11.85 9.516 10.86 8.787C11.5901 8.04302 11.9994 7.0424 12 6C12 4.142 10.721 2.589 9 2.142V0H7V2H5V0H3V2H0V4H2V10ZM8.5 14H4V10H8.5C9.603 10 10.5 10.897 10.5 12C10.5 13.103 9.603 14 8.5 14ZM4 4H8C9.103 4 10 4.897 10 6C10 7.103 9.103 8 8 8H4V4Z"
                    fill="#161616"
                  />
                </svg> */}
              </span>
              <p>{balance.bitcoin_in_fiat}</p>
            </Link>
          </li>
          <li className={style.balance}>
            <Link to="/home/wallet/naira">
              <span>
                <svg
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.13721 14.7086H2.84464V2.09829L10.2709 14.7086H12.3281V0H10.6206V12.1577L3.46178 0H1.13721V14.7086Z"
                    fill="#161616"
                  />
                  <rect y="4.63428" width="14" height="2" fill="#161616" />
                  <rect y="8.63428" width="14" height="2" fill="#161616" />
                </svg>
              </span>
              <p>{balance.naira}</p>
            </Link>
          </li>
        </ul>
        <ul className={style.logo}>
          <li>
            <svg
              width="93"
              height="27"
              viewBox="0 0 93 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.0994 12.68L27.6954 11.084L26.6874 10.076C27.8634 9.166 28.5494 7.738 28.5494 5.988V5.876C28.5494 2.768 26.2954 0.85 23.2434 0.85C20.2474 0.85 17.9514 2.894 17.9514 5.946V6.058C17.9514 9.068 19.9674 11.168 23.2014 11.168C23.6494 11.168 24.0694 11.126 24.4754 11.042L26.0994 12.68ZM20.9474 6.044V5.932C20.9474 4.112 21.8294 3.09 23.2434 3.09C24.6574 3.09 25.5534 4.14 25.5534 5.918V6.03C25.5534 7.024 25.3154 7.766 24.8954 8.27L23.9994 7.36L22.3894 8.844C21.4934 8.494 20.9474 7.556 20.9474 6.044ZM36.1421 11.168C38.9001 11.168 40.6081 9.81 40.6081 6.898V0.99H37.7101V6.772C37.7101 8.27 37.3321 8.914 36.1421 8.914C34.9241 8.914 34.5741 8.228 34.5741 6.814V0.99H31.7041V6.94C31.7041 9.74 33.3141 11.168 36.1421 11.168ZM44.3415 11H47.2395V0.99H44.3415V11ZM55.7314 11.168C58.3214 11.168 60.1974 9.824 60.3934 7.234H57.5374C57.3974 8.34 56.6834 8.872 55.6754 8.872C54.3034 8.872 53.5334 7.85 53.5334 6.044V5.932C53.5334 4.112 54.3454 3.104 55.6334 3.104C56.6414 3.104 57.2014 3.664 57.3134 4.686H60.2674C60.0294 2.04 58.2234 0.836 55.6194 0.836C52.6934 0.836 50.5094 2.866 50.5094 5.946V6.058C50.5094 9.124 52.2314 11.168 55.7314 11.168ZM63.4704 11H66.3544V6.814L69.2384 11H72.5564L68.6924 5.638L72.3604 0.99H69.3644L66.3544 4.952V0.99H63.4704V11ZM0.106743 26H7.24674V23.788H2.96274V21.968H6.19674V19.924H2.96274V18.202H7.02274V15.99H0.106743V26ZM9.84101 26H12.795L14.657 22.556L16.519 26H19.795L16.701 20.75L19.389 15.99H16.449L14.909 18.972L13.341 15.99H10.079L12.935 20.848L9.84101 26ZM26.8941 26.168C29.4841 26.168 31.3601 24.824 31.5561 22.234H28.7001C28.5601 23.34 27.8461 23.872 26.8381 23.872C25.4661 23.872 24.6961 22.85 24.6961 21.044V20.932C24.6961 19.112 25.5081 18.104 26.7961 18.104C27.8041 18.104 28.3641 18.664 28.4761 19.686H31.4301C31.1921 17.04 29.3861 15.836 26.7821 15.836C23.8561 15.836 21.6721 17.866 21.6721 20.946V21.058C21.6721 24.124 23.3941 26.168 26.8941 26.168ZM34.6331 26H37.5171V22.052H40.8071V26H43.6771V15.99H40.8071V19.812H37.5171V15.99H34.6331V26ZM46.6477 26H49.3217L49.8537 24.138H53.1717L53.7037 26H56.7417L53.5637 15.99H49.8537L46.6477 26ZM51.5197 18.314L52.6117 22.164H50.4137L51.5197 18.314ZM59.7106 26H62.2306V19.714L65.8846 26H68.6566V15.99H66.1506V21.632L62.9446 15.99H59.7106V26ZM77.1315 26.168C80.3655 26.168 82.0315 24.25 82.0315 21.702V20.47H77.3275V22.472H79.2035C79.1475 23.27 78.6155 23.984 77.2155 23.984C75.4795 23.984 74.8775 22.724 74.8775 21.1V20.988C74.8775 19.182 75.7315 18.09 77.1455 18.09C78.2095 18.09 78.8115 18.58 78.9515 19.518H81.7935C81.5975 16.914 79.4975 15.836 77.1315 15.836C74.1215 15.836 71.8815 17.894 71.8815 20.946V21.058C71.8815 24.054 73.7295 26.168 77.1315 26.168ZM85.253 26H92.393V23.788H88.109V21.968H91.343V19.924H88.109V18.202H92.169V15.99H85.253V26Z"
                fill="black"
              />
            </svg>
          </li>
        </ul>
        <ul className={style.action}>
          <li className={style.nav_dropdown}>
            <div className={style.notification_icon}>
              <svg
                width="17"
                height="20"
                viewBox="0 0 17 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.20513 20C9.33333 20 10.2564 19.0769 10.2564 17.9487H6.15385C6.15385 18.4928 6.36996 19.0145 6.75465 19.3992C7.13934 19.7839 7.66109 20 8.20513 20ZM14.359 13.8462V8.71795C14.359 5.56923 12.6769 2.93333 9.74359 2.2359V1.53846C9.74359 0.68718 9.05641 0 8.20513 0C7.35385 0 6.66667 0.68718 6.66667 1.53846V2.2359C3.72308 2.93333 2.05128 5.55897 2.05128 8.71795V13.8462L0 15.8974V16.9231H16.4103V15.8974L14.359 13.8462Z"
                  fill="black"
                />
              </svg>
              {notifications.length > 0 ? <p>{notifications.length}</p> : null}
            </div>
            {notifications.length > 0 ? (
              <div className={style.nav_dropdown_menu}>
                <ul className={style.notifications_list}>
                  {notifications
                    .slice(
                      0,
                      notifications.length > 4 ? 4 : notifications.length
                    )
                    .map((itm, idx) => (
                      <li key={idx}>
                        <Link to={"/home/notifications/" + itm._id}>
                          <h4>{itm.title}</h4>
                          <p>{itm.message}</p>
                        </Link>
                      </li>
                    ))}
                  <li>
                    <Link to={"/home/notifications"}>See more</Link>
                  </li>
                </ul>
              </div>
            ) : null}
          </li>
          <li className={style.nav_dropdown}>
            <div className={style.account_icons}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 0C4.579 0 0 4.579 0 10C0 15.421 4.579 20 10 20C15.421 20 20 15.421 20 10C20 4.579 15.421 0 10 0ZM10 5C11.727 5 13 6.272 13 8C13 9.728 11.727 11 10 11C8.274 11 7 9.728 7 8C7 6.272 8.274 5 10 5ZM4.894 14.772C5.791 13.452 7.287 12.572 9 12.572H11C12.714 12.572 14.209 13.452 15.106 14.772C13.828 16.14 12.015 17 10 17C7.985 17 6.172 16.14 4.894 14.772Z"
                  fill="black"
                />
              </svg>
              <p>{user.fullname}</p>
              <svg
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L8 8L15 1" stroke="#161616" strokeWidth="2" />
              </svg>
            </div>
            <div className={style.nav_dropdown_menu}>
              <ul className={style.account_drop}>
                <li>
                  <Link to="/home/settings">Settings</Link>
                </li>
                <li>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#logout").style.display = "flex";
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  const { notifications } = state.resources;
  const notificationsList = notifications.filter(
    (itm) => itm.read_status === false
  );
  return {
    ...state.auth,
    ...state.resources,
    notifications: notificationsList,
  };
};
export default connect(mapStateToProps, null)(Index);
