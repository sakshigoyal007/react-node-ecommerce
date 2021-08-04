// import { Button } from '@material-ui/core';
import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function CartPage(props) {
    const id = props.match.params.id;
    const qtyValue = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const [cartData, setCartData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getCartItems = () => {
        fetch("https://610595364b92a000171c5f79.mockapi.io/node-ecommerce/cart")
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setCartData(json);
                setLoading(false);
            });
    }

    useEffect(() => {
        getCartItems();
    }, [])

    const updateCart = (e, item) => {
        console.log("ChangedQuantity:", e.target.value);
        let apiUrl = "https://610595364b92a000171c5f79.mockapi.io/node-ecommerce/cart/" + item.id;
        fetch(apiUrl, {
            method: 'PUT',
            body: JSON.stringify({
                name: item.name,
                image: item.image,
                price: item.cost,
                countInStock: item.stock_count,
                productId: item.productId,
                quantity: parseInt(e.target.value)
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then(result => {
                getCartItems();
            });
    }

    const removeFromCart = (item) => {
        // let apiUrl="https://610595364b92a000171c5f79.mockapi.io/node-ecommerce/cart/"+ item.id;
        // console.log(apiUrl);
        // fetch(apiUrl, {
        //     method: 'DELETE',
        //     body: JSON.stringify({
        //         productId: item.productId,
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // }).then(response => response.json())
        //     .then(result => {
        //        getCartItems();
        //     });
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div className="row up">
                <div className="col-2">
                    <h2>Shopping Cart</h2>
                    {
                        cartData.length === 0 ?
                            <p>Cart is Empty.<Link to='/'>Go Shopping</Link></p>
                            :
                            <ul>
                                {
                                    cartData.map((item) => (
                                        <li key={item.productId}>
                                            <div className="row">
                                                <div>
                                                    <img src={item.image} alt={item.name} className="img-small" />
                                                </div>
                                                <div>
                                                    <Link to={`/product/${item.productId}`}>{item.name}</Link>
                                                </div>
                                                <div>
                                                    <select value={item.quantity} onChange={(e) => updateCart(e, item)}>
                                                        {
                                                            [...Array(item.countInStock).keys()].map((count) => (
                                                                <option key={count + 1} value={count + 1} >
                                                                    {count + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <div>${item.price}</div>
                                                <div>
                                                    <button onClick={removeFromCart(item)}>Delete</button>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>

                    }
                </div>
                <div className="col-1">
                    <div className="product-card card-body">
                        <ul>
                            <li>
                                <h4>
                                    Subtotal ({cartData.reduce((p, q) => p + q.quantity, 0)} items) : $
                                    {cartData.reduce((p, q) => p + q.price * q.quantity, 0)}
                                </h4>
                            </li>
                            <button className="cart block" disabled={cartData.length === 0}>Proceed to checkout</button>
                        </ul>
                    </div>

                </div>

            </div>
        </>
    );
}