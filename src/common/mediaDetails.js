import React, { useEffect, useState } from "react";
import MarkItem from "./markItem";
import { searchSimklById } from "../services/simkl/simklService";
import { Link } from "react-router-dom";

function MediaDetails({ localMedia }) {
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      const result = await searchSimklById(localMedia.idType, localMedia.mediaId);
      console.log(result);
      setMedia(result);
    }
    fetchMedia();
  }, [localMedia]);
  
  return media ? (
    <li className="list-group-item p-2 border-bottom">
      <div className="row">
        <div className="col-2 col-xl-1 my-auto">
          <img
            src={`https://simkl.in/posters/${media.poster}_m.webp`}
            alt=""
            className="img-size"
          />
        </div>
        <div className="col-7 col-xl-8 text-start ps-4 m-auto">
          <h2> {media.title} </h2>
          <h4> {media.year} </h4>
          <Link
            to={`/details/${localMedia.mediaType}/${media?.ids.simkl}`}
            className="text-blue text-decoration-none"
          >
            {" "}
            More...{" "}
          </Link>
        </div>
        <div className="col-3 text-center pe-0 m-auto">
          <MarkItem liked={localMedia.liked} watched={localMedia.watched}/>
        </div>
      </div>
    </li>
  ) : <></>;
}

export default MediaDetails;
