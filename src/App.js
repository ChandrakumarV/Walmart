import "./App.css";

import ProductsCart from "./ProductsCart";
import Gallery from "./gallery";
import Header from "./header";
import Footer from "./footer";
import Navigation from "./navigation";
import { useEffect, useState } from "react";
import Actioncart from "./action cart";
import Atm from "./atm";
import Gallery2 from "./gallery2";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  Navigate,
  useNavigate
} from "react-router-dom";
import Cart from "./cart";
import Signin from "./signin";
import Createaccount from "./CreateAcc";
import Profile from "./profile";

import shiplogo from './images/shipping.png'
import picklogo from './images/pickup.png'
import deliverylogo from './images/delivery.png'
import locblacklogo from './images/locationB.png'
import fillstart from './images/fillstar.png'
import nostart from './images/nostar.png'
import homelogo from './images/home.png'
import rightarrow from './images/right-arrow.png'

import {data} from './data/data'


function App() {
  const [curpro, setcurpro] = useState(1);
  const [search, setsearch] = useState("");
  const [datarray, setdatarray] = useState(data);
  const [How, setHow] = useState(false);
  const [curUser,setCurUser] =useState(JSON.parse(localStorage.getItem("curuser"))||"")
  const [cartitem,setcartitem] = useState(JSON.parse(localStorage.getItem("curuser"))?.cart||[])
  

  const filteredData = filterArrayBySearchQuery(datarray, search);

  let cartitems = cartitem.length;
  let cartprice = 0;
  cartitem.map((it) =>(cartprice += it.amt));

  function winclic() {
    setHow((s) => (s === true ? false : true));
  }

  function addcartitem(newitem){
    setcartitem(old=>[...old,newitem]);
    
  }

  function removecartitem(newitem){
    setcartitem(cartitem.filter(item=>item.id!==newitem.id))
  }

  function clearcartitem(){
    setcartitem([]);
  }

  useEffect(()=>{
    window.localStorage.setItem("temCart",JSON.stringify(cartitem))
    if(curUser){
      let tem = {...curUser,cart:cartitem}
      window.localStorage.setItem("curuser",JSON.stringify(tem))
      // setCurUser(tem)
    }

    if(curUser){
        let users = JSON.parse(localStorage.getItem("users"))
        let curuserindex = users.findIndex(us=>us.email===curUser.email)
        users[curuserindex].cart=cartitem;
        localStorage.setItem("users",JSON.stringify(users))
    }
  },[cartitem])

  useEffect(function(){
    let a = JSON.parse(localStorage.getItem("curuser"))?.cart||[]
    if(a)
    setcartitem(a)
  },[curUser])

  

  return (
    <>
      <Router basename="/walmart">
        <div className="hole_content">

        <Header
          search={search}
          setsearch={setsearch}
          cartitems={cartitems}
          cartprice={cartprice}
          curUser={curUser}
        />
        <Navigation setHow={setHow} How={How}>
          {How ? <WantItem /> : null}
        </Navigation>

        <Routes>
          <Route
            path="/"
            element={
              <Index
                setcurpro={setcurpro}
                How={How}
                search={search}
                filteredData={filteredData}
                setdatarray={setdatarray}
                cartitem={cartitem}
                addcartitem={addcartitem}
                removecartitem={removecartitem}
                setcartitem={setcartitem}
                
              />
            }
          />
          <Route path="/:names" element={<Singleproduct datarray={datarray} setdatarray={setdatarray} cartitem={cartitem} addcartitem={addcartitem} removecartitem={removecartitem}/>} />
          <Route path="/cart" element={<Cart cartitem={cartitem} How={How} removecartitem={removecartitem} clearcartitem={clearcartitem} cartprice={cartprice}/>} />
          <Route path="/signin" element={<Signin setCurUser={setCurUser} How={How}/>} />
          <Route path="/createAccount" element={<Createaccount How={How}/>} />
          <Route path="/profile" element={<Profile curUser={curUser} setCurUser={setCurUser} setcartitem={setcartitem} How={How}/>} />
          <Route path="*" element={<Err curpro={curpro} />} />

          
        </Routes>
        <Footer />
          </div>
      </Router>
    </>
  );
}

function filterArrayBySearchQuery(array, query) {
  const lowerCaseQuery = query.toLowerCase().trim();

  const filteredArray = array.filter((item) => {
    const lowerCaseName = item.name.toLowerCase();
    return lowerCaseName.includes(lowerCaseQuery);
  });

  return filteredArray;
}
function Singleproduct({ datarray,setdatarray,cartitem,addcartitem,removecartitem }) {
  const { names } = useParams();
  const [title,settitle]  = useState("Walmart");
  let name = names;

  useEffect(()=>{
    if(title!=="Walmart")
    document.title="Walmart | "+title;

    return ()=>{
      document.title="Walmart"
    }
  },[title])
  return (
    <>
      {datarray.map((item) => item.name === name && <Productpage item={item} setdatarray={setdatarray} settitle={settitle} cartitem={cartitem} addcartitem={addcartitem} removecartitem={removecartitem}/>)}


      <Link to="/" className="go_back" >go back</Link>
    </>
  );
}
function Err({ curpro }) {
  return (
    <>
      <h2>Error</h2>
      {/* <Link to="/walmart-chandru">go back</Link> */}
      <img src={curpro.img} alt="" />
    </>
  );
}
function Index({ setcurpro, How, search, filteredData, setdatarray,cartitem ,addcartitem,removecartitem,setcartitem}) {

  return (
    <>
      <div
        className="container"
        style={
          How
            ? {
                filter: "blur(5px)",
                // backgroundColor: "rgb(100,0,0)",
                cursor:"not-allowed",
                overflow: "hidden",
              }
            : {}
        }
        // onClick={winclic}
      >
        {search === "" && <Gallery />}
        <ProductsCart
          search={search}
          datarray={filteredData}
          setdatarray={setdatarray}
          setcurpro={setcurpro}
          addcartitem={addcartitem}
          removecartitem={removecartitem}
          cartitem={cartitem}
          setcartitem={setcartitem}
        />
        {search === "" && <Actioncart />}
        {search === "" && <Atm />}
        {search === "" && <Gallery2 />}
      </div>
    </>
  );
}

function WantItem() {
  return (
    <>
      <div className="wantitem">
        <div className=" devLogos">
          <div className="item ship">
            <img src={shiplogo} />
            <p>Shipping</p>
          </div>
          <div className="item pick">
            <img src={picklogo} />
            <p>Pickup</p>
          </div>
          <div className="item dev">
            <img src={deliverylogo} />
            <p>Delivery</p>
          </div>
        </div>

        <div className="address">
          <div className="add-con">
            <img src={locblacklogo} />
            <div className="addCon">
              <p>Add an address for shipping and delivery</p>
              <p>karur, 639004</p>
            </div>
          </div>
          <button>Add Address</button>
        </div>

        <div className="homeAdd">
          <img className="home-logo" src={homelogo}/>
          <div>
            <p>Chandrakumar</p>
            <p>Pasupathipalayam,karur-639004</p>
          </div>
          <img className="right-arrow" src={rightarrow} />
        </div>
      </div>
    </>
  );
}

function Productpage({ item,settitle,cartitem,addcartitem,removecartitem}) {
  const [imachange,setimgchange] = useState(item.img)
  const [isoncart, setisoncart] = useState(false);

  const navi = useNavigate();

  function handlebtn() {
    let curuser = JSON.parse(localStorage.getItem("curuser"))
    if(curuser){
      isoncart ? removecartitem(item) : addcartitem(item);
      setisoncart((i) => !i);
    }
    else{
      alert("Please signin first")
      navi('/signin')
    }
  }
  // function handlebtn() {
  //   isoncart ? removecartitem(item) : addcartitem(item);
  //   setisoncart((i) => !i);
  // }

  useEffect(()=>{
    window.scrollTo(200,0);
    settitle(item.name)
    cartitem.map(itm=>itm.id===item.id&&setisoncart(true))
  },[])

  var dt=new Date();
  dt.setDate(dt.getDate()+5)

  return (
    <>
      <div className="pro-page-con" style={{}}>
        <marquee direction="right" className="blink">
          Today 10% Offer Flat $150 off on $2000 , Flat $200 on $3000
        </marquee>

        <div className="pro-con">
          <div className="pro-imgs">
            <div className='other-imgs' onMouseEnter={()=>setimgchange(item.img)}><img src={item.img}/></div>
            <div className='other-imgs' onMouseEnter={()=>setimgchange(item.img1)}><img src={item.img1}/></div>
            <div className='other-imgs' onMouseEnter={()=>setimgchange(item.img2)}><img src={item.img2}/></div>
            <div className='other-imgs' onMouseEnter={()=>setimgchange(item.img3)}><img src={item.img3}/></div>
          </div>

          <div className="pro-img">
            <img src={imachange} />
          </div>

          <div className="pro-dis">
            <p style={{ textDecoration: "underline", fontSize: "12px" }}>
              {item.seller}
            </p>
            <h1>{item.name}</h1>

            <p className="pro-cata">{item.catagory}</p>
            <p
              className="best-sel"
              style={item.star < 3 ? { borderColor: "red", color: "red" } : {}}
            >
              {item.star < 3 ? "Worst Seller" : "Best Seller"}
            </p>
            <Star Nstar={item.star} />
            <p className="pro-dis-para">
              Lorem Ipsum is simply dummy text of the essentially unchanged. It
              was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <span className="pro-price">
              <h1><span style={{color:"red"}}>₹</span> {item.amt} </h1>
                <p><del className='del-amt'>{item.amt + 200}</del></p>
            </span>
            <p style={{color:"green"}}>In stock</p>
            <button className='sin-buy-now'>Buy Now</button>
            <button className='sin-buy-now' onClick={handlebtn} style={isoncart?{backgroundColor:"#f09300"}:{}} >{isoncart?"Remove":"Add to cart"}</button>

            <div className="bank-offer">
              <p>💥 Offers</p>
              <div className="banks-con">
                  <div className="banks">
                    <h5>No cost EMI</h5>
                    <p>Upto $10% EMI interest savings on select Credit cards</p>
                    <a>Learn More> </a>
                  </div>
                  <div className="banks">
                    <h5>Bank Offer</h5>
                    <p>Upto $12% discount on SBI Credit Cards</p>
                    <a>Learn More> </a>
                  </div>
                  <div className="banks">
                    <h5>Partner Offer</h5>
                    <p>Get up to 4 Months Audible Membership With purchase of Product</p>
                    <a>Learn More> </a>
                  </div>
                  <div className="banks">
                    <h5>No cost EMI</h5>
                    <p>Upto $10% EMI interest savings on select Credit cards</p>
                    <a>Learn More> </a>
                  </div>
              </div>
            </div>

            <h4 style={{color:"green"}}>FREE delivery on {dt.toDateString()}</h4>
          </div>
        </div>

        <div className='pro-down-description'>
          <div className='pro-des'>
            <div className='pro-des-img'>
              <img src={item.img1}/>
            </div>
            <div className='pro-des-para'> 
                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section pro-des-1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          </div>
        </div>

        <div className='pro-down-description'>
          <div className='pro-des'>
            <div className='pro-des-para'> 
                <p >Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section pro-des-1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <div className='pro-des-img'>
              <img src={item.img2}/>
            </div>
          </div>
        </div>


        <div className='pro-down-description'>
          <div className='pro-des'>
            <div className='pro-des-img'>
              <img src={item.img3}/>
            </div>
            <div className='pro-des-para'> 
                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section pro-des-1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          </div>
        </div>

        <div className='pro-down-description'>
          <div className='pro-des'>
            <div className='pro-des-para'> 
                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section pro-des-1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <div className='pro-des-img'>
              <img src={item.img}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Star({ Nstar }) {
  const [rate, setrate] = useState(Nstar);
  return (
    <div className="single-pro-stars stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Starlist full={rate >= i + 1} />
      ))}
      <span>Reviews ({rate * 234})</span>
    </div>
  );
}

function Starlist({ full }) {
  return (
    <span className="sinstar">
      {full ? (
        <img src={fillstart} alt="SVG as an image" alt="" />
      ) : (
        <img src={nostart} alt="SVG as an image" alt="" />
      )}
    </span>
  );
}
export default App;
