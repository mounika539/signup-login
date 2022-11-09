import React,{useEffect, useState,useRef} from 'react';
import SignIn from './SignIn'
//import { Validator } from 'react';
const Login = () => {
    const userRef=useRef();
  //  const navigate=useNavigate();
    const errRef=useRef();
    const [user,setUser]=useState('');
    const [pwd,setPwd]=useState('');
   const [name,setName]=useState('');
   const [email,setEmail]=useState('');
    const [errMsg,setErrMsg]=useState('');
   const [cpwd,setCpwd]=useState('');
    const [success,setSuccess]=useState(false);
    useEffect(()=>{
        userRef.current.focus();
     },[])
     useEffect(()=>{
        setErrMsg('');
     },[user,pwd])
    const handleSubmit= async(e)=>{
            e.preventDefault();
            setUser('');
            setPwd('');
            setSuccess(true);
    }
   const checkValidation=(e)=>{
   setCpwd(e.target.value);
   if(pwd!==cpwd)
    {
        setErrMsg("passwords doesnot match");
        setSuccess(false);
    }
   
}
  return (
    <>
{success?(
    <section>
         <SignIn/>
    </section>
    ) : (
   <section>
    <p ref={errRef} className={errMsg?"errMsg":"offscreen"} aria-live="assertive">{errMsg}</p>
    <h1>Sign-Up</h1>
    <form onSubmit={handleSubmit}>
        <input 
                type='text'
                id='name'
                ref={userRef}
                autoComplete="off"
                onChange={(e)=>setName(e.target.value)}
                value={name}
                required
                placeholder='Name'
        /><br/><br/>
        <input 
                type='email'
                id='email'
                autoComplete="off"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                required
                placeholder='Email'
        /><br/><br/>
                <input 
                type='password'
                id='password'
                onChange={(e)=>setPwd(e.target.value)}
                value={pwd}
                required
                placeholder='Password'
        /><br/><br/>
                <input 
                type='password'
                id='cpassword'
                onChange={(e)=>checkValidation(e)}
                value={cpwd}
                required
                placeholder='Confirm Password'
        /><br/><br/>
        <button>Sign Up</button>


    </form>
    <p>
        Already have an Account?<br/>
        <span className='line'>
            {/* put router link here */}
             {/* <a href="#">Sign In</a> */}
        </span>
    </p>
   </section>
    )
    }
  </>
)}
export default Login
