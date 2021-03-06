import React, { Component, useEffect, useState } from 'react';
// import coffee from '@fortawesome/fontawesome-free';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faArrowRight, faLongArrowAltRight } from '@fortawesome/fontawesome-free-solid';
import { Link } from 'react-router-dom';
import productsList from '../data/products.json';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ReactLoading  from 'react-loading';

export default function ProductDisplay(props) {
    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const[isAdded,setIsAdded]=useState(false);

    /*
    useEffect(() => {
        fetch("https://610595364b92a000171c5f79.mockapi.io/node-ecommerce/products")
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setProducts(json);
            });
    }, []);
    */

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://610595364b92a000171c5f79.mockapi.io/node-ecommerce/products");
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);


    const item = products.find((product) => product.id === props.match.params.id);

    const updateCart=(record)=>{
        const qty=record.quantity+ parseInt(quantity);
        let apiUrl = "https://610595364b92a000171c5f79.mockapi.io/node-ecommerce/cart/" + record.id;
        fetch(apiUrl, {
            method: 'PUT',
            body: JSON.stringify({
                name: item.name,
                image: item.image,
                price: parseInt(item.cost),
                countInStock: item.stock_count,
                productId: item.id,
                quantity: qty
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then(result => {
                // props.history.push(`/cart/${item.id}?qty=${quantity}`);
            });

    }

    const addToCart=()=>{
        fetch("https://610595364b92a000171c5f79.mockapi.io/node-ecommerce/cart", {
            method: 'POST',
            body: JSON.stringify({
                name: item.name,
                image: item.image,
                price: parseInt(item.cost),
                countInStock: item.stock_count,
                productId: item.id,
                quantity: parseInt(quantity)
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then(result => {
                // props.history.push(`/cart/${item.id}?qty=${quantity}`);
            });

    }
    const handleCart = () => {
        fetch("https://610595364b92a000171c5f79.mockapi.io/node-ecommerce/cart")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const record=data.find((d)=>d.productId=== item.id);
                (record!=null) ? updateCart(record) : addToCart();
                setIsAdded(true);
            });

    }

   const handleGoToCart=()=>{
        props.history.push('/cart');
    }
    
    if (isLoading) {
        // return <div className="row">Loading...</div>;
        return <div><ReactLoading className='loader' type={'spin'} color={'#0000ff'} /></div>
      }
    else if(!item)
      return <div className="row">Product Not Found!</div>
    
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
                                            {
                                                (isAdded)?
                                                <>
                                                <button className="cart block" onClick={handleGoToCart}>Go to Cart <FontAwesomeIcon icon={faLongArrowAltRight} size="1x" /></button>
                                                
                                                </>
                                                :
                                                <button className="cart block" onClick={handleCart}>Add to Cart</button>
                                            }
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