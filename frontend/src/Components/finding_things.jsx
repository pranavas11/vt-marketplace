import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import vtLogo from '../assets/vt.png';


function Finding() {
    // naviagting through the pages
    const goToItemsPage = () => {
        navigate('/items');
    };



    return (
        <div className="privacy-container">
            <nav className="topnav">
                <div className="nav-content">
                    <img src={vtLogo} alt="VT Logo" className="vt-logo" />
                    <NavLink to="/home" activeClassName="active">Home</NavLink>
                    <NavLink to="/blog" activeClassName="active">Blog</NavLink>
                    <NavLink to="/buying" activeClassName="active">Buying</NavLink>
                    <NavLink to="/selling" activeClassName="active">Selling</NavLink>
                    <NavLink to="/securitas" activeClassName="active">Trust & Safety</NavLink>
                </div>
                <button className="marketplace-button" onClick={goToItemsPage}>GO TO MARKETPLACE</button>
            </nav>

            <h1>Finding Items to buy through VT Marketplace</h1>

            

        </div>
    );

}

export default Finding;