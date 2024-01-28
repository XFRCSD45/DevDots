import React, { Fragment, useEffect } from "react";
import { CgMouse} from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import Recommend from "../recommended/recommend.jsx";
import Virtual from "../virtual/virtual.js";
import { Link } from "react-router-dom";
// import { useAlert } from "react-alert";

const Home = () => {
  // const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  localStorage.setItem("NoCheckOutInitiated",1);
  localStorage.setItem("NoCheckOutConfirmed",1);
  if(user?._id)
  {
    localStorage.setItem("NoCustomerLogIn",0);
  }
  else
  {
    localStorage.setItem("NoCustomerLogIn",1);
  }
  localStorage.setItem("NoPageViewed", 1);
  if((localStorage.getItem("cartItems")).length >0)
  {
    localStorage.setItem("NoItemsAdded", 0);
  }
  else
  {
    localStorage.setItem("NoItemsAdded", 1);
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    // <Fragment>
    //   {loading ? (
    //     <Loader />
    //   ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>

                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <div style={{position:"relative", marginBottom:"20px", marginTop:"15px"}} >
            <h1 style={{fontSize:"30px", fontWeight:"bold", color:"rgb(250, 45, 175)", marginTop:"15px", textAlign:"center", marginBottom:"20px"}}>Discover and Shop India's Cultural Tapesty</h1>
            <Link to="/virtual"   ><Virtual/></Link></div>
           {user?._id && <Recommend/>}
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          
        </Fragment>
    //   )}
      
    // </Fragment>
  );
};

export default Home;
