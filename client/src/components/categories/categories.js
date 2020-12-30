import React from "react";
import Classes from "./categories.module.css";
export default function Categories({ categories }) {
  const renderCategories = () => {
    if (categories) {
      const listOfCategories = categories.map((category, index) => {
        if (index === 0) {
          return (
            <li className={Classes.category} key={index}>
              {category}
            </li>
          );
        }
        if (index === categories.length - 1) {
          return (
            <li className={Classes.category} key={index}>
              <span className={Classes.chevron}>{`>`}</span>
              <span className={Classes.lastCategory}>{category}</span>
            </li>
          );
        } else {
          return (
            <li className={Classes.category} key={index}>
              <span className={Classes.chevron}>{`>`}</span>
              {category}
            </li>
          );
        }
      });
      return (
        <div className="row">
          <div className={`col-xs-offset-1 col-xs-10 `}>
            <ul className={Classes.resultCategory}>{listOfCategories}</ul>
          </div>
        </div>
      );
    }
    return null;
  };
  return <>{renderCategories()}</>;
}
