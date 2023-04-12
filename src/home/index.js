import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <div> Home page </div>
            <div>
                <Link to="/login">Login</Link> or <Link to="/register">Register</Link>
            </div>
            
        </div>
    );
}

export default Home;