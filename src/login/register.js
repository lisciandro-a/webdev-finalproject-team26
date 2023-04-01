import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
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
              <h2>Register</h2>
            </Card.Header>
            <Card.Body className="text-start mb-3">
              <label for="email" className="ps-1 mb-1">
                Email
              </label>
              <input id="email" className="form-control mb-3" />

              <label for="first-name" className="ps-1 mb-1">
                First Name
              </label>
              <input id="first-name" className="form-control mb-3" />

              <label for="last-name" className="ps-1 mb-1">
                Last Name
              </label>
              <input id="last-name" className="form-control mb-3" />

              <label for="username" className="ps-1 mb-1">
                Username
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text">@</span>
                <input type="text" class="form-control" id="username" />
              </div>

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
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>

              <label for="password-confirm" className="ps-1 mb-1">
                Confirm Password
              </label>
              <div className="input-group mb-3">
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  class="form-control"
                  id="password-confirm"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                >
                  <FontAwesomeIcon
                    icon={showPasswordConfirm ? faEyeSlash : faEye}
                  />
                </button>
              </div>

              <div className="text-center mt-4">
                <button className="btn btn-primary ps-4 pe-4">
                  <span>Register</span>
                </button>
              </div>
            </Card.Body>
            <Card.Footer className="py-3">
              <span>
                Have an account?&nbsp;
                <Link to="/login">Log in</Link>
              </span>
            </Card.Footer>
          </Card>
        </div>
      </div>
      <div className="col-1 col-md-2 col-lg-3"></div>
    </div>
  );
}

export default Register;
