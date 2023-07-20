"use client";
import { observer } from "mobx-react-lite";
import CartSlider from "./components/CartSlider";
import Landing from "./components/landing";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { useEffect } from "react";

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

const Home = () => {
  return (
    <main className="">
      <Landing />
    </main>
  );
};

export default observer(Home);
