import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import prologo from './images/profile.png'

export default function Profile({curUser,setCurUser,setcartitem,How}){
    const navigate = useNavigate();

    useEffect(function(){
        document.title="Walmart | profile"

        return function(){
            document.title="Walmart"
        }
    },[])
    
    function logout(){
        
        let users = JSON.parse(localStorage.getItem("users"))
        let curuserindex = users.findIndex(us=>us.email===curUser.email)
        // users[curuserindex]={...curUser}
      
        localStorage.removeItem("curuser")
        setcartitem([]);
        setCurUser("");
        navigate("/");
    }
    return <div className='profile-con' style={
        How
          ? {
              filter: "blur(5px)",
              // backgroundColor: "rgb(100,0,0)",
              cursor:"not-allowed",
              overflow: "hidden",
            }
          : {}
      }>
            <div className='profile-box'>
                <img src={curUser.dp||prologo} className='pro-logo'/>
                    <h2>My Profile</h2>
                    <table id='customers' className='pro-tab'>
                        <tr><td>Name</td><td>{curUser.name}</td></tr>
                        <tr><td>Email</td><td>{curUser.email}</td></tr>
                        <tr><td>Phone</td><td>{curUser.phone}</td></tr>
                    </table>
                    <button className='crt-acc-sub-btn' onClick={()=>logout()}>Logout</button>
                
            </div>
    </div>
}