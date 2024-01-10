import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link,useNavigate } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import fillstart from './images/fillstar.png'
import nostart from './images/nostar.png'

export default function ProductsCart({
  search,
  datarray,
  setdatarray,
  cartitem,
  addcartitem,
  removecartitem,
  setcartitem
}) {
  const [sorttype, setsorttype] = useState("name");
  const [sortcat, setsortcat] = useState("all");

  function cartt(seletedId) {
    setdatarray((items) =>
      items.map((item) =>
        item.id === seletedId ? { ...item, cart: !item.cart } : item
      )
    );
  }

  let sortedarray = [];

  sortedarray =
    sorttype === "name"
      ? datarray.slice().sort((a, b) => a.name.localeCompare(b.name))
      : sorttype === "amt"
      ? datarray.slice().sort((a, b) => a.amt - b.amt)
      : sorttype === "cat" &&
        datarray.slice().sort((a, b) => a.catagory.localeCompare(b.catagory));

  sorttype === "cat" &&
    (sortedarray =
      sortcat === "all"
        ? datarray
        : sortcat === "wat"
        ? datarray.filter((item) => item.catagory.includes("Watch"))
        : sortcat === "tab"
        ? datarray.filter((item) => item.catagory.includes("Tablets"))
        : sortcat === "mon" &&
          datarray.filter((item) => item.catagory.includes("Monitors")));


    
  return (
    <div className="products_container">
      <div className="sortbtns">
        <p>Electronics Items</p>
        {search === "" && (
          <select
            value={sorttype}
            onChange={(e) => setsorttype(e.target.value)}
            className="sortbtn"
          >
            <option value={"name"}>Sort by</option>
            <option value={"cat"}>catagory</option>
            <option value={"amt"}>amount</option>
          </select>
        )}

        {sorttype === "cat" && (
          <select
            className="sortbtn"
            value={sortcat}
            onChange={(e) => setsortcat(e.target.value)}
          >
            <option value={"all"}>All</option>
            <option value={"mon"}>Monitor</option>
            <option value={"tab"}>Tablet</option>
            <option value={"wat"}>Watch</option>
          </select>
        )}
      </div>
      <Products
        sortedarray={sortedarray}
        cartitem={cartitem}
        addcartitem={addcartitem}
        removecartitem={removecartitem}
      />
    </div>
  );
}

function Products({ sortedarray, cartitem, addcartitem, removecartitem }) {
  return (
    <div className="product_items">

      {sortedarray.map((item, i) => (
        <Productlist
          key={i}
          item={item}
          cartitem={cartitem}
          addcartitem={addcartitem}
          removecartitem={removecartitem}
        />
      ))}
    </div>
  );
}

function Productlist({ item, cartitem, addcartitem, removecartitem }) {
  const [isoncart, setisoncart] = useState(false);
  const navigate = useNavigate();

  useEffect(function(){
    cartitem.map(itm=>itm.id===item.id&&setisoncart(true))
  },[cartitem])
  

  function handlebtn() {
    let curuser = JSON.parse(localStorage.getItem("curuser"))
    if(curuser){
      isoncart ? removecartitem(item) : addcartitem(item);
      setisoncart((i) => !i);
    }
    else{
      alert("Please signin first")
      navigate('/signin')
    }

  }
 

  return (
    <div className="item">
      <div className="itemimg">
        <img src={item.img} alt="" />
      </div>
      <div className="discripsion">
        <h3 className="price">
          <span style={{ color: "red" }}>₹</span>
          {item.amt}
        </h3>
        <h3>{item.name}</h3>
        <p>{item.seller}</p>
        <Star Nstar={item.star} />
      </div>

      <div className="cart-buy-btns">
        {/* <button onClick={() => cartt(item.id)}> */}
        <button onClick={handlebtn} style={isoncart?{backgroundColor:"#f09300"}:{}}>
          {isoncart ? "Remove" : "Add to Cart"}
        </button>
        <Link to={`/${item.name}`} className="buy-btn">
          <button>Buy Now</button>
        </Link>
      </div>
    </div>
  );
}


function Star({ Nstar }) {
  const [rate, setrate] = useState(Nstar);
  const [temrate, setemrate] = useState(0);
  return (
    <div className="stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Starlist
          full={temrate ? temrate >= i + 1 : rate >= i + 1}
          inrate={() => setemrate(i + 1)}
          outrate={() => setemrate(0)}
          onsetrate={() => setrate(i + 1)}
        />
      ))}
      <span>{temrate ? temrate : rate}</span>
    </div>
  );
}

function Starlist({ full, inrate, outrate, onsetrate }) {
  return (
    <span
      className="sinstar"
      onClick={onsetrate}
      onMouseEnter={inrate}
      onMouseLeave={outrate}
    >
      {full ? (
        <img src={fillstart} alt="dsf" />
      ) : (
        <img src={nostart} alt="dssdf" />
      )}
    </span>
  );
}
