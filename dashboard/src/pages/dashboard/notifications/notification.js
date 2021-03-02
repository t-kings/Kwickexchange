import React, { Component } from "react";
import transStyle from "./Index.module.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { markNotification } from "../../../store/actions/auth";
class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTab: 1,
    };
  }
  componentDidMount = () => {
    const { markNotification, notification } = this.props;
    if (notification.read_status === false) {
      markNotification(this.props.match.params.id);
    }
  };
  render() {
    const { isAuthenticated, notification } = this.props;
    if (!isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: "/",
            redirect_to: "/home/notifications/" + this.props.match.params.id,
          }}
        />
      );
    }
    return (
      <section className={transStyle.home}>
        <Link className={transStyle.back} to="/home/notifications">
          <span>
            <svg
              width="12"
              height="20"
              viewBox="0 0 12 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 1L2 10L11 19"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <h1 className={transStyle.title}>NOTIFICATIONS</h1>
        </Link>
        <div className={transStyle.summary}>
          <div className={transStyle.card}>
            <div className={transStyle.cardTop}>
              <h2>{notification.title}</h2>
            </div>
            <div className={transStyle.cardBody}>
              <ul>
                <li>
                  <p>{notification.message}</p>
                </li>
                {/* <li>
                  <p>Date</p>
                  <h6>27th Jan. 2021</h6>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { notifications } = state.resources;
  const notification = notifications.find(
    (itm) => itm._id === props.match.params.id
  );
  return { ...state.auth, notification };
};
const mapDispatchToProps = (dispatch) => {
  return {
    markNotification: (id) => dispatch(markNotification(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
