import React , {useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom'

const Login = ()=>{
   
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate()
    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if (auth){
            navigate('/a')
        }
    })
    const onClickFunc = async()=>{
        console.warn(email,password)
        let result = await fetch('http://localhost:3001/login', {
            method : 'post',
            body : JSON.stringify({email,password}),
            headers :{
                'Content-Type' : 'application/json'
            },

        })
        result = await result.json()
        console.warn("Jo bhi result hai ===", result?.data)
        if (result.auth){
            localStorage.setItem("user", JSON.stringify(result?.data))
            localStorage.setItem("token", JSON.stringify(result?.auth))
            navigate('/');
        }
        else {
            alert("please enter correct details")
        }    
    }
    
    return (
        <div><h1 className="h1class">Alreay a User?? Please Login Here</h1>
        {/* <input className="inputBox" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"></input> */}
        <input className="inputBox" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"></input>
        <input className="inputBox" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"></input>
        <button type="button" onClick={onClickFunc} >Login </button>
        </div> )
}

export default Login


    

