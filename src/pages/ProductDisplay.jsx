import React, { Component, useEffect, useState } from 'react';
// import coffee from '@fortawesome/fontawesome-free';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from '@fortawesome/fontawesome-free-solid';
import { Link } from 'react-router-dom';
import productsList from '../data/products.json';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function ProductDisplay(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://610595364b92a000171c5f79.mockapi.io/node-ecommerce/products")
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setProducts(json);
            });
    }, [])

    const item = products.find((product) => product.id === props.match.params.id);
    const [quantity, setQuantity] = useState(1);
    console.log(item);
    const handleCart = () => {
        // let history=useHistory();
        fetch("https://610595364b92a000171c5f79.mockapi.io/node-ecommerce/cart", {
            method: 'POST',
            body: JSON.stringify({
                name: item.name,
                image: item.image,
                price: item.cost,
                countInStock: item.stock_count,
                productId: item.id,
                quantity: parseInt(quantity)
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then(result => {
                props.history.push(`/cart/${item.id}?qty=${quantity}`);
            });


    }
    if (!item) {
        return <div>Product Not Found</div>
    }
    return (
        <div style={{ textAlign: "start" }}>
            <Link to="/">
                <FontAwesomeIcon icon={faAngleDoubleLeft} size="3x" />
            </Link>

            <div className="row up">
                <div className="col-2">
                    <img className="product-img-large" src={item.image} alt={`Preview of ${item.name}`} />
                </div>
                <div className="col-1">
                    <ul>
                        <li>
                            <h1> {item.name}</h1>
                        </li>
                        <li> Price: ${item.cost}</li>
                        <li>
                            Description: <p>{item.bullet_description}</p>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="product-card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Price</div>
                                    <div className="price">${item.cost}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status</div>
                                    <div>
                                        {
                                            item.stock_count > 0 ?
                                                <span style={{ color: "green" }} >In Stock</span>
                                                : <span style={{ color: "red" }}>Not Available</span>
                                        }
                                    </div>
                                </div>
                            </li>
                            {
                                item.stock_count > 0 && (
                                    <>
                                        <li>
                                            <div className="row">
                                                <div>Quantity</div>
                                                <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                                    {
                                                        [...Array(item.stock_count).keys()].map((count) => (
                                                            <option key={count + 1} value={count + 1} >
                                                                {count + 1}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </li>
                                        <li>
                                            <button className="cart block" onClick={handleCart}>Add to Cart</button>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}