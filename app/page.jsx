'use client'
import React, { useEffect, useState } from 'react';
import Herosection from '@/components/Herosection';
import Category from '@/components/Category';

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/search?q=phone');
        const data = await response.json();

        // Assuming data is an object with a 'products' property containing an array of products
        const productCategories = data.products.map(product => product.category);
        
        setCategories(productCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Log the categories to the console
    console.log(categories);
  }, [categories]);

  return (
    <div>
      <Herosection />
      <Category />
    </div>
  );
};

export default Home;
