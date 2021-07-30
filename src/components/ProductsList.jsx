import React, { Component } from 'react';
import data from '../data/products.json';
// import da from '../images/';

class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: data
        }
    }
    render() {
        // console.log("data:", data);
        return (
            <div className="product-grid">
                {this.state.products.map(product => {
                    return (
                        <div key={product.id} className="product-card">
                            <img className="product-img" src={product.image} alt={`Preview of ${product.name}`}/>

                            <div className="card-body">
                            <h3>{product.name}</h3>
                            {/* <p>{product.short_description}</p> */}
                            <p>${product.cost}</p>
                            <p>
                                <button>Add to Cart</button>
                            </p>
                            </div>
                            
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default ProductsList;