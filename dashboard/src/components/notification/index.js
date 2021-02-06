import React from "react";
import style from "./Index.module.css";
import { connect } from "react-redux";

const Index = (props) => {
  const { show, message, type, isSuccess } = props;
  return (
    <>
      <section
        className={style.notification + " " + style.notification_success}
        style={{
          display: show === true && isSuccess === true ? "block" : "none",
        }}
      >
        <div>
          <div className={style.heading}>
            <p>{type}</p>
            <h4>Success</h4>
          </div>
          <p className={style.info}>
            {message.length > 50 ? message.substring(0, 50) : message}
          </p>
          <div className={style.lines}></div>
        </div>
      </section>

      <section
        style={{
          display: show === true && isSuccess === false ? "block" : "none",
        }}
        className={style.notification + " " + style.notification_error}
      >
        <div>
          <div className={style.heading}>
            <p>{type}</p>
            <h4>Error</h4>
          </div>
          <p className={style.info}>
            {message.length > 50 ? message.substring(0, 50) : message}
          </p>
          <div className={style.lines}></div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return { ...state.notification };
};
export default connect(mapStateToProps, null)(Index);
