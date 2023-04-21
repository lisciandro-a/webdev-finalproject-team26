import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Rating, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faHeart, faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { addLikedValueByUsernameByMediaId, addWatchedValueByUsernameByMediaId, deleteLikedValueByUsernameByMediaId, deleteWatchedValueByUsernameByMediaId, addMedia, getMediaByMediaId } from "../services/media/mediaService";

function MarkItem({ profile, localMediaArg, discussing, newLocalMediaArg }) {
  const { loggedIn } = useSelector(state => state.account);
  const [likedValue, setLikedValue] = useState(0);
  const [watchedValue, setWatchedValue] = useState(0);
  const [localMedia, setLocalMedia] = useState(localMediaArg);

  useEffect(() => {
    setLikedValue(localMedia?.liked ? 1 : 0);
    setWatchedValue(localMedia?.watched ? 1 : 0);
    console.log(localMedia);
    console.log(localMediaArg);
    console.log(newLocalMediaArg);
    
  }, [localMedia]);


  const updateWatchedValue = async (newValue) => {
    const complete = await makeNewLocalMediaObject();
    if (complete) {
      if (!!newValue) {
      await addWatchedValueByUsernameByMediaId(localMedia.mediaType, localMedia.mediaId, profile.username);
    } else {
      await deleteWatchedValueByUsernameByMediaId(localMedia.mediaType, localMedia.mediaId, profile.username);
    }
    }
    
  }

  const updateLikedValue = async (newValue) => {
    const complete = await makeNewLocalMediaObject();
    if (complete) {
      if (!!newValue) {
      await addLikedValueByUsernameByMediaId(localMedia.mediaType, localMedia.mediaId, profile.username);
    } else {
      await deleteLikedValueByUsernameByMediaId(localMedia.mediaType, localMedia.mediaId, profile.username);
    }
    
    }
  }

  const makeNewLocalMediaObject = async () => {
    if (!localMedia || !localMedia?.mediaId) {
      console.log("um, no");
      await addMedia(newLocalMediaArg);
      console.log(newLocalMediaArg);
      await getMediaByMediaId(newLocalMediaArg.mediaType, newLocalMediaArg.mediaId).then((newLocalMedia) => {
        setLocalMedia(newLocalMedia);
        return true;
      });
    } else {
      return true;
    }
    
  }

  return (

    <span>
      <div className={loggedIn && profile?.isMemberAccount ? "d-inline-block" : "d-none"}>
        <Tooltip title="Watched">
          <Rating
            name="customized-color"
            defaultValue={0}
            value={watchedValue}
            precision={1}
            max={1}
            icon={
              <FontAwesomeIcon icon={faCircleCheck} className="text-success" />
            }
            emptyIcon={<FontAwesomeIcon icon={faCircleCheck} />}
            className="ps-3 pe-md-3"
            onChange={(event, newValue) => {
              setWatchedValue(newValue);
              updateWatchedValue(newValue);
            }}
          />
        </Tooltip>

        <Tooltip title="Liked">
          <Rating
            name="customized-color"
            defaultValue={0}
            value={likedValue}
            precision={1}
            max={1}
            icon={<FontAwesomeIcon icon={faHeart} className="text-danger" />}
            emptyIcon={<FontAwesomeIcon icon={faHeart} />}
            className="ps-3"
            onChange={(event, newValue) => {
              setLikedValue(newValue);
              updateLikedValue(newValue);
            }}
          />
        </Tooltip>
      </div>
      <div className={loggedIn && profile?.isMemberAccount ? "d-none" : "d-inline-block"}>
      <Tooltip title="Discussing">
          <Rating
            name="customized-color"
            defaultValue={discussing ? 1 : 0}
            precision={1}
            max={1}
            icon={<FontAwesomeIcon icon={faMinusCircle} className="text-warning" />}
            emptyIcon={<FontAwesomeIcon icon={faPlusCircle} />}
            className="ps-3"
          />
        </Tooltip>
      </div>
      <div className={loggedIn && profile?.isMemberAccount ? "d-none" : "d-inline-block"}>
      <Tooltip title="Discussing">
          <Rating
            name="customized-color"
            defaultValue={discussing ? 1 : 0}
            precision={1}
            max={1}
            icon={<FontAwesomeIcon icon={faMinusCircle} className="text-warning" />}
            emptyIcon={<FontAwesomeIcon icon={faPlusCircle} />}
            className="ps-3"
          />
        </Tooltip>
      </div>

    </span>
  );
}

export default MarkItem;
