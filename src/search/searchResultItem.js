import React from "react";
import MarkItem from "../common/markItem";

function SearchResultItem({ mediaType, result }) {
  // https://simkl.in/posters/13/13468373db4fa6dd3b_m.webp
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-2 col-xl-1 my-auto">
          <img
            src={`https://simkl.in/posters/${result.poster}_m.webp`}
            alt='favicon.ico' // temporary to make eslint happy
            className="img-size"
          />
        </div>
        <div className="col-7 col-xl-8 text-start ps-4 m-auto">
          <h2> {result.title} </h2>
          <h4> {result.year} </h4>
          <a
            href={`/details/${mediaType}/${result?.ids.simkl_id}`}
            className=" text-blue text-decoration-none"
          >
            {" "}
            More...{" "}
          </a>
        </div>
        <div className="col-3 text-center pe-0 m-auto">
          <MarkItem />
        </div>
      </div>
    </li>
  );
}

export default SearchResultItem;
