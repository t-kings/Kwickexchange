import React, { useContext } from "react";
import style from "./Index.module.css";
import { NotificationContext } from "../../store/root";
export default function index() {
  const context = useContext(NotificationContext);
  const { show, message, type, isSuccess } = context;
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
            {message.length > 30 ? message.substring(0, 30) : message}
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
            {message.length > 30 ? message.substring(0, 30) : message}
          </p>
          <div className={style.lines}></div>
        </div>
      </section>
    </>
  );
}
