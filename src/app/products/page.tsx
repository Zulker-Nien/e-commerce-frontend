"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import StoreNavigation from "../components/StoreNavigation";
import Product from "../components/product";
import Store from "@/store";
import { observer } from "mobx-react-lite";

export type CategoryProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
  totalPrice: number;
};
const Products = () => {
  const store = useContext(Store);
  const {
    setProductIsInactive,
    setProductIsActive,
    productIsActive,
    setProductData,
    productData,
    setProductItems,
    categoryIsActive,
    handleProductClicked,
    setIsNotLoading,
  } = store;

  const getAllProducts = useMemo(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProductData(data);
      });
  }, []);

  useEffect(() => {
    getAllProducts;
  }, []);

  useEffect(() => {
    if (categoryIsActive) {
      fetch(`https://fakestoreapi.com/products/category/${categoryIsActive}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch category items");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setProductData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [categoryIsActive]);

  useEffect(() => {
    if (productData) {
      fetch(`https://fakestoreapi.com/products/${productData}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch product");
          }
          return res.json();
        })
        .then((data) => {
          if (!data.rating || !data.rating.rate || !data.rating.count) {
            // Handle the case where the 'rating' object is missing or incomplete
            console.error(
              "Product data is missing 'rating' information:",
              data
            );
            setIsNotLoading();
            return;
          }

          setProductItems(data);
          setProductIsActive();
          console.log(data);
          setIsNotLoading();
        })
        .catch((error) => {
          console.error(error);
          setIsNotLoading();
        });
    }
  }, [productData]);

  return (
    <div id="allProducts">
      <StoreNavigation
        categoryItems={productData}
        handleProductClicked={handleProductClicked}
        handleProductClose={setProductIsInactive}
        categoryIsActive={categoryIsActive}
      />
      {productIsActive && <Product />}
    </div>
  );
};

export default observer(Products);
