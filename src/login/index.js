import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

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
              <label for="email" className="ps-1 mb-1">
                Email
              </label>
              <input id="email" className="form-control mb-3" />

              <label for="password" className="ps-1 mb-1">
                Password
              </label>
              <div className="input-group mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  class="form-control"
                  id="password"
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
                <button className="btn btn-primary ps-4 pe-4">
                  <span>Sign in</span>
                </button>
              </div>
            </Card.Body>

            <Card.Footer className="py-3">
              <span>
                Don't have an account?&nbsp;
                <Link to="/register">Register</Link>
              </span>
            </Card.Footer>
          </Card>
        </div>
      </div>
      <div className="col-1 col-md-2 col-lg-3"></div>
    </div>
  );
}

export default Login;
