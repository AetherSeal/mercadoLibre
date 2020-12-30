import fetch from "node-fetch";
import { noItems, authorName, authorLastName } from "../utils/text.js";
import {
  URL_ITEM_DETAILS,
  URL_ITEMS_SEARCH,
  URL_CATEGORY_DETAILS,
} from "../config.js";

const getFullItemFiltered = (data) => {
  return {
    id: data.id,
    title: data.title,
    price: getPrice(data.price.toString(), data.currency_id),
    picture: data.pictures[0].url,
    condition: data.condition,
    free_shipping: data.shipping.free_shipping,
    sold_quantity: data.sold_quantity,
  };
};

const getListOfItemsFiltered = (results) => {
  return results.map((element) => {
    return {
      id: element.id,
      title: element.title,
      price: getPrice(element.price.toString(), element.currency_id),
      state_name: element.address.state_name,
      picture: element.thumbnail,
      condition: element.condition,
      free_shipping: element.shipping.free_shipping,
    };
  });
};

const getAuthor = () => {
  return {
    name: authorName,
    lastname: authorLastName,
  };
};

const getPrice = (price, currency) => {
  const priceObj = {
    currency: currency,
    ammount: price.split(".", 1)[0],
    decimals: price.split(".")[1],
  };
  return priceObj;
};

const fetchCategories = async (categoryId) => {
  console.log(categoryId);
  if (categoryId) {
    try {
      const response = await fetch(`${URL_CATEGORY_DETAILS}${categoryId}`);
      if (response.ok) {
        const data = await response.json();

        return data.path_from_root.map((element) => {
          return element.name;
        });
      } else {
        console.log(`HTTP-Error: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const fetchDescription = async (itemId) => {
  try {
    const response = await fetch(`${URL_ITEM_DETAILS}${itemId}/description`);
    if (response.ok) {
      const data = await response.json();
      return data.plain_text;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchItems = async (query, limit = 4) => {
  try {
    const response = await fetch(
      `${URL_ITEMS_SEARCH}q=${query}&limit=${limit}`
    );
    console.log(`--------------------------------------------------------`);
    console.log(`${URL_ITEMS_SEARCH}q=${query}&limit=${limit}`);
    console.log(`--------------------------------------------------------`);
    if (response.ok) {
      const data = await response.json();
      const items = getListOfItemsFiltered(data.results);
      if (items.length <= 0) {
        return {
          message: noItems,
          status: "",
        };
      }
      const categories = data.filters[0].values[0].path_from_root;
      const author = getAuthor();
      console.log(`--------------------------------------------------------`);
      console.log(`sucessful request`);
      console.log(`--------------------------------------------------------`);
      return {
        author: author,
        categories: categories,
        items: items,
      };
    }
  } catch (error) {
    console.log(error);
    console.log(`--------------------------------------------------------`);
    console.log(`unsucessful request`);
    console.log(`--------------------------------------------------------`);
  }
};

export const fetchItemDetails = async (itemId) => {
  try {
    const response = await fetch(`${URL_ITEM_DETAILS}${itemId}`);
    console.log(`--------------------------------------------------------`);
    console.log(`${URL_ITEM_DETAILS}${itemId}`);
    console.log(`--------------------------------------------------------`);
    if (response.ok) {
      const data = await response.json();
      const item = getFullItemFiltered(data);
      const description = await fetchDescription(data.id);
      const author = getAuthor();
      const categories = await fetchCategories(data.category_id);
      console.log(`--------------------------------------------------------`);
      console.log(`sucessful request`);
      console.log(`--------------------------------------------------------`);
      return {
        author: author,
        item: { ...item, description: description },
        categories: categories,
      };
    }
  } catch (error) {
    console.log(error);
    console.log(`--------------------------------------------------------`);
    console.log(`unsucessful request`);
    console.log(`--------------------------------------------------------`);
  }
};
