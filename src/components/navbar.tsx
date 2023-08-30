"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
const Navbar = () => {

  const [dropDown, setdropDown] = useState(false);
  const [catigoyr, setcatigory] = useState<string[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [isErorr, setisErorr] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    async function getCatigory() {
      try {
        setisLoading(true);
        const res = await fetch(`https://fakestoreapi.com/products/categories`);
        const catigory = await res.json();
        setisErorr(false)
        setisLoading(false);
        setcatigory(catigory);
      } catch (error) {
        setisLoading(false);
        setisErorr(true)
      }
    }
    getCatigory();
  }, []);
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href={"/"}
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="ml-3 text-2xl text-green-500">Buy Shop</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href={"/"} className="mr-5 hover:text-gray-900">
            Home page
          </Link>
        </nav>
        <div className="flex gap-3">
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-green-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setdropDown(!dropDown)}
              >
                categorys
                <svg
                  className="-mr-1 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {dropDown &&
              (isLoading ? (
                <div className="absolute w-full h-full flex items-center justify-center">
                  {isErorr ? <h1>unable error please restart page and check your connection</h1>:
                  <h1>loading...</h1>}
                </div>
              ) : (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  // tabindex="-1"
                >
                  <div role="none">
                    {catigoyr.map((item) => {
                      return (
                        <Link
                        onClick={() => setdropDown(false)}
                          href={`/products/${item}`}
                          className="text-gray-700 hover:bg-green-100 active:bg-green-400 block px-4 py-2 text-sm"
                          role="menuitem"
                          // tabIndex="-1"
                          id="menu-item-0"
                        >
                          {item}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
          <button onClick={() => router.push('/product-bag')} className="inline-flex text-black items-center bg-green-500 border-0 py-1 px-3 focus:outline-none hover:bg-green-400 rounded text-base mt-4 md:mt-0">
            my bag
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
