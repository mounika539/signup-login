import React,{useEffect, useState} from 'react';
import Home from './Home'
const SignIn = () => {
  const initialValues={
    email:"",
    password:"",
}
var user=[{}];
const [formValues,setFormValues]=useState(initialValues);
const [formErrors,setFormErrors]=useState({});
const [isSubmit,setIsSubmit]=useState(false);
const handleChange=(e)=>{
       const {name,value}=e.target;
       setFormValues({...formValues,[name]:value}); 
};
const  getUserArr=localStorage.getItem('user');
console.log(getUserArr);
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
    else{
      if(getUserArr && getUserArr.length) {
      const userData=JSON.parse(getUserArr);
       const userLogin=userData.filter((el,k)=>{
            return el.email===formValues.email && el.password===formValues.password ;
       } );
            if(userLogin.length===0){
            errors.email="this email/password does not exist";}
      }
    }
    return errors;
}
return (
<div className='container'>

    {(Object.keys(formErrors).length === 0 && isSubmit)?(
        <div className='success'>
            {console.log(getUserArr.username)}
             <Home/>
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
             <p>{formErrors.password}</p>
        </div>
        <button className='field-button'>Submit</button>
    </div>
   </form>)}
  </div>
)
}
export default SignIn
