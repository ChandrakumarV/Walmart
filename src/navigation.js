import downarrow from './images/down-arrow.png'
import uparrow from './images/Up-arrow.png'
import loclogo from './images/location.png'
import howlogo from './images/how.png'

function Navigation({children,setHow,How}) {

  return <>
    <div className='nav-con'>
      <div className='left-nav' onClick={() => { setHow((s) => s === true ? false : true) }}>
        <img className="howlogo" src={howlogo} alt=""/>
        <a>How do you want your items?</a>
        <img src={How ?uparrow: downarrow } className="arrow" alt="" />
        <p>|</p>
        <img className="location" src={loclogo} alt="" />
        <p>Karur, Tamilnadu, 639004</p>
      </div>
      
      {children}
      <div className='right-nav'>
        <a>Deals</a>
        <a>Grocery & Essentials</a>
        <a>Summer Shop</a>
        <a>Back to School</a> 
        <a>Barbie</a>
        <a>Collector Con</a>
        <a>Fashion</a>
        <a>Home</a>
        <a>Electronics</a>
        <a>Registry</a>
        <a>Walmart+</a>
      </div>
    </div>
  </>
}



export default Navigation;