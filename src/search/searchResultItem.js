import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MarkItem from "../common/markItem";
import { getMediaByMediaId, getMediaByUsernameMediaId } from "../services/media/mediaService";

function SearchResultItem({ mediaType, result }) {
  // https://simkl.in/posters/13/13468373db4fa6dd3b_m.webp
  const [localMedia, setLocalMedia] = useState(undefined);
  const [newLocalMedia, setNewLocalMedia] = useState(undefined);
  const { loggedIn, profile } = useSelector((state) => state.account);

  useEffect(() => {
    if (!localMedia && !newLocalMedia) {
      getLocalMedia();
    }
    console.log('Why');
      
  }, [localMedia, newLocalMedia])

  const getLocalMedia = async () => {
    const newLocalMediaObject = {
      "mediaId": result.ids.simkl_id,
      "mediaType": mediaType,
      "title": result.title,
      "poster": result.poster,
      "year": result.year
    };
    if (loggedIn) {
      const existingLocalMedia = await getMediaByUsernameMediaId(mediaType, result.ids.simkl_id, profile.username);
      if (existingLocalMedia) {
        setLocalMedia(existingLocalMedia);
      } else {
        const newLocalMedia2 = await getMediaByMediaId(mediaType, result.ids.simkl_id);
        if (newLocalMedia2) {
          setLocalMedia(newLocalMedia2);
        } else {
          setNewLocalMedia(newLocalMediaObject);
        }
        
      }
    }
    setNewLocalMedia(newLocalMediaObject);
  }

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-2 col-xl-1 my-auto">
          <img
            src={`https://simkl.in/posters/${result.poster}_m.webp`}
            alt=""
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
          <MarkItem profile={profile} localMediaArg={localMedia} newLocalMediaArg={newLocalMedia}/>
        </div>
      </div>
    </li>
  );
}

export default SearchResultItem;
