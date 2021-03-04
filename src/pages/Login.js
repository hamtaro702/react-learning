import React, { useState } from 'react';
import PropTypes from 'prop-types';


const loginUser = async (credentials)=> {
 return fetch('http://localhost:7000/access/authen', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json()).catch(error => error)
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
   
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    
    setToken(token);
  }

  return(
    <div class="container p-5">
    <div class="row" style={{width: "400px",margin: "auto"}}>
    <div class="clo-sm-3 bg-light rounded py-5">
      <h2 class="text-center">Please Log In</h2>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="_username">Username</label>
          <input class="form-control" type="text" onChange={e => setUserName(e.target.value)} />
        </div>
        <div class="form-group">
        <label for="_password">Password</label>
          <input  class="form-control" type="password" onChange={e => setPassword(e.target.value)} />
          </div>
       
        <button class="btn btn-primary" type="submit">Submit</button>
       
      </form>
    </div>
    </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};