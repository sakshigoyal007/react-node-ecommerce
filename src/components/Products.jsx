import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Products(props) {
    // const { product } = props;
    const[products, setProducts]=useState([]);

    useEffect(() => {
        fetch("https://610595364b92a000171c5f79.mockapi.io/node-ecommerce/products")
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    return (
        products.map(product => (
        <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
                <img className="product-img" src={product.image} alt={`Preview of ${product.name}`} />
            </Link>
            <div className="card-body">
            <Link className="title" to={`/product/${product.id}`}>
            <h3>{product.name}</h3>
            </Link>
                {/* <p>{product.short_description}</p> */ }
                <p>${product.cost}</p>
            </div >

        </div >
        ))
    );
}