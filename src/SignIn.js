import React,{useEffect, useState,useRef} from 'react';
import Home from './Home';
const SignIn = (props) => {
   // const userRef=useRef();
    const errRef=useRef();
    const [pwd,setPwd]=useState('');
   const [email,setEmail]=useState('');
    const [errMsg,setErrMsg]=useState('');
    const [success,setSuccess]=useState(false);
    // useEffect(()=>{
    //     userRef.current.focus();
    //  },[])
     useEffect(()=>{
        setErrMsg('');
     },[email,pwd])
    const handleSubmit= async(e)=>{
            e.preventDefault();
            setPwd('');
            setSuccess(true);
    }
  return (
    <>
    {success?(
        <section>
          <Home  name={props.name}/>
        </section>
    ) : (
   <section>
    <p ref={errRef} className={errMsg?"errMsg":"offscreen"} aria-live="assertive">{errMsg}</p>
    <h1>Sign-In</h1>
    <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email:</label>
        <input 
                type='email'
                id='email'
                autoComplete="off"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                required
        /><br/><br/>
        <label htmlFor='password'>Password</label>
                <input 
                type='password'
                id='password'
                onChange={(e)=>setPwd(e.target.value)}
                value={pwd}
                required
        /><br/><br/>
        <button>Sign In</button>
    </form>
   </section>
    )
    }
  </>
)}
export default SignIn
