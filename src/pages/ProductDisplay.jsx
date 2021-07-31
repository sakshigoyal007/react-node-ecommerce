import React, { Component } from 'react';
// import coffee from '@fortawesome/fontawesome-free';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from '@fortawesome/fontawesome-free-solid';
import { Link } from 'react-router-dom';
import productsList from '../data/products.json';
import { Button } from '@material-ui/core';

class ProductDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: productsList
        }
    }

    render() {
        console.log(this.state.products);
        const item = this.state.products.find((product) => product.id === this.props.match.params.id);
        if (!item) {
            return <div>Product Not Found</div>
        }
        return (
            <div style={{ textAlign: "start" }}>
                <Link to="/">
                    <FontAwesomeIcon icon={faAngleDoubleLeft} size="3x" />
                </Link>
                {/* <h6>description</h6> */}
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
                                                    <span style={{color:"green"}} >In Stock</span>
                                                    : <span style={{color:"red"}}>Not Available</span>
                                            }
                                        </div>
                                    </div>
                                </li>
                                <button className="cart block">Add to Cart</button>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default ProductDisplay;