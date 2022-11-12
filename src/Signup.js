import React, { useEffect, useState } from 'react'
import SignIn from './SignIn';
import {BrowserRouter as Router,Link,Route,Routes , useNavigate} from 'react-router-dom'
function Signup() {
    const navigate = useNavigate();

    const initialValues={
        username:"",
        email:"",
        password:"",
        cpassword:""
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
            navigate('/signin');
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
        if(values.password!==values.cpassword){
            errors.cpassword="confirm password should be same as password"
        }
        return errors;
    }
    const handleClick=()=>{
        navigate('/signin');
    }

  return (
    <div className='container'>
        {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div className='success'>
                <Router>
                    <nav>
                        <Link to='/signin'>SignIn</Link>
                    </nav>
                    <Routes>
                        <Route exact path='/signin' element={<SignIn/>}></Route>
                    </Routes>
                </Router>
            </div>
        ):(
            ""
            )
        }
       <form onSubmit={handleSubmit}>
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
            <p>{formErrors.password}</p>
            <div className='field'>
                <label>Confirm Password</label>
                <input
                 type="text"
                 name="cpassword"
                 placeholder='Password'
                 value={formValues.cpassword}
                 onChange={handleChange}
                />
            </div>
            <p>{formErrors.cpassword}</p>
            <button className='field-button' onClick={handleClick}>Submit</button>
                    
        </div>
       </form>
    </div>
  )
}

export default Signup
