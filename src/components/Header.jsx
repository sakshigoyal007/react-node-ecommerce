import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {

    // const handleLogo=()=>{
    //     props.history.push(`/`);
    // }

    return (
        <header className="row">
            <div>
                <Link to='/' style={{textDecoration:"none", fontSize:"2rem", color:"#ffffff", fontWeight:"bold"}}>SHOPLIFY</Link>
                </div>
           <div>
            <a href="/Cart">Cart</a>
            <a href="/Login">Sign in</a>    
            </div>  
        </header>
    );
}