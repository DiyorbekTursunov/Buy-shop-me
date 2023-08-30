"use client";

import CustomImage from "@/components/CustomImage";
import { ProducteType } from "@/interface";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactStars from "react-stars";
import FullDetailService from "@/service/fullDetail";
import CustomButton from "@/components/CustomButton";
const ProductDetailPage = () => {
  const { id } = useParams();
  const [DetailData, setDetailData] = useState<any>();
  const [loading, setloading] = useState(true);
  const [isloading, setisloading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    async function getData() {
      setisloading(true);
      const data = await FullDetailService.getFullDetail(id);
      setisloading(false);
      setDetailData(data);
    }
    getData();
  }, [id]);
  const closeModal = () => {
    router.back();
    setloading(false);
  };
  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <CustomImage image={DetailData?.image} fill />
                    {isloading ? (
                      <div
                        role="status"
                        className="max-w-sm space-y-3 animate-pulse"
                      >
                        <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                        <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                        <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                        <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                        <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                        <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <div>
                        <h3
                          className="text-base font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          {DetailData?.title}
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {DetailData?.description}
                          </p>
                        </div>
                        <div className="flex gap-2 my-3">
                          <span>stars</span>
                          <ReactStars
                            value={DetailData?.rating.rate}
                            edit={false}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {isloading ? (
                null
              ) : (
                <div className="gap-5 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {loading ? (
                    <button
                      onClick={() => closeModal()}
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Close
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-200 px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm hover:bg-red-100 sm:ml-3 sm:w-auto"
                    >
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="#000"
                        ></path>
                      </svg>
                      Close
                    </button>
                  )}
                  <button
                    onClick={() => router.push(`/fullproduct/${id}`)}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300 sm:mt-0 sm:w-auto"
                  >
                    View full detail
                  </button>
                  <CustomButton DetailData={DetailData} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
