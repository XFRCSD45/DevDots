import React from 'react';
import './style.css';
import { FaLocationDot } from "react-icons/fa6";
import Tooltip from "react-simple-tooltip";
import khaman from "../../images/khaman.png";
import rajasthan from "../../images/rajasthan.jpg"
import tamilNadu from "../../images/tamilNadu.jpg"
import westbengal from "../../images/westbengal.jpg"
import JK from "../../images/JK.jpg"
import { Link } from 'react-router-dom';
const Virtual = () => {
    
  return (
    <div>
      <div className='map'>
        <img src='https://i.pinimg.com/736x/7c/99/f1/7c99f1dcda9b6cbca0f6e6f8cc8ad54b.jpg' alt='map' />
      </div>
      <Link to={`/product/65b5c8c0c971552fd3e8ccdd`} >
      <div className='icon'>
        <FaLocationDot/>
        <div style={{ position: "relative" }} className='name'>
          <Tooltip content="Rajasthan ">
            <div style={{ position: "absolute", height: "100px", width: "100px" }} className="image-container">
              <img src={rajasthan} alt='khaman' />
            </div>
          </Tooltip>
        </div>
      </div>
      </Link>
      <Link to={`/product/65b5c902c971552fd3e8cd03`} >
      
      <div className='icon icon1'>
        <FaLocationDot/>
        <div style={{ position: "relative" }} className='name'>
          <Tooltip content="Gujarat famous dokhala">
            <div style={{ position: "absolute", height: "100px", width: "100px" }} className="image-container">
              <img src={JK} alt='khaman' />
            </div>
          </Tooltip>
        </div>
      </div>
      </Link>
      <Link to={`/product/65b5c873c971552fd3e8cc72`} >
      <div className='icon icon2'>
        <FaLocationDot/>
        <div style={{ position: "relative" }} className='name'>
          <Tooltip content="J&K">
            <div style={{ position: "absolute", height: "100px", width: "100px" }} className="image-container">
              <img src={khaman} alt='khaman' />
            </div>
          </Tooltip>
        </div>
      </div>
      </Link>
      <Link to={`/product/65b5c94554763958e54c016d`} >
      <div className='icon icon3'>
        <FaLocationDot/>
        <div style={{ position: "relative" }} className='name'>
          <Tooltip content="westbengal">
            <div style={{ position: "absolute", height: "100px", width: "100px" }} className="image-container">
              <img src={westbengal} alt='WB' />
            </div>
          </Tooltip>
        </div>
      </div>
      </Link>
      <Link to={`/product/65b5c99a8062d4ef00722c58`} >
      <div className='icon icon4'>
        <FaLocationDot/>
        <div style={{ position: "relative" }} className='name'>
          <Tooltip content="tamilNadu">
            <div style={{ position: "absolute", height: "100px", width: "100px" }} className="image-container">
              <img src={tamilNadu} alt='tamilNadu' />
            </div>
          </Tooltip>
        </div>
      </div>
      </Link>
    </div>
  );
}

export default Virtual;