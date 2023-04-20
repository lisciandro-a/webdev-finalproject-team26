import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { accountLogoutThunk } from "../services/accounts/accountThunks";

function Home() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(accountLogoutThunk());
    }
    return (
        <div>
          <div> Home page </div>
          <div>
            <Link to="/login">Login</Link> or <Link to="/register">Register</Link>
          </div>
          <div>
            <button onClick={logoutHandler}> Logout </button>
          </div>
        </div>
    );
}

export default Home;
