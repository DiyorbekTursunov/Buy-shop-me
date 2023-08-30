"use client";
import { ProducteType } from "@/interface";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import CustomImage from "./CustomImage";

const ProductItem: FC<ProducteType> = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}) => {
  return (
    <div className="p-4 md:w-1/3">
      <div className="h-full flex flex-col justify-between border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <Link href={`/product/${id}`}>
          <CustomImage image={image} fill/>
        </Link>
        <div className="p-6">
          <h2 className="tracking-widest text-md title-font font-medium text-gray-600 mb-1">
            {category}
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {title}...
          </h1>
          <p className="leading-relaxed mb-3 line-clamp-3">{description}</p>
          <div className="flex items-center justify-between flex-wrap ">
            <Link href={`/product/${id}`} className="text-green-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer">
              Learn More
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
            <div>
              <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                {price} $
              </span>
              <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                {rating.rate}
              </span>
              <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                {rating.count}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
