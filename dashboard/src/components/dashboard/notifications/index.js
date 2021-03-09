import React, { Component } from "react";
import style from "./Index.module.css";
import { connect } from "react-redux";
import { markNotification } from "../../../store/actions/auth";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const { markNotification, itm } = this.props;
    if (itm.read_status === false) {
      markNotification(itm._id);
    }
  };
  render() {
    const { itm } = this.props;
    return (
      <section
        id="notificationSummary"
        onClick={(e) => {
          if (e.target == document.querySelector("#notificationSummary")) {
            document.querySelector("#notificationSummary").style.display =
              "none";
          }
        }}
        className={style.modal}
      >
        <div className={style.modal_item + " " + style.card}>
          <div className={style.prompt}>
            <div className={style.top}>
              <h3>Notification</h3>
            </div>
            <div className={style.box_}>
              <p>{itm.title}</p>
              <p>{itm.message}</p>
            </div>
            <div className={style.actions}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#notificationSummary").style.display =
                    "none";
                }}
                className={style.button + " " + style.grey}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  return { ...state.auth, ...state.resources };
};
const mapDispatchToProps = (dispatch) => {
  return {
    markNotification: (id) => dispatch(markNotification(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
