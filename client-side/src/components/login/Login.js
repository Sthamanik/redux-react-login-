import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/slices/userSlice';

const Login = (props) => {
    const [user, setUser]= useState({email: "", password: ""});

     // redux state
     const {loading} = useSelector((state)=> state.user)


      const navigate= useNavigate();
      const dispatch = useDispatch();
  
      const handleSubmit = async (e)=>{
          e.preventDefault();
          dispatch(loginUser(user)).then((result) => {
            if (result.payload){
              navigate("/");
            }
          })
      }
  
      const onChange= (e)=>{
          setUser({...user, [e.target.name]: e.target.value})
      }
    return (
      <div>
        <div className="card mx-auto p-3" style={{ width: '45rem' }}>
        <form onSubmit={handleSubmit} >
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' value={user.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' value={user.password} id="exampleInputPassword1" onChange={onChange} />
            </div> 
            <button type="submit" className="btn btn-primary">{loading?'Loading...': 'Login'}</button>
        </form>
      </div>
      </div>
    )
  }

export default Login
