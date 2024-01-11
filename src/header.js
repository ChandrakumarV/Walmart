import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

import headlogo from './images/walmartLogo.svg'
import departlogo from './images/department.svg'
import serrvicelogo from './images/serviceLogo.svg'
import searchlogo from './images/search.svg'
import heartlogo from './images/heart .svg'
import signinlogo from './images/signin.svg'
import cartlogo from './images/cart.png'
import prologohead from './images/profile-head.png'

function Header({ search, setsearch, cartitems, cartprice,curUser }) {
  

  useEffect(()=>{
  },[curUser])
  return (
    <div className="header">
      
      <Link to="/">
        <img src={headlogo} />
      </Link>

      <div className="department header-dep-ser mquery">
        <img src={departlogo} style={{width:"18px",fill:"white"}}/>
        <p className="dep-ser-p">Departments</p>
      </div>

      <div className="services header-dep-ser mquery">
        <img src={serrvicelogo} style={{width:"23px",fill:"white"}}/>
        <p className="dep-ser-p">Services</p>
      </div>

      <div className="search">
        <input
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          className="header-search"
          placeholder="Search everything at Walmart online and in store"
        />
        <img src={searchlogo}  className="search-logo" />
      </div>

      <div className='myOrder mquery myitems'>
        <img src={heartlogo} className="order-logo" style={{width:"20px"}} />
        <div className="order-list">
          <p>Reorder</p>
          <p>MyItems</p>
        </div>
      </div>
      {curUser?<Link to="/profile" className='profile-com'>
        <div className="myOrder mprofile sign-com">
          <img src={curUser.dp} className='pro-logo-header'/>
          <div className="order-list">
            <p style={{textDecoration:"none"}} className='profile-text'>{/*curUser.name*/}My Profile</p>
          </div>
        </div>
      </Link>:<Link to="/signin" className='sign-com'>
        <div className="myOrder mquer sign-com">
        <img src={signinlogo} className="order-logo" style={{width:"20px"}} />

          <div className="order-list">
            <p>Sign in</p>
            <p>Accounts</p>
          </div>
        </div>
      </Link>}

      <Link to="/cart" className='cart-link'>
        <div className="cart">
          <div className="items">
            <img className="cartLogo" src={cartlogo} />
            <p className="cartNo">{cartitems}</p>
          </div>
          <p>₹{cartprice}</p>
        </div>
      </Link>
    </div>
  );
}

export default Header;
