import React from "react";

function SearchResultItem({ result }) {
    // https://simkl.in/posters/13/13468373db4fa6dd3b_m.webp
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-2 col-lg-1">
            <img src={`https://simkl.in/posters/${result.poster}_m.webp`} height="100"/>
        </div>
        <div className="col-7 col-lg-9 text-start ps-4 m-auto">
            <h2> {result.title} </h2>
            <h4> {result.year} </h4>
            {/* <a href={`simkl.com/url`}>Simkl</a> */}
        </div>
        <div className="col-3 col-md-2 text-center pe-0 m-auto">
            <h5>IMDB Rating</h5>
            <h3>{result.ratings?.imdb?.rating || "?"}</h3>
        </div>
      </div>
    </li>
  );
}

export default SearchResultItem;
