import React from "react";
import Classes from "./loader.module.css";

export default function Loader() {
  return (
    <div className={Classes.loaderContainer}>
      <div class={Classes.loader}>Loading...</div>;
    </div>
  );
}
