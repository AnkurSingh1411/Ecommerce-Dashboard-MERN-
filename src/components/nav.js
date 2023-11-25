import React from "react";
import { Link,useNavigate} from "react-router-dom";
const Nav= ()=>{

    const auth = localStorage.getItem("user");
    const navigate = useNavigate()
    const Logout = ()=>{
        localStorage.clear()
        navigate('/signup')
    }
    return (
        <div>
            <img alt="logo" className = "logo" src = "data:image/png;base64,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" />
            {auth ?
            <ul className="nav-ui">
                <li>   <Link to="/products"> Products</Link> </li>
                <li>   <Link to="/add" > Add Product</Link> </li>
                {/* <li>   <Link to="/update"> Update Product</Link> </li> */}
                <li>   <Link to="/profile"> Profile</Link> </li>
                <li>   <Link onClick= {Logout}to="/signup"> Logout ( {JSON.parse(auth).name} )</Link> </li> 
                
                </ul> 
                :
                <ul className="nav-ui nav-right">
          
           <li><Link to="/signup"> Signup</Link></li> 
           <li> <Link to="/login"> Login</Link> </li>
           </ul>
}
        </div>
    )
}

export default Nav;