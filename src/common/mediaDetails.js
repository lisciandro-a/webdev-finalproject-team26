import React, { useEffect, useState } from "react";
import MarkItem from "./markItem";
import { Link } from "react-router-dom";
import { getMediaByMediaId } from "../services/media/mediaService";
import Poster from "./poster";

function MediaDetails({ localMedia }) {
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      const result = await getMediaByMediaId(localMedia.mediaType, localMedia.mediaId);
      setMedia(result);
    }
    fetchMedia();
  }, []);
  
  return media ? (
    <li className="list-group-item p-2 border-bottom">
      <div className="row">
        <div className="col-2 col-xl-1 my-auto">
          <Poster poster={media.poster} />
        </div>
        <div className="col-7 col-xl-8 text-start ps-4 m-auto">
          <h2> {media?.title} </h2>
          <h4> {media?.year} </h4>
          <Link
            to={`/details/${localMedia.mediaType}/${media?.mediaId}`}
            className="text-blue text-decoration-none"
          >
            {" "}
            More...{" "}
          </Link>
        </div>
        <div className="col-3 text-center pe-0 m-auto">
          <MarkItem media={localMedia}/>
        </div>
      </div>
    </li>
  ) : <></>;
}

export default MediaDetails;
