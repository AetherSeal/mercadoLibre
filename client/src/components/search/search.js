import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Classes from "./search.module.css";
import Logo from "../../assets/Logo_ML.png";
import Loupe from "../../assets/ic_Search.png";
import { SEARCH_PLACEHOLDER, SEARCH_ICON_ALT } from "../../utils/text";

export default function Search() {
  const history = useHistory();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/items?search=${searchTerm}`);
  };

  const inputHandler = (e) => {
    setSearchTerm(e.currentTarget.value);
  };
  return (
    <div className={`row ${Classes.bar}`}>
      <form
        className={`col-xs-offset-1 col-xs-10 ${Classes.form}`}
        action="/items"
        method="get"
      >
        <img src={Logo} alt="logo" className={Classes.logo} />

        <div className={Classes.container}>
          <input
            className={Classes.input}
            type="text"
            placeholder={SEARCH_PLACEHOLDER}
            name="search"
            onChange={(e) => {
              inputHandler(e);
            }}
          />
        </div>
        <button className={Classes.button} onClick={(e) => handleSearch(e)}>
          <img src={Loupe} alt={SEARCH_ICON_ALT} />
        </button>
      </form>
    </div>
  );
}
