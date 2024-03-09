import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../../redux/slices/userSlice';

const Signup = (props) => {
  const [user, setUser]= useState({name: "", email: "", password: "", cpassword: ""});

  // redux state
  const {loading, error} = useSelector((state)=> state.user)

      const navigate= useNavigate();
      const dispatch = useDispatch();
  
      const handleSubmit = async (e)=>{
          e.preventDefault();
          const {password,cpassword}= user;
          if(password === cpassword){
              dispatch(signUpUser(user)).then((result) => {
                if (result.payload){
                  navigate("/");
                }
              })
          }
          else{
            props.showAlert(error, "danger")
          }
      }
  
      const onChange= (e)=>{
          setUser({...user, [e.target.name]: e.target.value})
      }

  return (
    <div>
      <div className="card mx-auto p-3" style={{ width: '45rem' }}>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Username</label>
                <input type="text" className="form-control" name='name' id="name" onChange={onChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" name='email'  id="email" onChange={onChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name='password'  id="password" onChange={onChange} minLength={8} required/>
            </div> 
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={onChange} minLength={8} required/>
            </div>
            <button  type="submit" className="btn btn-primary">{loading?'Loading...': 'submit'}</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
