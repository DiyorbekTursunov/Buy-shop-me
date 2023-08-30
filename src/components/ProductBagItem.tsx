"use client";
import { useState } from "react";
import CustomImage from "./CustomImage";
import { ProducteType } from "@/interface";
interface Props {
    Quantity: number , 
    Product:ProducteType[],
    setProduct:Function
}
const ProductBagItem  = ({
  image,
  category,
  description,
  title,
  rating,
  price,
  quantity ,
  id ,
  Product,
  setProduct,
}: Props & ProducteType) => {
    const removeProduct = (id:number) => {
        const updateCard = Product.filter((product:any) => product.id  !== id)
        localStorage.setItem('product' , JSON.stringify(updateCard))
        setProduct(updateCard)
    }
    const PrevItem = (id:number) => {
        if (quantity > 1) {
            const updateCard = Product.map(product => {
                if (product.id === id) {
                    return{
                        ...product ,
                        quantity: product.quantity - 1
                    }
                }
                return product
            })
            localStorage.setItem('product' , JSON.stringify(updateCard))
            setProduct(updateCard)
        }
    }

    const NextItem = (id:number) => {
        if (quantity < 10) {
            const updateCard = Product.map(product => {
                if (product.id === id) {
                    return{
                        ...product ,
                        quantity: product.quantity + 1
                    }
                }
                return product
            })
            localStorage.setItem('product' , JSON.stringify(updateCard))
            setProduct(updateCard)
        }
    }
    
  return (
    <>
      <div className="md:flex gap-3 items-center py-8 border-t border-gray-200">
        <div className="w">
          <CustomImage image={image} />
        </div>
        <div className="flex flex-col gap-2 md:pl-3 md:w-3/4">
          <p className="text-lg leading-3 text-gray-800 md:pt-0 pt-4">
            {category}
          </p>
          <div className="flex items-center justify-between w-full pt-1">
            <p className="text-xl line-clamp-3 text-gray-800">{title}</p>
          </div>
          <p className="text-md leading-5 text-gray-600">{description}</p>
          <div className="flex items-center justify-between pt-5 pr-6">
            <div className="flex itemms-center">
              <p className="text-md leading-3 text-green-500 cursor-pointer">
                price
              </p>
            </div>
            <p className="text-base font-black leading-none text-gray-800">
              ${price}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-base font-black leading-none text-gray-800">
              {quantity} / ${price * quantity}
            </p>
            <div className="inline-flex m-2">
              <button
                onClick={() =>NextItem(id) }
                className="bg-gray-300 hover:bg-gray-400 active:bg-gray-600 text-gray-800 font-bold py-2 px-4 rounded-l"
              >
                +
              </button>
              <button
                onClick={() => PrevItem(id)}
                className="bg-gray-300 hover:bg-gray-400 active:bg-gray-600 text-gray-800 font-bold py-2 px-4 rounded-r"
              >
                -
              </button>
            </div>
          </div>
            <button onClick={() => removeProduct(id)} className="py-1 rounded-xl text-gray-200 text-sm bg-red-500 w-20">Remove</button>
        </div>
      </div>
      
    </>
  );
};

export default ProductBagItem;
