"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";
// import { options } from "../api/auth/[...nextauth]/options";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Store from "@/store";
import { observer } from "mobx-react-lite";
import CartSlider from "./CartSlider";
import { getServerSession } from "next-auth";
import type { DefaultSession, User } from "next-auth";

type Props = {
  user: ({ id: string; role: string } & DefaultSession) | undefined;
};
const Navbar = ({ user }: Props) => {
  const store = useContext(Store);
  const {
    setCartIsActive,
    cartIsActive,
    cartItems,
    handleRemoveCartItem,
    setCartIsInactive,
  } = store;

  const router = useRouter();
  const pathname = usePathname();

  const [showMenu, setShowMenu] = useState(false);
  const [showToggleMenu, setShowToggleMenu] = useState(false);
  const { data: session, status } = useSession();
  const handleSignOut = async () => {
    await signOut();
  };
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleShowToggleMenu = () => {
    setShowToggleMenu(!showToggleMenu);
  };
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => +(total + item.totalPrice).toFixed(2),
      0
    );
  }, [cartItems]);

  const isActive = pathname;

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => handleShowToggleMenu()}
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Image
                width={500}
                height={500}
                className="h-10 w-auto"
                src="/next.svg"
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {user?.role !== "admin" && user?.role !== "manager" && (
                  <>
                    <Link
                      href="/"
                      className={`${
                        isActive === "/"
                          ? "bg-gray-900"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      } rounded-md px-3 py-2 text-sm font-medium`}
                      aria-current="page"
                    >
                      Home
                    </Link>
                    <Link
                      href="/products"
                      className={`${
                        isActive === "/products"
                          ? "bg-gray-900"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      } rounded-md px-4 py-2 text-sm font-medium`}
                      aria-current="page"
                    >
                      Shop
                    </Link>
                  </>
                )}
                {status === "authenticated" && (
                  <>
                    {user?.role === "customer" && (
                      <Link
                        href="/myorders"
                        className={`${
                          isActive === "/myorders"
                            ? "bg-gray-900"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        } rounded-md px-4 py-2 text-sm font-medium`}
                      >
                        My Orders
                      </Link>
                    )}
                    {user?.role === "admin" && (
                      <Link
                        href="/dashboard"
                        className={`${
                          isActive === "/dashboard"
                            ? "bg-gray-900"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        } rounded-md px-4 py-2 text-sm font-medium`}
                      >
                        Home
                      </Link>
                    )}
                    {(user?.role === "admin" || user?.role === "manager") && (
                      <>
                        <Link
                          href="/allorders"
                          className={`${
                            isActive === "/allorders"
                              ? "bg-gray-900"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white"
                          } rounded-md px-4 py-2 text-sm font-medium`}
                        >
                          All Orders
                        </Link>
                        <Link
                          href="/customers"
                          className={`${
                            isActive === "/customers"
                              ? "bg-gray-900"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white"
                          } rounded-md px-4 py-2 text-sm font-medium`}
                        >
                          Customers
                        </Link>
                        <Link
                          href="/productlist"
                          className={`${
                            isActive === "/productlist"
                              ? "bg-gray-900"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white"
                          } rounded-md px-4 py-2 text-sm font-medium`}
                        >
                          Product List
                        </Link>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          {status === "authenticated" ? (
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => {
                    handleShowMenu();
                  }}
                >
                  <span className="sr-only">Open user menu</span>

                  <Image
                    width={300}
                    height={300}
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>

              {showMenu && (
                <div
                  className=" absolute flex flex-col justify-center right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  <h3 className="block px-4 py-2 flex justify-center text-sm text-lime-500">
                    {user?.role.toUpperCase()}
                  </h3>
                  <a
                    href="#"
                    className="block  py-2 flex justify-center hover:bg-gray-100 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block  py-2  flex justify-center hover:bg-gray-100 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-1"
                  >
                    Settings
                  </a>
                  <button
                    className="block  py-2 flex justify-center hover:bg-gray-100 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-2"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className={`${
                  isActive === "/auth/signin"
                    ? "bg-gray-900"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                } rounded-md px-4 py-2 text-sm font-medium`}
                onClick={async () => {
                  await signIn();
                  // router.push("/");
                }}
              >
                Sign In
              </button>
              <p> | </p>
              <button
                className={`${
                  isActive === "/register"
                    ? "bg-gray-900"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                } rounded-md px-4 py-2 text-sm font-medium`}
                onClick={() => router.push("/register")}
              >
                Sign Up
              </button>
            </>
          )}
          {user?.role !== "admin" && user?.role !== "manager" && (
            <div className=" flex items-center">
              <div className="ml-4 flow-root lg:ml-6 z-20">
                <button
                  onClick={setCartIsActive}
                  className="group -m-2 flex items-center p-2 cursor-pointer"
                >
                  <svg
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {Array.isArray(cartItems) && cartItems && cartItems.length}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </button>
                {cartIsActive && (
                  <div>
                    <CartSlider />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showToggleMenu && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="#"
              className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Team
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Projects
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Calendar
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default observer(Navbar);
