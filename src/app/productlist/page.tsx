"use client";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Store from "@/store";
import { CategoryProps } from "@/store";
import AddProduct from "../components/AddProduct";

const ProductList = () => {
  const store = useContext(Store);
  const { setAddProductModal, addProductModal } = store;
  const [list, setList] = useState<CategoryProps[]>([]);
  const [filter, setFilter] = useState({
    category: "",
    price: "",
  });
  const getAllProducts = useMemo(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      });
  }, []);

  useEffect(() => {
    getAllProducts;
  }, []);

  const filteredList = useMemo(() => {
    let filteredData = list;

    if (filter.category) {
      filteredData = filteredData.filter(
        (item) => item.category === filter.category
      );
    }

    if (filter.price) {
      filteredData = filteredData.filter(
        (item) => item.price <= parseFloat(filter.price)
      );
    }

    return filteredData;
  }, [list, filter]);
  return (
    <div className="flex mt-4">
      <div className=" w-screen py-2  sm:px-6 lg:px-8">
        <div className="flex justify-around item-center text-white">
          <div className="flex items-center ">
            <h3 className="px-8">Filter by Category:</h3>
            <select
              value={filter.category}
              onChange={(e) =>
                setFilter({ ...filter, category: e.target.value })
              }
              className="text-black p-2"
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="men's clothing">Men&apos;s Clothing</option>
              <option value="women's clothing">Women&apos;s Clothing</option>
              <option value="jewelery">Jewelery</option>
            </select>
          </div>
          <div className="flex items-center ">
            <h3 className="px-8">Filter by Price:</h3>
            <input
              type="number"
              className="text-black p-2"
              value={filter.price}
              onChange={(e) => setFilter({ ...filter, price: e.target.value })}
              placeholder="Enter max price"
            />
          </div>
          <button
            className="p-4 bg-gray-800 rounded-md hover:bg-gray-700"
            onClick={setAddProductModal}
          >
            Add New Product
          </button>
        </div>
        <table className="w-full text-left text-sm font-light mt-4">
          <thead className="w-full border-b bg-white font-medium dark:border-neutral-500 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-4">
                #
              </th>
              <th scope="col" className="px-6 py-4">
                Title
              </th>
              <th scope="col" className="px-6 py-4">
                Price
              </th>
              <th scope="col" className="px-6 py-4">
                Category
              </th>
              <th scope="col" className="px-6 py-4">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-gray-600"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {item.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{item.title}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    $ {item.price}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {item.category}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <button className="bg-gray-800 p-4 rounded-md hover:bg-gray-700">
                      Edit Product
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {addProductModal && <AddProduct />}
    </div>
  );
};

export default observer(ProductList);
