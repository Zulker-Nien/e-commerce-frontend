"use client";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
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

class Store {
  productIsActive = false;
  productData: CategoryProps[] = [];
  productItems: CategoryProps | null = null;

  cartItems: CategoryProps[] = [];
  cartIsActive = false;
  categoryIsActive = "";
  isLoading = false;
  itemCount = 0;
  addProductModal: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  handleProductClicked = (item: number) => {
    fetch(`https://fakestoreapi.com/products/${item}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        return res.json();
      })
      .then((data) => {
        this.setProductItems(data);
        this.setIsNotLoading();
        this.setProductIsActive();
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        this.setIsNotLoading();
      });
  };

  initializeCartItems = (data: CategoryProps[]) => {
    this.cartItems = data ?? [];
  };

  handleCartItem = (item: CategoryProps) => {
    const existingItem = this.cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
      const updatedItems = this.cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              totalPrice: +(cartItem.totalPrice + cartItem.price).toFixed(2),
            }
          : cartItem
      );
      this.setCartItems(updatedItems);
    } else {
      this.setCartItems([
        ...this.cartItems,
        { ...item, quantity: 1, totalPrice: item.price },
      ]);
    }
  };

  handleRemoveCartItem = (itemId: number) => {
    if (Array.isArray(this.cartItems)) {
      const updatedItems: CategoryProps[] = this.cartItems
        .map((item: CategoryProps) => {
          if (item.id === itemId) {
            const updatedQuantity = item.quantity - 1;
            const updatedTotalPrice = +(item.totalPrice - item.price).toFixed(
              2
            );

            if (updatedQuantity === 0) {
              return null;
            }

            return {
              ...item,
              quantity: updatedQuantity,
              totalPrice: updatedTotalPrice,
            };
          }
          return item;
        })
        .filter((item) => item !== null) as CategoryProps[];

      this.setCartItems(updatedItems);
    }
  };

  setIsLoading = () => {
    this.isLoading = true;
  };
  setIsNotLoading = () => {
    this.isLoading = false;
  };
  setProductIsActive = () => {
    this.productIsActive = true;
  };
  setProductIsInactive = () => {
    this.productIsActive = false;
  };

  setProductData = (data: CategoryProps[]) => {
    this.productData = data;
  };
  setProductItems = (data: CategoryProps | null) => {
    this.productItems = data;
  };

  setCartItems = (data: any) => {
    this.cartItems = data ?? [];
  };
  setCategoryIsActive = (data: string) => {
    this.categoryIsActive = data;
  };
  setCartIsActive = () => {
    this.cartIsActive = true;
  };
  setCartIsInactive = () => {
    this.cartIsActive = false;
  };
  setItemCount = () => {
    this.itemCount = this.itemCount + 1;
  };
  setItemRefresh = () => {
    this.itemCount = 0;
  };
  setAddProductModal = () => {
    this.addProductModal = true;
  };
  setRemoveProductModal = () => {
    this.addProductModal = false;
  };
}

export default createContext(new Store());
