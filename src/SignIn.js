import React,{useEffect, useState} from 'react';
import Home from './Home'
const SignIn = (props) => {
  const initialValues={
    email:"",
    password:"",
}
const [formValues,setFormValues]=useState(initialValues);
const [formErrors,setFormErrors]=useState({});
const [isSubmit,setIsSubmit]=useState(false);
const handleChange=(e)=>{
       const {name,value}=e.target;
       setFormValues({...formValues,[name]:value}); 
};
const handleSubmit=(e)=>{
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
}
useEffect(()=>{
    if(Object.keys(formErrors).length === 0 && isSubmit){
        console.log(formValues);
    }
},[formErrors]);
const validate=(values)=>{
    const errors={};
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.email){
        errors.email="email is required"
    }else if(!regex.test(values.email)){
        errors.email="this.is not a valid email format"
    }
    if(!values.password){
        errors.password="password is required"
    }else if(values.password.length<8){
        errors.password="password should be minimum 8 characters"
    }else if(values.password.length>16){
        errors.password="password should be less than 16 characters"
    }
    return errors;
}
console.log(props.uname);
return (
<div className='container'>

    {(Object.keys(formErrors).length === 0 && isSubmit)?(
        <div className='success'>
             <Home uname={props.uname}/>
        </div>
):( <form onSubmit={handleSubmit}>
    <h1>SignIn Form</h1>
    <div className='divider'></div>
    <div className='field'>
        <label>Email</label>
        <input 
                type="text"
                name="email"
                placeholder='Email'
                value={formValues.email}
                onChange={handleChange}
        
        />
         <p>{formErrors.email}</p>
        <div className='field'>
            <label>Password</label>
            <input
                type="text"
                name="password"
                placeholder='Password'
                value={formValues.password}
                onChange={handleChange}
            />
             <p>{formErrors.password}</p>
        </div>
        <button className='field-button'>Submit</button>
    </div>
   </form>)}
  </div>
)
}
export default SignIn
