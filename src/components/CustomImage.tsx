"use client";
import { FC } from "react";
import Image from "next/image";
import { useState } from "react";

interface ImageProps {
  image: string | undefined;
  fill?: boolean;
}

const CustomImage: FC<ImageProps> = ({ image, fill }) => {
  const [isLoading, setisLoading] = useState(true);
  return (
    <>
      {image ? (
        <Image
          src={image}
          height={0}
          width={400}
          className={`lg:h-[400px] md:h-[200px]  mx-auto p-10 cursor-pointer hover:scale-110 ease-in duration-200 ${
            isLoading ? "grayscale blur-xl" : ""
          }`}
          alt="blog"
          onLoadingComplete={() => setisLoading(false)}
        />
      ) : (
        <div className="flex items-center justify-center lg:h-[400px] md:h-[200px] w-[400px]">
          <span className="text-center inline-block">Loading...</span>
        </div>
      )}
    </>
  );
};

export default CustomImage;
