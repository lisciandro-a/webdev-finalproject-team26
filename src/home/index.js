import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <div>
      <div className="text-end">
        <Link to="/search">
          Search &nbsp;
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Link>
      </div>
      <div><div> Home page</div> </div>
            <div>
                <Link to="/login">Login</Link> or <Link to="/register">Register</Link>
            </div>
            
    </div>
  );
}

export default Home;
