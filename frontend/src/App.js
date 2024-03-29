import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/orderSuccess";
import Payment from "./component/Cart/Payment";
import Dashboard from "./component/Admin/Dashboard.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import { useDispatch } from "react-redux";
import Home from "./component/Home/Home";
import Footer from "./component/layout/Footer/Footer";
import { ChakraProvider, theme } from '@chakra-ui/react';
import Header from "./component/layout/Header/Header";
import Virtual from "./component/virtual/virtual.js";
import WebFont from "webfontloader";
import UpdatePassword from "./component/User/UpdatePassword";
import UpdateProfile from "./component/User/UpdateProfile";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Products from "./component/Product/Product";
import Search from "./component/Product/Search"
import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
// import OrderSuccess from "./component/Cart/OrderSuccess";
import OrderList from "./component/Admin/OrderList";
import { cartAbandonment, check } from "./actions/userAction";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import ProductDetails  from './component/Product/ProductDetails';
import LoginSignUp from "./component/User/LoginSignUp";
import Profile from "./component/User/Profile";
import { loadUser } from "./actions/userAction";
import store from "./store";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import "./App.css"
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
// import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
// import NotFound from "./component/layout/Not Found/NotFound";
import About from "./component/layout/About/About";
import Contact from "./component/layout/Contact/Contact";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();
  async function getStripeApiKey() {
    // const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey("pk_test_51NSvg7SJdJczrCbfaRuvkraIGC3MwJeZCj4t0BXXxHPriRpSE8gIYzlh3U2rSzJa1UIgwPebYoLaWeqTmdPSeBj2009tu9olsS");
  }

   useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey( );
    // console.log(stripeApiKey);
    

  
  }, []);

  // useEffect(async() => {
  //   const handleTabClose = async(event) => {
  //     event.preventDefault();
  //      dispatch(check);
  //     // redirect("http://localhost:4000/api/v1/check");
  //     // window.location.href = 'http:localhost:4000/api/v1/check';
     
  //     return (event.returnValue =
  //       'Are you sure you want to exit?');
  //   };

  //   window.addEventListener('beforeunload', handleTabClose);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleTabClose);
  //   };
  // }, []);
  useEffect(() => {
    const delay = 10*60*1000; // 5 minutes in milliseconds

    const timerId = setTimeout(async() => {
      // Make Axios GET request
      const numericResponses=[localStorage.getItem("NoPageViewed"),localStorage.getItem("NoCustomerLogIn"),localStorage.getItem("NoCheckOutConfirmed"),localStorage.getItem("NoCheckOutInitiated"),localStorage.getItem("NoItemsAdded") ]
      console.log(numericResponses);
     const response=await axios.post( "https://cart-abandonment.onrender.com/v1",
      numericResponses);
      console.log("external data ",response.data);
      // console.log(user?.email);
     if(response.data.prediction == 1 && user?.email )
     {
        // dispatch(cartAbandonment(user?.email,localStorage.getItem('cartItems') ))
        console.log(user?.email);
        const response=await axios.post(`http://localhost:4000/api/v1/testMail`, {"email":user?.email});
        console.log(response.data)
     }
      console.log("posted");
    }, delay);

    return () => clearTimeout(timerId); // Clear the timer if the component unmounts before the delay is reached
  }, []);
  return (
    <Router>
  <ChakraProvider theme={theme}>

      <Header/>
     
</ChakraProvider>
{isAuthenticated && <UserOptions user={user} />}

      
      <Routes>
    
         <Route  path="/search" element={<Search/>} />
         
          <Route exact path="/" element={<Home/>} />
          <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/products/:keyword" element={<Products/>} />
        <Route exact path="/products" element={<Products/>} />
        <Route path="/login" element={<LoginSignUp/>} />
        <Route path="/account" element={<Profile/>} />
        <Route path="/virtual" element={<Virtual/>} />
        <Route  path="/cart" element={<Cart/>} />
        <Route  path="/shipping" element={<Shipping/>} />
        <Route exact path="/order/confirm" element={<ConfirmOrder/>} />
          
        <Route path="/password/update" element={<UpdatePassword/>}/>
        <Route path="/me/update" element={<UpdateProfile/>}/>
          <Route  path="/password/forgot" element={<ForgotPassword/>} />
        <Route path="/orders" element={<MyOrders/>} />
        <Route  path="/order/:id" element={<OrderDetails/>} />
        <Route  path="/success" element={<OrderSuccess/>} />
    <Route  path="/contact" element={<Contact/>} />

        <Route  path="/about" element={<About/>} />

        <Route  path="/password/reset/:token" element={<ResetPassword/>} />
        
        <Route
          // isAdmin={true}
          // exact
          path="/admin/dashboard"
          element={<Dashboard/>}
        />
            <Route
          
          path="/admin/products"
          // isAdmin={true}
        element={<ProductList/>}
        />
        <Route
         
          path="/admin/product"
          // isAdmin={true}
          element={<NewProduct/>}
        />
         <Route
         
          path="/admin/users"
          // isAdmin={true}
          element={<UsersList/>}
        />  <Route
         
          path="/admin/reviews"
          // isAdmin={true}
          element={<ProductReviews/>}
        />  <Route
         
          path="/admin/orders"
          // isAdmin={true}
          element={<OrderList/>}
        /> <Route
         
          path="/admin/product/:id"
          // isAdmin={true}
          element={<UpdateProduct/>}
        /> <Route
         
          path="/admin/order/:id"
          // isAdmin={true}
          element={<ProcessOrder/>}
        /> 
        <Route
         
          path="/admin/user/:id"
          // isAdmin={true}
          element={<UpdateUser/>}
        /> 

      




       <Route
      path="/process/payment"
      element={(
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment />
        </Elements>
      )}/>
      </Routes>
      <Footer/>

    </Router>
  )
}

export default App