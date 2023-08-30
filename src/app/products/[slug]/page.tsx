"use client";
import { FC } from "react";
import { useParams } from "next/navigation";
import ProductItem from "@/components/ProductItem";
import { ProducteType } from "@/interface";
async function getCatigory(catigoyr: any) {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${catigoyr}`
  );
  const data = res.json();
  return data;
}

const productsCatigoyr = async () => {
  const { slug } = useParams();
  const data = await getCatigory(slug);

  return (
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap -m-4">
        {data.map((item: ProducteType) => {
          return <ProductItem key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
};

export default productsCatigoyr;