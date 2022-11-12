import React,{useEffect, useState} from 'react';
import { useNavigate ,BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Home from './Home'
const SignIn = (props) => {
  const initialValues={
    email:"",
    password:"",
}
const navigate=useNavigate();
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
    }else if(values.password.length<8){
        errors.password="password should be minimum 8 characters"
    }else if(values.password.length>16){
        errors.password="password should be less than 16 characters"
    }
    if(props.creds.password!==values.password){
      errors.password="password is wrong"
    }
    if(props.creds.email!==values.email){
      errors.email="Wrong email id"
    }
    return errors;
}
const handleClick=()=>{
    navigate('/home')
}
return (
<div className='container'>
    {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className='success'>
             <Router>
                    <nav>
                        <Link to='/home'>Home</Link>
                    </nav>
                    <Routes>
                        <Route exact path='/home' element={<Home/>}></Route>
                    </Routes>
                </Router>

        </div>
    ):(
        //<pre>{JSON.stringify(formValues,undefined,2)}</pre>
        <p>ok</p>
        )
    }
   <form onSubmit={handleSubmit}>
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

        </div>
        <button className='field-bitton' onChange={handleClick}>Submit</button>
    </div>
   </form>
</div>
)
}
  
export default SignIn
