import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isMemberAccount, setIsMemberAccount] = useState(true);

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
              <h2 className="mb-1">Register</h2>
            </Card.Header>
            <Card.Body className="text-start mb-2">
              <div className="justify-user-role mb-3">
                <div>
                  <input
                    type="radio"
                    value="MEMBER"
                    name="radio-user-role"
                    id="radio-member"
                    checked={isMemberAccount}
                    onClick={() => setIsMemberAccount(true)}
                  />
                  <label for="radio-member">&nbsp; Basic Member</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="ORGANIZATION"
                    name="radio-user-role"
                    id="radio-organization"
                    checked={!isMemberAccount}
                    onClick={() => setIsMemberAccount(false)}
                  />
                  <label for="radio-member">&nbsp; Club Organizer</label>
                </div>
              </div>

              <label for="email" className="ps-1 mb-1">
                Email
              </label>
              <input id="email" className="form-control mb-3" />

              <div className={isMemberAccount ? "block" : "d-none"}>
                <label for="first-name" className="ps-1 mb-1">
                  First Name
                </label>
                <input id="first-name" className="form-control mb-3" />

                <label for="last-name" className="ps-1 mb-1">
                  Last Name
                </label>
                <input id="last-name" className="form-control mb-3" />
              </div>

              <div className={isMemberAccount ? "d-none" : "block"}>
                <label for="org-name" className="ps-1 mb-1">
                  Organization Name
                </label>
                <input id="org-name" className="form-control mb-3" />
              </div>

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
