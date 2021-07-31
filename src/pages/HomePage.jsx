import React, { Component } from 'react';
// import '../public/styles/layout.css';
import data from '../data/products.json';
import Products from '../components/Products';
import useFetch from 'react-fetch-hook';


export default function HomePage(){
    const{isLoading,error,data}= useFetch("https://610595364b92a000171c5f79.mockapi.io/node-ecommerce/products");
    console.log(data);   
    if(isLoading) return 'Loading....';
        if(error) return 'Error!!!';
        return (
            <div className="product-grid">
                {data.map(product => {
                    return(
                        <>
                    <Products key={product.id} product={product}></Products>
                    </>
                    )
                })}
            </div>
        );
    }

 
// export default HomePage;