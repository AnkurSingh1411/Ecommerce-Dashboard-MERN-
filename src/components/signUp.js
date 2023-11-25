import React , {useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom'

const Signup = ()=>{
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate()
    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if (auth){
            navigate('/a')
        }
    })
    const onClickFunc = async()=>{
        console.warn(name,email,password)
        let result = await fetch('http://localhost:3001/post', {
            method : 'post',
            body : JSON.stringify({name,email,password}),
            headers :{
                'Content-Type' : 'application/json'
            },

        })
        result = await result.json()
        console.warn(result,"data has been saved")
        if (result.auth){
            localStorage.setItem("user", JSON.stringify(result.data))
            localStorage.setItem("token", JSON.stringify(result.auth))
            navigate('/');
        }
        
    }
const loginNav = ()=>{
    navigate('/login')
}
    
    return (
        <div><h1 className="h1class">Signup Page</h1>
        <input className="inputBox" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"></input>
        <input className="inputBox" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"></input>
        <input className="inputBox" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"></input>
        <button onClick= {onClickFunc} type="button" >Signup </button>
        <button  type="button"  onClick={loginNav}  >Login </button>
        </div> )
}

export default Signup


    

