"use client";
import { observer } from "mobx-react-lite";
import React, { useEffect, useMemo, useState } from "react";

const Customers = () => {
  const [list, setList] = useState<any>([]);

  const getAllUsers = useMemo(() => {
    fetch("https://fakestoreapi.com/users")
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      });
  }, []);

  useEffect(() => {
    getAllUsers;
  }, []);
  return (
    <div className="flex mt-4">
      <div className=" w-screen py-2  sm:px-6 lg:px-8">
        <table className="w-full text-left text-sm font-light mt-4 text-center">
          <thead className="w-full border-b bg-white font-medium dark:border-neutral-500 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-4">
                Customer Id
              </th>
              <th scope="col" className="px-6 py-4">
                Name
              </th>
              <th scope="col" className="px-6 py-4">
                Address
              </th>
              <th scope="col" className="px-6 py-4">
                Email
              </th>
              <th scope="col" className="px-6 py-4">
                Total Orders
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((item: any, index: number) => {
              return (
                <tr
                  key={item.id}
                  className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-gray-600"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {item.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {item.username}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {item.address.city}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{item.phone}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {item.address.number}
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

export default observer(Customers);
