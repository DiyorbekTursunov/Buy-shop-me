"use client";

import { ProducteType } from "@/interface";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";


const CustomButton= ({DetailData}:any) => {
  const router = useRouter();
  const setBag = () => {
    const products =
      JSON.parse(localStorage.getItem("product") as string) || [];
    const isExistProduct = products.find(
      (e: ProducteType) => e.id === DetailData.id
    );
    if (isExistProduct) {
      const updatedData = products.map((item: any) => {
        if (item.id === DetailData?.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      localStorage.setItem("product", JSON.stringify(updatedData));
    } else {
      const data = [...products, { ...DetailData, quantity: 1 }];
      localStorage.setItem("product", JSON.stringify(data));
    }
    router.push("/");
    toast("The product has been successfully added to the shopping cart");
  };
  return (
    <button
      onClick={() => setBag()}
      type="button"
      className="mt-3 inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 hover:bg-green-300 sm:mt-0 sm:w-auto"
    >
      Add bag
    </button>
  );
};

export default CustomButton;
