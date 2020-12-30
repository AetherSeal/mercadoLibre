import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { useHistory } from "react-router-dom";
import ItemsList from "../components/items/items";
import Categories from "../components/categories/categories";
import Search from "../components/search/search";
import Loader from "../components/loader/loader";

export default function Items({ location }) {
  const history = useHistory();
  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchItems = async (query) => {
      try {
        const response = await fetch(`${BASE_URL}/items?q=${query}`);
        if (response.ok) {
          const data = await response.json();
          setItems(data.items);

          const listOfCategories = data.categories.map((categorie) => {
            return categorie.name;
          });
          setCategories(listOfCategories);
          setReload(true);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const urlSearchParams = new URLSearchParams(location.search);
    const query = urlSearchParams.get("search");

    if (query) {
      fetchItems(query);
    } else {
      history.push(`/not-found`);
    }
  }, [location, history]);

  useEffect(() => {
    if (reload) {
      setReload(false);
    }
  }, [reload]);

  const renderItems = () => {
    if (items) {
      return (
        <>
          <Search />
          <Categories categories={categories} />
          <ItemsList list={items}></ItemsList>
        </>
      );
    }
    return <Loader />;
  };
  return <div>{renderItems()}</div>;
}
