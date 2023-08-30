"use client";
import { FC } from "react";
import { ProducteType } from "@/interface";
import ProductItem from "./ProductItem";
import { useState } from "react";
const Product: FC<any> = ({ data }) => {
  const [Data, setData] = useState(data);

  return (
    <>
      <div className="flex gap-2">  
      </div>
      <div className="flex flex-wrap -m-4">
        {Data.map((item: any) => {
          return <ProductItem key={item.id} {...item} />;
        })}
      </div>
    </>
  );
};

export default Product;
