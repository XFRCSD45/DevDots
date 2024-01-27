import React from "react";
import Products from "./Products";

const Categoey = ({ name , p_name, p_image,p_price, p_category,p_rating }) => {
  return (
    <div className=" m-2">
      <div className=" mb-3 text-xl font-bold tracking-wider ">Catergory Name</div>
      <div>
        <Products />
      </div>
    </div>
  );
};

export default Categoey;
