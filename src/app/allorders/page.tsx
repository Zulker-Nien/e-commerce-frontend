"use client";
import { observer } from "mobx-react-lite";
import React, { useEffect, useMemo, useState } from "react";

const AllOrders = () => {
  const [list, setList] = useState<any>([]);

  const getAllOrders = useMemo(() => {
    fetch("https://fakestoreapi.com/carts")
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      });
  }, []);

  useEffect(() => {
    getAllOrders;
  }, []);
  return (
    <div className="flex mt-4">
      <div className=" w-screen py-2  sm:px-6 lg:px-8">
        <table className="w-full text-left text-sm font-light mt-4">
          <thead className="w-full border-b bg-white font-medium dark:border-neutral-500 dark:bg-gray-800 text-center">
            <tr>
              <th scope="col" className="px-6 py-4">
                Order Id
              </th>
              <th scope="col" className="px-6 py-4">
                Customer Id
              </th>
              <th scope="col" className="px-6 py-4">
                Order Date
              </th>
              <th scope="col" className="px-6 py-4">
                Products
              </th>
              <th scope="col" className="px-6 py-4">
                Edit Orders
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {list.map((item: any, index: number) => {
              return (
                <tr
                  key={item.id}
                  className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-gray-600"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {item.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{item.userId}</td>
                  <td className="whitespace-nowrap px-6 py-4">{item.date}</td>

                  <td className="whitespace-nowrap px-6 py-4">
                    {item.products.map((item: any, index: number) => {
                      return (
                        <>
                          <div className="grid grid-cols-2 gap-x-0" key={index}>
                            <p>Product Id: {item.productId}</p>
                            <p>Quantity: {item.quantity}</p>
                          </div>
                        </>
                      );
                    })}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 flex flex-col">
                    <button className="bg-gray-800 p-2 rounded-md hover:bg-gray-700">
                      Edit Order
                    </button>
                    <button className="bg-gray-800 p-2 rounded-md mt-2 hover:bg-gray-700">
                      Cancel Order
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default observer(AllOrders);
