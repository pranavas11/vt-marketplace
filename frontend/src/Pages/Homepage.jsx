// Homepage.jsx
import React, { useState } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import '../App.css';
import { NavLink, useNavigate } from 'react-router-dom';
import vtLogo from '../assets/vt.svg';
import people_icon from '../assets/people.svg';
import freeToUseIcon from '../assets/free-to-use.svg';
import hokiesIcon from '../assets/hokie-bird.svg';
import connectWithOthersIcon from '../assets/connect-with-others.svg';
import buying_items1 from '../assets/buying_items1.svg';
import buying_items2 from '../assets/buying_items2.svg';
import selling_items from '../assets/selling_items.svg';
import commercePoliciesImg from '../assets/commerce_policy.svg';
import boostedListingsImg from '../assets/boosted_listing.svg';
// You can import NavLink if you need navigation links on your homepage.

function Homepage() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
    
  const goToItemsPage = () => {
    navigate('/items'); // This path should match the route path defined in App.jsx
  };
  
  return (
    <div className="App">
      <nav className="topnav">
        <div className="nav-content">
          <img src={vtLogo} alt="VT Logo" className="vt-logo" />
          <NavLink to="/Homepage" activeClassName="active">VT Marketplace</NavLink>
          <NavLink to="/blog" activeClassName="active">Blog</NavLink>
          <NavLink to="/buying" activeClassName="active">Buying</NavLink>
          <NavLink to="/selling" activeClassName="active">Selling</NavLink>
          <NavLink to="/trust-and-safety" activeClassName="active">Trust & Safety</NavLink>
        </div>
        <button className="marketplace-button" onClick={goToItemsPage}>
          GO TO MARKETPLACE
        </button>
      </nav>

      <h1> Discover, buy, and sell goods with the new VT Marketplace App.</h1>

      <img src={people_icon} alt="People using VT Marketplace App" className='people-icon' />

      <h3>VT Marketplace is an e-commerce platform dedicated towards the Virginia Tech community that connects sellers and buyers through meaningful interactions and unique goods.</h3>

      <h2>Why people love VT Marketplace</h2>
      <div className="benefits-section">
        <div className="benefit">
          <img src={freeToUseIcon} alt="Free to use icon" className="icon" />
          <h4>Free to use</h4>
          <p>Any Virginia Tech Hokie can list or buy items with no hidden fees</p>
        </div>
        <div className="benefit">
          <img src={hokiesIcon} alt="VT Hokies" className="icon" />
          <h4>VT Hokies</h4>
          <p>Browse and buy, or list and sell items to other Virginia Tech Hokies</p>
        </div>
        <div className="benefit">
          <img src={connectWithOthersIcon} alt="Connect with others icon" className="icon" />
          <h4>Connect with others</h4>
          <p>Whether you're selling or buying, you can chat with others through the Marketplace Messenger</p>
        </div>
      </div>

      <br></br> <br></br> <br></br>

      <div className="buying-section">
        <h2>Buying on VT Marketplace</h2>
        <p>Discover unique items, from home decor to trendy fashion. You never know what you’ll find and fall in love with thousands of items from other Hokies!</p>
        <div className="buying-buttons">
          <button onClick={goToItemsPage}>Start shopping</button>
          <button onClick={() => navigate('/more-for-buyers')}>More for buyers</button>
        </div>
      </div> <br></br>

      <div className='buying-items'>
        <img src={buying_items1} alt="shopping items image 1" />
        <img src={buying_items2} alt="shopping items image 2" />
      </div>

      <br></br> <br></br> <br></br>

      <div className="selling-section">
        <h2>Selling on VT Marketplace</h2>
        <p>Easily sell new or pre-loved items locally at the snap of a finger!</p>
        <div className="selling-buttons">
          <button onClick={() => navigate('/start-selling')}>Start selling</button>
          <button onClick={() => navigate('/more-about-selling')}>More about selling</button>
        </div>
      </div>

      <div className='selling-items'>
        <img src={selling_items} alt="selling items image" />
      </div>

      <br></br>

      <h2 className="resources">Resources</h2>
      <div className="resources-section">
        <div className="resource">
          <a href="/commerce-policies" className="resource-link">
            <img src={commercePoliciesImg} alt="Commerce Policies" className="resource-image" />
            <h3>Commerce Policies</h3>
            <p>Products sold through VT Marketplace must comply with our Commerce Policies. Buyers and sellers are also responsible for complying with all applicable laws and regulations.</p>
          </a>
        </div>
        <div className="resource">
          <a href="/boosted-listings" className="resource-link">
            <img src={boostedListingsImg} alt="Boosted Listings" className="resource-image" />
            <h3>Boosted Listings</h3>
            <p>To reach more potential buyers for your Marketplace item, you can boost your listing. Your listing then turns into a featured item so more people can see it, which may help you to sell your item faster.</p>
          </a>
        </div>
      </div>

      <br></br> <br></br> <br></br>

      <footer className="footer-nav">
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/cookies">Cookies</a>
          <a href="/help">Help</a>
        </div>
        <div className="footer-rights">
          © Virginia Tech Marketplace. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default Homepage;