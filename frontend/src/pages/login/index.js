import React from 'react';
import { Link } from 'react-router-dom';
import {loginUser } from './../../apiCalls/auth';





function Login() {

  const [user, setUser] = React.useState({
    email: '',
    password: ''
  });

  async function onformSubmit(event) {
    event.preventDefault();
    let response = null;

    try{
      const  response = await  loginUser(user);


      if(response.status)
      {
        alert(response.message);
       
      }else{
        alert(response.message);
      }

      

    }catch(error){
        alert(response.message);
    }

  }

  return (
    <div className="container">

      <div className="container-back-img"></div>
      <div className="container-back-color"></div>

      <div className="card">

        <div className="card_title">
          <h1>Login Here</h1>
        </div>

        <div className="form">
          <form onSubmit={onformSubmit}>

            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
            />

            <button type="submit">Login</button>

          </form>
        </div>

        <div className="card_terms">
          <span>
            Don't have an account yet?
            <Link to="/signup">Signup Here</Link>
          </span>
        </div>

      </div>

    </div>
  )
}

export default Login;