import React from "react";
import style from "./Index.module.css";
export default function index() {
  return (
    <div className={style.preloader}>
      <div className={style.load}>
        <div className={style.loader}>Loading...</div>
      </div>
    </div>
  );
}
