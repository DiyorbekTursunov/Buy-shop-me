"use client";

import CustomImage from "@/components/CustomImage";
import Loading from "@/components/loader";
import { ProducteType } from "@/interface";
import FullDetailService from "@/service/fullDetail";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactStars from "react-stars";
import Loader from "@/components/loader";
import CustomButton from "@/components/CustomButton";
const FullDetailPage = () => {
  const { id } = useParams();
  const [DetailData, setDetailData] = useState<ProducteType>();
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      try {
        setisLoading(true);
        const data = await FullDetailService.getFullDetail(id);
        setisLoading(false);
        setDetailData(data);
      } catch (error) {
        notFound();
      }
    }
    getData();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <CustomImage image={DetailData?.image} fill />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <div className="mb-10">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    {DetailData?.category}
                  </h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                    {DetailData?.title}
                  </h1>
                  <div className="flex gap-3 mb-4">
                    <span>stars</span>
                    <ReactStars value={DetailData?.rating.rate} edit={false} />
                  </div>
                  <p className="leading-relaxed">{DetailData?.description}</p>
                </div>
                <div className="flex justify-between">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ${DetailData?.price}
                  </span>
                  <div className="flex gap-3">
                    <CustomButton DetailData={DetailData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default FullDetailPage;
