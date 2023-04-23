import React from "react";
import MarkItem from "../common/markItem";
import { Link } from "react-router-dom";
import Poster from "../common/poster";

function SearchResultItem({ mediaType, result }) {
  const localMedia = {
    "mediaId": result.ids.simkl_id,
    "mediaType": mediaType,
    "title": result.title,
    "poster": result.poster,
    "year": result.year
  };

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-2 col-xl-1 my-auto">
          <Poster poster={result.poster} />
        </div>
        <div className="col-7 col-xl-8 text-start ps-4 m-auto">
          <h2> {result.title} </h2>
          <h4> {result.year} </h4>
          <Link
            to={`/details/${mediaType}/${result?.ids.simkl_id}`}
            className=" text-blue text-decoration-none"
          >
            {" "}
            More...{" "}
          </Link>
        </div>
        <div className="col-3 text-center pe-0 m-auto">
          {localMedia ? <MarkItem media={localMedia}/> : <></>}
        </div>
      </div>
    </li>
  );
}

export default SearchResultItem;
