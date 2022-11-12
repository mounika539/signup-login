import React from "react";
import {useNavigate} from 'react-router-dom'
function Home(props) {
  const navigate=useNavigate();


  const handleClick=()=>{
      navigate('/signin')
  }
  return (
    <div classname="home">
      <h1>Welcome {props.name}</h1>
      <button onClick={handleClick}>LogOut</button>
    </div>
  )
}

export default Home
