"use client";
import { observer } from "mobx-react-lite";
import Store from "@/store";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

type newProductProps = {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};
const AddProduct = () => {
  const store = useContext(Store);
  const [addProduct, setAddProduct] = useState<newProductProps>({
    title: "",
    price: +"",
    description: "",
    image: "",
    category: "",
  });

  const { setRemoveProductModal } = store;

  const handleAddProduct = () => {
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({
        title: addProduct.title,
        price: addProduct.price,
        description: addProduct.description,
        image: addProduct.image,
        category: addProduct.category,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 lg:w-full">
          <form onSubmit={() => handleAddProduct()}>
            <div className="relative transform overflow-hidden rounded-lg bg-white p-8 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-screen lg:w-[50vw]">
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Product Information
                  </h2>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-full">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Title
                      </label>
                      <div className="mt-2">
                        <input
                          required
                          type="text"
                          name="title"
                          id="title"
                          value={addProduct.title}
                          onChange={(e) =>
                            setAddProduct({
                              ...addProduct,
                              title: e.target.value,
                            })
                          }
                          className="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-full">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Price
                      </label>
                      <div className="mt-2">
                        <input
                          required
                          type="number"
                          name="price"
                          id="price"
                          value={addProduct.price}
                          onChange={(e) =>
                            setAddProduct({
                              ...addProduct,
                              price: +e.target.value,
                            })
                          }
                          className="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Description
                      </label>
                      <div className="mt-2">
                        <textarea
                          required
                          id="descriptino"
                          name="descriptino"
                          rows={3}
                          value={addProduct.description}
                          onChange={(e) =>
                            setAddProduct({
                              ...addProduct,
                              description: e.target.value,
                            })
                          }
                          className="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        ></textarea>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        Write the product description.
                      </p>
                    </div>
                    <div className="sm:col-span-full">
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Paste Product Image Link
                      </label>
                      <div className="mt-2">
                        <input
                          required
                          type="text"
                          name="image"
                          id="image"
                          value={addProduct.image}
                          onChange={(e) =>
                            setAddProduct({
                              ...addProduct,
                              image: e.target.value,
                            })
                          }
                          className="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-full">
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Category
                      </label>
                      <div className="mt-2">
                        <input
                          required
                          value={addProduct.category}
                          onChange={(e) =>
                            setAddProduct({
                              ...addProduct,
                              category: e.target.value,
                            })
                          }
                          type="text"
                          name="category"
                          id="category"
                          className="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-lime-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 sm:ml-3 sm:w-auto"
                >
                  Publish Product
                </button>
                <button
                  onClick={setRemoveProductModal}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default observer(AddProduct);
