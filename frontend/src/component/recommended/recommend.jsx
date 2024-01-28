import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import { useState, useEffect } from "react";
import ProductCard from "../Home/ProductCard.js";
const Recommend = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);
  console.log(orders);
  // const { users } = useSelector((state) => state.allUsers);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);
  let filteredorders = [];
  if (orders) {
    filteredorders = orders.filter((order) => order.user === user?._id);
  }

  console.log(filteredorders);
  const allProductIds = [];
  if (filteredorders) {
    for (const order of filteredorders) {
      for (const item of order?.orderItems) {
        const productId = item?.product;
        if (!allProductIds.includes(productId)) {
          allProductIds.push(productId);
        }
      }
    }
  }
  const recommendCateg = [];
  const productsForOrderItems = allProductIds.map((productId) => {
    const temp = products.find((product) => product._id === productId);
    return temp?.category;
  });

  if (allProductIds.length > 0) {
    for (const prod of allProductIds) {
      for (const item of products) {
        if (item?._id === prod) {
          recommendCateg.push(item?.category);
        }
      }
    }
  }
  const recomendProducts=[];
  for(const item of recommendCateg)
  {
    for(const prod of products)
    {
      if(prod.category === item)
      {
        recomendProducts.push(prod);
      }
    }
  }
  console.log(recommendCateg);
  console.log(allProductIds);

  return (
    <>
    <h1 style={{textAlign:"center",fontWeight:"bold", fontSize:"24px", textDecoration:"underline", textUnderlineOffset:"10px"}} >Recommended Products</h1>
    <div className="container" >
      {/* {user?._id}
      {console.log(allProductIds)}
      {recommendCateg.length > 0 && recommendCateg[0]} */}
      
        {recomendProducts.length > 0 &&
              recomendProducts.map((tem) => (
                <ProductCard key={tem._id} product={tem} />
              ))}
    </div>
    </>
    
  );
};

export default Recommend;
