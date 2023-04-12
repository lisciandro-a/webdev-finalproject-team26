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
        <div className='list-group'>
            <Link to='/login'>Login</Link>
            <button onClick={logoutHandler}> Logout </button>
            <Link to='/register'>Register</Link>
        </div>
    );
}

export default Home;