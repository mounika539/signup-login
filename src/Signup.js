import React, { useEffect, useState } from 'react'
import SignIn from './SignIn';
function Signup() {
    const initialValues={
        username:"",
        email:"",
        password:"",
        cpassword:""
    }
    const [data,setData]=useState([]); 
    const [isLogin,setIsLogin]=useState(false);
    const [formValues,setFormValues]=useState(initialValues);
    const [formErrors,setFormErrors]=useState({});
    const [isSubmit,setIsSubmit]=useState(false);
    const [isSuccess,setIsSuccess]=useState(false);
    const handleChange=(e)=>{
           const {name,value}=e.target;
           setFormValues({...formValues,[name]:value}); 
           console.log(e.target.value);
    };
    const handleSubmit=(e)=>{
            e.preventDefault();
            setFormErrors(validate(formValues));
            setIsSubmit(true);
            localStorage.setItem("user",JSON.stringify([...data,formValues]));

    }
    useEffect(()=>{
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues);
        }
    },[formErrors]);
    const validate=(values)=>{
        const errors={};
        const regex=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.username){
            errors.username="Username is required";
        }
        if(!values.email){
            errors.email="email is required"
        }else if(!regex.test(values.email)){
            errors.email="this.is not a valid email format"
        }
        if(!values.password){
            errors.password="password is required"
        }
        if(values.password!==values.cpassword){
            errors.cpassword="confirm password should be same as password"
        }
         else if(values.password.length<8){
             errors.password="password should be minimum 8 characters"
         }else if(values.password.length>16){
             errors.password="password should be less than 16 characters"
            }
        if(values.password.match((/[a-z]/)<0)){
             errors.password='password must contain atleast a lowercase letter';
         }
         if(values.password.match((/[A-Z]/)<0)){
             errors.password='password must contain atleast a uppercase letter';
         }
         if(values.password.match((/[0-9]/) <0)){
             errors.password='password must contain atleast a  single digit';
         }
        return errors;
    }
  return (
    <div className='container'>
    { isLogin?(
            <div className='container'>
                     <SignIn />
            </div> 
           ) :( 
           
           <form onSubmit={handleSubmit}>
            {(Object.keys(formErrors).length === 0 && isSubmit)?(
                <p>Signed up successfully</p>):(<p></p>)}
                <h1>SignUp Form</h1>
                <div className='divider'></div>
                <div className='username'>
                <label> Username</label>
                <input
                    type="text"
                    name="username"
                    value={formValues.user}
                    placeholder="Username"
                    onChange={handleChange}
                    autoComplete="off"
                />
                </div>
                <p>{formErrors.username}</p>
                <div className='field'>
                <label>Email</label>
                <input 
                    type="text"
                    name="email"
                    placeholder='Email'
                    value={formValues.email}
                    onChange={handleChange}
                    autoComplete="off"
        />
         <p>{formErrors.email}</p>
           <div className='field'>
            <label>Password</label>
            <input
             type="password"
             name="password"
             placeholder='Password'
             value={formValues.password}
             onChange={handleChange}
             autoComplete="off"
            />
    
        </div>
        <p>{formErrors.password}</p>
        <div className='field'>
            <label>Confirm Password</label>
            <input
             type="password"
             name="cpassword"
             placeholder='Password'
             value={formValues.cpassword}
             onChange={handleChange}
             autoComplete="off"
            />
        </div>
        <p>{formErrors.cpassword}</p>
        <button className='field-button' onClick={()=>setIsSuccess(true)}>Submit</button>
        <p>Already Have an Account? </p>
        <button onClick={()=>setIsLogin(true)}  type='submit' className='color_box blue '>SignIn</button> 

    </div>
    </form>)
    }
    </div>
)}
export default Signup
