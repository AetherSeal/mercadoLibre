import React from "react";
import Classes from "./details.module.css";
import Shipping from "../../assets/ic_shipping.png";
import {
  ITEM_DETAIL_QUANTITY_UNIT,
  ITEM_DETAIL_BUY_BUTTON,
  ITEM_DETAIL_DESCRIPTION_TITLE,
} from "../../utils/text";

export default function Details({ details }) {
  const freeShipping = details.free_shipping ? (
    <img src={Shipping} className="" alt="" />
  ) : null;

  const renderCondition = () => {
    const { condition } = details;
    const soldQuantity = details.sold_quantity;
    if (soldQuantity > 0) {
      return (
        <>
          <span className={`${Classes.condition}`}>{condition}</span>
          <span className={`${Classes.condition}`}>
            - {soldQuantity} {ITEM_DETAIL_QUANTITY_UNIT}
          </span>
        </>
      );
    }
    return <span className={`${Classes.condition}`}>{condition}</span>;
  };

  const renderStatus = () => {
    const { title, price } = details;
    return (
      <>
        <div className={`${Classes.status}`}>{renderCondition()}</div>
        <div className={`${Classes.titleData}`}>{title}</div>
        <div>
          <div className={`${Classes.priceData}`}>
            $ {price.ammount}
            <sup className={`${Classes.detailSup}`}>
              {price.decimals ? price.decimals : "00"}
            </sup>
            {freeShipping}
          </div>
        </div>
      </>
    );
  };
  return (
    <div className={`row`}>
      <div className={`col-xs-offset-1 col-xs-10 ${Classes.container}`}>
        <div className={`row ${Classes.preview}`}>
          <div className={`col-xs-8 ${Classes.imageContainer}`}>
            <img className={`${Classes.image}`} src={details.picture} alt="" />
          </div>
          <div className={`col-xs-4`}>
            <div className={Classes.statusContainer}>
              {renderStatus()}
              <button className={`${Classes.button}`}>
                {ITEM_DETAIL_BUY_BUTTON}
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className={`col-xs-12`}>
            <div className={Classes.description}>
              <div className={Classes.descriptionTitle}>
                {ITEM_DETAIL_DESCRIPTION_TITLE}
              </div>
              <div className={Classes.descriptionText}>
                {details.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
