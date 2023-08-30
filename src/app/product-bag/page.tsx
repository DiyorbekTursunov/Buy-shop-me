"use client";

import ProductBagItem from "@/components/ProductBagItem";
import { AnyTxtRecord } from "dns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function ProductBag() {
  const [Product, setProduct] = useState<any>([]);
  const [isLoading, setisLoading] = useState(false);
  const [total, settotal] = useState<number>(0);
  const router = useRouter()
  useEffect(() => {
    async function getData() {
      setisLoading(true);
      (await JSON.parse(localStorage.getItem("product") as string))
        ? setProduct(JSON.parse(localStorage.getItem("product") as string))
        : null;
      setisLoading(false);
    }
    getData();
  }, []);

  useEffect(() => {
    const total = Product.reduce((acc: any, item: any) => {
      console.log(typeof acc);

      return acc + item.price * item.quantity;
    }, 0);
    settotal(total);
  }, [Product]);

  function BuyProduct() {
    setProduct([])
    localStorage.removeItem('product')
    router.push('/')
  }
  return (
    <>
      <div
        className="flex md:flex-row container  mx-auto flex-col justify-between"
        id="cart"
      >
        <div
          className="lg:w-[120%] w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
          id="scroll"
        >
          <div
            className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer"
            onClick={() => ""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-left"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="15 6 9 12 15 18" />
            </svg>
            <p className="text-sm pl-2 leading-none">Back</p>
          </div>
          <p className="text-5xl font-black leading-10 text-gray-800 pt-3 mb-8">
            Bag
          </p>
          {Product.length ? (
            Product.map((item: any) => {
              return (
                <>
                  {
                    <ProductBagItem
                      {...item}
                      Product={Product}
                      setProduct={setProduct}
                      key={item.id}
                    />
                  }
                </>
              );
            })
          ) : (
            <>{isLoading ? <h1>{"Loading..."}</h1> : <h1>{"No items"}</h1>}</>
          )}
        </div>
        <div className="flex flex-col  px-14 py-20 w-[30%] ">
          <div className="mb-10">
          <h2 className="text-2xl mb-3">Summary</h2>
            <div className="flex justify-between">
              <h3>Total</h3>
              <p>${Math.floor(total)}</p>
            </div>
          </div>
          <button onClick={() => BuyProduct()} className="w-full py-3 rounded-xl bg-green-400">Buy</button>
        </div>
      </div>
    </>
  );
}

export default ProductBag;
