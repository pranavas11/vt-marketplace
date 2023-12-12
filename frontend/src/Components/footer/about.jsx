import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import marketplaceGraphic from '../../assets/marketplace.png';
import vtLogo from '../../assets/vt.png';

function About() {
    const navigate = useNavigate();

    const goToItemsPage = () => {
        navigate('/items');
    };
    
    return (
        <div className="about-page">
            <nav className="topnav">
                <div className="nav-content">
                    <img src={vtLogo} alt="VT Logo" className="vt-logo" />
                    <NavLink to="/home" activeClassName="active">Home</NavLink>
                    <NavLink to="/blog" activeClassName="active">Blog</NavLink>
                    <NavLink to="/buying" activeClassName="active">Buying</NavLink>
                    <NavLink to="/sell_page" activeClassName="active">Selling</NavLink>
                    <NavLink to="/securitas" activeClassName="active">Trust & Safety</NavLink>
                </div>
                <button className="marketplace-button" onClick={goToItemsPage}>GO TO MARKETPLACE</button>
            </nav>

            <div className="about-header">
                <img src={marketplaceGraphic} alt="Marketplace" className="about-image" />
                <h1>VT Marketplace</h1>
            </div>

            <div className="about-content">
                <h3>You can use Marketplace to buy and sell items with fellow Hokies online.</h3> <br></br>
                <h2>Learn more about:</h2>
                <ul>
                    <li><NavLink to="/responsibility">Buying and selling responsibly on VT Marketplace.</NavLink></li>
                    <li><NavLink to="/accessibility">Accessing VT Marketplace.</NavLink></li>
                    <li><NavLink to="/finding_things">Finding things to buy on VT Marketplace by searching for a specific item or browsing categories.</NavLink></li>
                    <li><NavLink to="/selling_locally">Selling locally on VT Marketplace.</NavLink></li>
                    <li><NavLink to="/ratings">How ratings work on VT Marketplace.</NavLink></li>
                    <li><NavLink to="/tips">Tips for shopping safely and avoiding scams on VT Marketplace.</NavLink></li>
                </ul> <br></br>
                <p><b>Keep in mind that items on Marketplace must follow our <a href="/commerce">Commerce Policies</a>.</b></p> <br></br>
            </div>

            <div className="about-footer">
                <h2>Popular Articles</h2>
                <a href="/accessibility">I can't access VT Marketplace</a>
                <a href="/usability">Who can use VT Marketplace</a>
                <a href="/selling_locally">Selling on VT Marketplace</a>
                <a href="/marketplace_help">Get Help with Marketplace</a>
            </div>

            <footer className="footer-nav">
                <div className="footer-links">
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/privacy">Privacy</NavLink>
                    <NavLink to="/terms">Terms</NavLink>
                    <NavLink to="/cookies">Cookies</NavLink>
                    <NavLink to="/help">Help</NavLink>
                </div>
                <div className="footer-rights">
                    © Virginia Tech Marketplace. All Rights Reserved.
                </div>
            </footer>
        </div>
    )
}

export default About;