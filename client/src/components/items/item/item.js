import React from "react";
import { useHistory } from "react-router-dom";
import Classes from "./item.module.css";
import Shipping from "../../../assets/ic_shipping.png";
import { ITEM_THUMBNAIL_ALT, SHIPPING_ICON_ALT } from "../../../utils/text";
export default function Item({ info }) {
  const history = useHistory();

  const itemClickHandler = (id) => {
    history.push(`/items/${id}`);
  };

  const renderPrice = () => {
    const { price } = info;
    if (price.decimals) {
      return `${price.ammount}.${price.decimals}`;
    }
    return `${price.ammount}`;
  };

  const renderFreeShipping = () => {
    if (info.free_shipping) {
      return (
        <img
          src={Shipping}
          alt={SHIPPING_ICON_ALT}
          className={Classes.shipping}
        />
      );
    }
  };
  return (
    <li
      key={info.id}
      onClick={() => itemClickHandler(info.id)}
      className={`${Classes.container} row`}
    >
      <div className={`col-xs-3 ${Classes.imageContainer}`}>
        <img
          className={Classes.image}
          src={info.picture}
          alt={ITEM_THUMBNAIL_ALT}
          width="180"
          height="180"
        />
      </div>
      <div className={`col-xs-9`}>
        <div className={Classes.item}>
          <h3 className={Classes.price}>
            ${renderPrice()}
            {renderFreeShipping()}
          </h3>
          <div className="row end-xs">
            <h6 className={`${Classes.state} col-xs-3`}>{info.state_name}</h6>
          </div>
          <div className="row">
            <h4 className={`col-xs-6 ${Classes.title}`}>{info.title}</h4>
          </div>
        </div>
      </div>
    </li>
  );
}
