import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default function Products(props) {
    const { product } = props;
    return (
        <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
                <img className="product-img" src={product.image} alt={`Preview of ${product.name}`} />
            </Link>
            <div className="card-body">
            <Link to={`/product/${product.id}`}>
            <h3>{product.name}</h3>
            </Link>
                {/* <p>{product.short_description}</p> */ }
                <p>${product.cost}</p>
                <p>
                    <button>Add to Cart</button>
                </p>
            </div >

        </div >
    );
}