import React, { Component, lazy, Suspense } from 'react';
import data from '../data/products.json';
// import Products from '../components/Products';
import useFetch from 'react-fetch-hook';
import ReactLoading  from 'react-loading';

const Products = lazy(() => import('../components/Products'));

export default function HomePage(){
    /*
    const{isLoading,error,data}= useFetch("https://610595364b92a000171c5f79.mockapi.io/node-ecommerce/products");
    if(isLoading) return 'Loading....';
        if(error) return 'Error!!!';
    */
        return (
            <Suspense fallback={<div><ReactLoading className='loader' type={'spin'} color={'#0000ff'} /></div>}>
            <div className="product-grid">
                {/* {data.map(product => {
                    return(
                        <>
                    <Products key={product.id} product={product}/>
                    </>
                    )
                })} */}
                <Products/>
            </div>
            </Suspense>
        );
    }

