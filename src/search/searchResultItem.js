import React from "react";
import MarkItem from "../common/markItem";

function SearchResultItem({ mediaType, result }) {
  // https://simkl.in/posters/13/13468373db4fa6dd3b_m.webp
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-2 col-lg-1 my-auto">
          <img
            src={`https://simkl.in/posters/${result.poster}_m.webp`}
            height="100"
          />
        </div>
        <div className="col-7 col-lg-9 text-start ps-4 m-auto">
          <h2> {result.title} </h2>
          <h4> {result.year} </h4>
          <a
            href={`/watchDetails/${mediaType}/${result?.ids.simkl_id}`}
            className=" text-blue text-decoration-none"
          >
            {" "}
            More...{" "}
          </a>
        </div>
        <div className="col-3 col-lg-2 text-center pe-0 m-auto">
          <MarkItem />
        </div>
      </div>
    </li>
  );
}

export default SearchResultItem;
