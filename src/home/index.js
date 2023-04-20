import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { accountLogoutThunk } from "../services/accounts/accountThunks";

function Home() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(accountLogoutThunk());
    }
  return (
    <div>
      <div className="text-end">
        <Link to="/search" className=" text-decoration-none">
        <FontAwesomeIcon icon={faMagnifyingGlass} />&nbsp;Search
        </Link>
      </div>
      <div><div> Home page</div> </div>
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
