import React from "react";
import Item from "../items/item/item";
import Classes from "./items.module.css";

export default function Items({ list }) {
  const renderItems = () => {
    return list.map((data, index) => {
      return (
        <>
          <Item info={data} key={index}></Item>
          {list.length - 1 !== index ? (
            <div key={`${index}-split`} className={Classes.split} />
          ) : null}
        </>
      );
    });
  };
  return (
    <div className={`row`}>
      <ul className={`col-xs-offset-1 col-xs-10 ${Classes.items}`}>
        {renderItems()}
      </ul>
    </div>
  );
}
