import React from "react";
import style from "./Index.module.css";
export default function index() {
  return (
    <section id="logout" className={style.modal}>
      <div className={style.modal_item + " " + style.card}>
        <div className={style.prompt}>
          <div className={style.top}>
            <h3>Logout?</h3>
          </div>
          <p>Ensure you complete all transactions before leaving</p>
          <div className={style.actions}>
            <button
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#logout").style.display = "none";
              }}
              className={style.button + " " + style.grey}
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#logout").style.display = "none";
              }}
              className={style.button + " " + style.red}
            >
              Leave
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
