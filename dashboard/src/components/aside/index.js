import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Index.module.css";
import "./Index.css";
export default function index() {
  return (
    <aside id="aside" className={style.aside + " aside"}>
      <ul className={style.overview}>
        <li>
          <NavLink to="/home/overview">
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 0H17V6H9V0ZM9 17V7H17V17H9ZM0 17V11H8V17H0ZM0 10V0H8V10H0ZM1 1V9H7V1H1ZM10 1V5H16V1H10ZM10 8V16H16V8H10ZM1 12V16H7V12H1Z" />
            </svg>

            <span>Overview</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/wallet">
            <svg
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.3535 6.46451H18.0995V3.23246C18.0995 3.06102 18.0314 2.8966 17.9102 2.77538C17.7889 2.65415 17.6245 2.58605 17.4531 2.58605H1.93923C1.76779 2.58605 1.60338 2.51794 1.48215 2.39672C1.36093 2.27549 1.29282 2.11108 1.29282 1.93964C1.29282 1.7682 1.36093 1.60378 1.48215 1.48255C1.60338 1.36133 1.76779 1.29323 1.93923 1.29323H17.1945C17.366 1.29323 17.5304 1.22512 17.6516 1.1039C17.7728 0.98267 17.8409 0.818253 17.8409 0.646815C17.8409 0.475376 17.7728 0.310959 17.6516 0.189733C17.5304 0.0685077 17.366 0.000403782 17.1945 0.000403782H1.93923C1.68965 -0.00474176 1.4415 0.0393354 1.20895 0.130117C0.976406 0.220899 0.764025 0.356607 0.58394 0.529489C0.403855 0.70237 0.259595 0.909038 0.159401 1.13769C0.0592066 1.36633 0.0050416 1.61248 0 1.86207V15.4367C0.000846082 15.7878 0.0709526 16.1353 0.206304 16.4593C0.341656 16.7833 0.539595 17.0775 0.788783 17.3248C1.03797 17.5722 1.33351 17.768 1.65849 17.901C1.98346 18.034 2.33148 18.1016 2.68261 18.0999H17.4531C17.6245 18.0999 17.7889 18.0318 17.9102 17.9106C18.0314 17.7894 18.0995 17.6249 18.0995 17.4535V14.2214H19.3535C19.4351 14.2276 19.5171 14.2171 19.5945 14.1904C19.6719 14.1638 19.743 14.1217 19.8035 14.0666C19.864 14.0115 19.9127 13.9447 19.9464 13.8702C19.9802 13.7957 19.9984 13.715 20 13.6332V7.1691C20.0021 6.99146 19.9364 6.81968 19.8163 6.68877C19.6962 6.55786 19.5307 6.47766 19.3535 6.46451ZM18.7459 12.9286H13.1997C12.5373 12.905 11.9112 12.6195 11.4592 12.1347C11.0071 11.6499 10.7659 11.0055 10.7886 10.343C10.7659 9.68049 11.0071 9.03608 11.4592 8.55128C11.9112 8.06648 12.5373 7.78093 13.1997 7.75733H18.7459V12.9286Z" />
            </svg>

            <span>Wallet</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/bitcoin">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 15.832V17.5C0 18.8789 3.35938 20 7.5 20C11.6406 20 15 18.8789 15 17.5V15.832C13.3867 16.9688 10.4375 17.5 7.5 17.5C4.5625 17.5 1.61328 16.9688 0 15.832ZM12.5 5C16.6406 5 20 3.87891 20 2.5C20 1.12109 16.6406 0 12.5 0C8.35938 0 5 1.12109 5 2.5C5 3.87891 8.35938 5 12.5 5ZM0 11.7344V13.75C0 15.1289 3.35938 16.25 7.5 16.25C11.6406 16.25 15 15.1289 15 13.75V11.7344C13.3867 13.0625 10.4336 13.75 7.5 13.75C4.56641 13.75 1.61328 13.0625 0 11.7344ZM16.25 12.1641C18.4883 11.7305 20 10.9258 20 10V8.33203C19.0938 8.97266 17.7617 9.41016 16.25 9.67969V12.1641ZM7.5 6.25C3.35938 6.25 0 7.64844 0 9.375C0 11.1016 3.35938 12.5 7.5 12.5C11.6406 12.5 15 11.1016 15 9.375C15 7.64844 11.6406 6.25 7.5 6.25ZM16.0664 8.44922C18.4102 8.02734 20 7.19922 20 6.25V4.58203C18.6133 5.5625 16.2305 6.08984 13.7227 6.21484C14.875 6.77344 15.7227 7.52344 16.0664 8.44922Z" />
            </svg>

            <span>Bitcoin</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/gift-cards">
            <svg
              width="22"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 0C0.895431 0 0 0.89543 0 2V16C0 17.1046 0.89543 18 2 18H20C21.1046 18 22 17.1046 22 16V2C22 0.895431 21.1046 0 20 0H2ZM8 8.00041C8 8.53095 8.21076 9.03976 8.58591 9.41491L11.4149 12.2429L11.4399 12.2179L11.4649 12.2429L14.2939 9.41491C14.4797 9.22915 14.627 9.00863 14.7275 8.76593C14.8281 8.52323 14.8798 8.2631 14.8798 8.00041C14.8798 7.73771 14.8281 7.47758 14.7275 7.23488C14.627 6.99218 14.4797 6.77166 14.2939 6.58591C14.1082 6.40015 13.8876 6.2528 13.6449 6.15227C13.4022 6.05174 13.1421 6 12.8794 6C12.6167 6 12.3566 6.05174 12.1139 6.15227C11.8712 6.2528 11.6507 6.40015 11.4649 6.58591L11.4399 6.61191L11.4149 6.58591C11.0398 6.21076 10.5309 6 10.0004 6C9.46986 6 8.96105 6.21076 8.58591 6.58591C8.21076 6.96105 8 7.46986 8 8.00041Z"
              />
            </svg>

            <span>Gift Cards</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/transactions">
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.414 0L10.414 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H1C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H8.414ZM11 6H9V12H14V10H11V6Z" />
            </svg>

            <span>Transactions</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/settings">
            <svg
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.5714 0.000137551L1.42857 0.000137346C0.642857 0.000137337 2.47867e-07 0.642994 2.38498e-07 1.42871L1.70355e-08 20.0001C7.666e-09 20.7859 0.642857 21.4287 1.42857 21.4287L18.5714 21.4287C19.3571 21.4287 20 20.7859 20 20.0001L20 1.42871C20 0.642994 19.3571 0.00013756 18.5714 0.000137551ZM11.4286 14.2859L11.4286 12.8573C11.4286 12.0716 12.0714 11.4287 12.8571 11.4287C13.6429 11.4287 14.2857 12.0716 14.2857 12.8573L14.2857 14.2859L16.4286 14.2859C16.8286 14.2859 17.1429 14.6001 17.1429 15.0001C17.1429 15.4001 16.8286 15.7144 16.4286 15.7144L14.2857 15.7144L14.2857 17.143C14.2857 17.9287 13.6429 18.5716 12.8571 18.5716C12.0714 18.5716 11.4286 17.9287 11.4286 17.143L11.4286 15.7144L3.57143 15.7144C3.17143 15.7144 2.85714 15.4001 2.85714 15.0001C2.85714 14.6001 3.17143 14.2859 3.57143 14.2859L11.4286 14.2859ZM8.57143 7.14299L8.57143 8.57157C8.57143 9.35728 7.92857 10.0001 7.14286 10.0001C6.35714 10.0001 5.71429 9.35728 5.71429 8.57157L5.71429 7.14299L3.57143 7.14299C3.17143 7.14299 2.85714 6.82871 2.85714 6.42871C2.85714 6.02871 3.17143 5.71442 3.57143 5.71442L5.71429 5.71442L5.71429 4.28585C5.71429 3.50014 6.35714 2.85728 7.14286 2.85728C7.92857 2.85728 8.57143 3.50014 8.57143 4.28585L8.57143 5.71442L16.4286 5.71442C16.8286 5.71442 17.1429 6.02871 17.1429 6.42871C17.1429 6.82871 16.8286 7.143 16.4286 7.143L8.57143 7.14299Z" />
            </svg>

            <span>Settings</span>
          </NavLink>
        </li>
      </ul>

      <ul>
        <li className={style.logout}>
          <button
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#logout").style.display = "flex";
            }}
            className={style.link_btn_gold}
          >
            LOGOUT
          </button>
        </li>
      </ul>
    </aside>
  );
}
