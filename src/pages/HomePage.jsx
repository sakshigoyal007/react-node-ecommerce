import React, { Component } from 'react';
import Header from '../components/Header';
import ProductsList from '../components/ProductsList';
// import '../public/styles/layout.css';


class HomePage extends Component {
    // state = {  }
    render() { 
        return ( 
            <div className="grid-container">
            {/* <h2>Ecommerce application</h2> */}
            <Header/>
            <main>
            <ProductsList/>
            </main>
            <footer className="row center">
            All right reserved
            </footer>
            </div>
         );
    }
}
 
export default HomePage;