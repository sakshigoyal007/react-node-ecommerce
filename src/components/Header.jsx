import { Button } from '@material-ui/core';
import React, { Component } from 'react';

export default function Header(props) {
    return (
        <header className="row">
            <div>
                <Button style={{textDecoration:"none", fontSize:"1rem", color:"#ffffff", fontWeight:"bold"}}>SHOPLIFY</Button>
                </div>
           <div>
            <a href="/Cart">Cart</a>
            <a href="/Login">Sign in</a>    
            </div>  
        </header>
    );
}