import React, { useState, useEffect } from "react";
import { BASE_URL } from "../config";
import { useParams, useHistory } from "react-router-dom";
import Details from "../components/details/details";
import Categories from "../components/categories/categories";
import Search from "../components/search/search";
import Loader from "../components/loader/loader";

export default function ItemDetails() {
  const [itemDetails, setItemDetails] = useState(null);
  const [categories, setCategories] = useState(null);
  const [reload, setReload] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchItemDetail = async (id) => {
      try {
        const response = await fetch(`${BASE_URL}/items/${id}`);
        if (response.ok) {
          const data = await response.json();
          setItemDetails(data.item);
          setCategories(data.categories);
          setReload(true);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (id) {
      fetchItemDetail(id);
    } else {
      history.push(`/not-found`);
    }
  }, [id, history]);
  const renderItemDetails = () => {
    if (itemDetails) {
      return (
        <>
          <Search />
          <Categories categories={categories} />
          <Details details={itemDetails} />
        </>
      );
    }
    return <Loader />;
  };

  useEffect(() => {
    if (reload) {
      setReload(false);
    }
  }, [reload]);

  return <div>{renderItemDetails()}</div>;
}
