import Image from "next/image";
import React from "react";

const Herosection = () => {
  return (
    <div className="  w-full relative">
      <div className=" relative    h-[90vh]">
        <Image
          src={"/herodev.jpg"}
          fill
          alt="/"
          className=" object-cover -z-40"
        />
        <div className=" z-5 ">HI</div>
      </div>
    </div>
  );
};

export default Herosection;
