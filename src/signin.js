import { useEffect, useState } from "react";
import {
    Link,
    Outlet ,
    useNavigate
  } from "react-router-dom";

export default function Signin({setCurUser,How}){

    const [email,setemail] = useState('');
    const [pass,setpass] = useState('');
    const [users,setusers] = useState(JSON.parse(localStorage.getItem("users"))||[])
    const navigate = useNavigate();

    useEffect(function(){
        document.title="Walmart | Signin"
    
        return function(){
            document.title="Walmart"
        }
    },[])

    
    function sub(e){
        e.preventDefault()
        
        if(users.length){
            let finded = users.find(user=>user.email===email)||-1;
            if(finded!==-1){
                if(finded.password!==pass){
                    alert("worng password")
                    return
                }
                localStorage.setItem("curuser",JSON.stringify(finded))
                setCurUser(finded)
                navigate('/')
            }
            else{
                alert("invalid user, please check your Email id")
                return
            }
            // carList.findIndex((car) => car.model=="X5");
            // carList.find((car) => car.model=="X5");
        }
        else{
            alert("no accounts, please create a account first")
            navigate('/createAccount')
        }
        // localStorage.setItem("curuser",email)
        // setCurUser(email)
        // navigate(-1)
    }
    
    return<>
        <div className='sign-con' style={
          How
            ? {
                filter: "blur(5px)",
                // backgroundColor: "rgb(100,0,0)",
                cursor:"not-allowed",
                overflow: "hidden",
              }
            : {}
        }>
            <div className="sign-box">
                <h1 style={{color:"#222"}}>Sign In</h1>
                <p style={{fontSize:"13px"}}>or <Link to="/createAccount" className='create-acc-btn'>create an account</Link></p>
                <form onSubmit={sub}>
                    <div className='signin-input-boxes'>
                        <p>Email</p>
                        <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} required/>
                            <p>Password</p>
                        <input type="password" value={pass} onChange={(e)=>setpass(e.target.value)} required />
                    </div>
                    <button className='signin-btn' type="submit">Sign in</button>
                    <p className='forget-pass-btn'>Forgotten your password?</p>
                </form>
            </div>
            <Outlet />
        </div>
    </>
}