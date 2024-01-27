import Image from "next/image";
import React from "react";

const Products = ({ p_name, p_image, p_price, p_category, p_rating }) => {
  return (
    <div className=" w-auto h-auto  ">
      <div className=" w-3/12 shadow-md ">
        <div className=" w-full h-[200px]  ">
          <div className=" relative h-full w-full">
            <Image
              src={"/herodev.jpg"}
              fill
              className=" object-cover"
              alt="/"
            />
          </div>
          <div className=" bg-gray-300">
            <div className=" p-3 flex justify-between ">
              <p>Name</p>
              <p>Rating</p>
            </div>
            <div>
              <p className=" p-3">price</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
