import React from "react";
import SignIn from "./SignIn";

function Home(props) {
  return (
    <div classname="Home">
      <h1>Welcome {props.name}</h1>
      <button onClick={()=> <SignIn/>}>LogOut</button>
    </div>
  )
}

export default Home
