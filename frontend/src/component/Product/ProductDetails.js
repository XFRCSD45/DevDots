import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Rating } from "@material-ui/lab";
import ReviewCard from "./ReviewCard.js";
import { useAlert } from "react-alert";
import { getAdminProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../Home/ProductCard.js";
import {
  clearErrors,
  // getProductDetails,
  newReview,
} from "../../actions/productAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import "./ProductsDetails.css";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

import { useParams } from 'react-router-dom';
import 
{
  getProductDetails
}

 from "../../actions/productAction";

 const ProductDetails = () => {
  
   const params = useParams();
//  console.log(params.id);

  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { products } = useSelector((state) => state.products);
   const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

    const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
    const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
    const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };
 const addToCartHandler = () => {
    dispatch(addItemsToCart(params.id, quantity));
    alert.success("Item Added To Cart");
  };
  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };
  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }
      if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
     if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(params.id));
    dispatch(getAdminProduct());
  }, [dispatch,params.id,reviewError,success]);

  const recomendProducts=[];
 
    for(const prod of products)
    {
      if(prod.category === product.category && prod._id !=product._id)
      {
        recomendProducts.push(prod);
      }
    
  }
  localStorage.setItem("NoPageViewed", 0);

  return (
    
 <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              {/* <Carousel> */}
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              {/* </Carousel> */}
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    {quantity} 
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                   <button
                    // disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
    <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
             open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
                           <Button onClick={submitReviewToggle} color="secondary">

                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
              
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
      <>
    <h1 style={{textAlign:"center",fontWeight:"bold", fontSize:"24px", textDecoration:"underline", textUnderlineOffset:"10px", marginTop:"40px"}} >Recommended Products</h1>
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
    </Fragment>
  );
};

  

export default ProductDetails;


