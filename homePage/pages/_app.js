import "../styles/globals.css";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import TestimonialState from "../store/actions/testimonials";

import NotificationState from "../store/actions/notification";
import BitcoinState from "../store/actions/bitcoin";
//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
function MyApp({ Component, pageProps }) {
  return (
    <NotificationState>
      <BitcoinState>
        <TestimonialState>
          <Component {...pageProps} />;
        </TestimonialState>
      </BitcoinState>
    </NotificationState>
  );
}

export default MyApp;
