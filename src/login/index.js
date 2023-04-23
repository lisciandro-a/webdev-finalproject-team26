import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Alert } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { accountLoginThunk } from "../services/accounts/accountThunks";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);

  const { loggedIn } = useSelector(state => state.account);

  const dispatch = useDispatch();
  const loginHandler = async (e) => {
    e.preventDefault();
    const credentials = {
      email: email,
      username: email,
      password: password,
    }
    try {
      await dispatch(accountLoginThunk(credentials)).unwrap();
    } catch {
      setFailedLogin(true);
    }
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  });

  return (
    <div>
      <div className="col-1 col-md-2 col-lg-3"></div>
      <div className="col-10 col-md-8 col-lg-6 mx-auto my-4">
        <div className="mb-4">
          <h1>Welcome to WatchIt</h1>
          <h5>WatchIt. DiscussIt. ReviewIt.</h5>
        </div>
        <div>
          <Card className="text-center">
            <Card.Header>
              <h2 className="mb-1">Login</h2>
            </Card.Header>
            <Card.Body className="text-start mb-2">
              <form onSubmit={loginHandler}>
                <label htmlFor="email" className="ps-1 mb-1">
                  Email or Username
                </label>
                <input 
                  id="email" 
                  className="form-control mb-3"
                  onChange={(e) => setEmail(e.target.value)}   
                />

                <label htmlFor="password" className="ps-1 mb-1">
                  Password
                </label>
                <div className="input-group mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span>
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                  </button>
                </div>

                <div className="text-center mt-4">
                  <button className="btn btn-primary ps-4 pe-4" type="submit">
                    <span>Sign in</span>
                  </button>
                </div>
              </form>
            </Card.Body>

            <Card.Footer className="py-3">
              <span>
                Don't have an account?&nbsp;
                <Link to="/register">Register</Link>
              </span>
            </Card.Footer>
          </Card>
          {
            failedLogin ? 
              <Alert className="mt-4" severity="error" onClose={() => setFailedLogin(false)}>
                Login failed
              </Alert> 
              : <></>
          }
        </div>
      </div>
      <div className="col-1 col-md-2 col-lg-3"></div>
    </div>
  );
}

export default Login;
