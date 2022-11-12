import React ,{useState}from "react";
import SignIn from "./SignIn";
function Home(props) {
  const [isLogin,setIsLogin]=useState(false);
  return (
    <div>
         {isLogin?(<div><SignIn/></div>):(
         <div>
            <h1>Welcome {props.uname}</h1>
            <button onClick={()=>setIsLogin(true)}>LogOut </button>
         </div>)}
    </div>
  )
}
export default Home
