import React, { useEffect, useState } from "react";
import { Rating, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faHeart } from "@fortawesome/free-solid-svg-icons";
import { addLikedValueByUsernameByMediaId, addWatchedValueByUsernameByMediaId, deleteLikedValueByUsernameByMediaId, deleteWatchedValueByUsernameByMediaId } from "../services/media/mediaService";

function MarkItem({ profile, localMedia }) {
  const [likedValue, setLikedValue] = useState(0);
  const [watchedValue, setWatchedValue] = useState(0);
  useEffect(() => {
    setLikedValue(localMedia?.liked ? 1 : 0);
    setWatchedValue(localMedia?.watched ? 1 : 0);
  }, [localMedia]);

  const updateWatchedValue = async (newValue) => {
    if (!!newValue) {
      await addWatchedValueByUsernameByMediaId(localMedia.mediaType, localMedia.mediaId, profile.username);
    } else {
      await deleteWatchedValueByUsernameByMediaId(localMedia.mediaType, localMedia.mediaId, profile.username);
    }
  }

  const updateLikedValue = async (newValue) => {
    if (!!newValue) {
      await addLikedValueByUsernameByMediaId(localMedia.mediaType, localMedia.mediaId, profile.username);
    } else {
      await deleteLikedValueByUsernameByMediaId(localMedia.mediaType, localMedia.mediaId, profile.username);
    }
  }

  return (
    <span>
      <div className="d-inline-block">
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

    </span>
  );
}

export default MarkItem;
