import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Rating, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faHeart, faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { addLikedValueByUsernameByMediaId, addWatchedValueByUsernameByMediaId, deleteLikedValueByUsernameByMediaId, deleteWatchedValueByUsernameByMediaId, addMedia, getMediaByMediaId, getMediaByUsernameMediaId } from "../services/media/mediaService";

function MarkItem({ media, discussing }) {
  const { loggedIn, profile } = useSelector(state => state.account);
  const [likedValue, setLikedValue] = useState(0);
  const [watchedValue, setWatchedValue] = useState(0);
  const [localMedia, setLocalMedia] = useState(media);

  useEffect(() => {
    if (profile && media) {
      getLocalMediaForUser();
    }
  }, [])

  useEffect(() => {
    if (localMedia) {
      setLikedValue(localMedia?.liked ? 1 : 0);
      setWatchedValue(localMedia?.watched ? 1 : 0);
    }
  }, [localMedia]);

  const getLocalMediaForUser = async () => {
    const existingLocalMedia = await getMediaByUsernameMediaId(localMedia.mediaType, localMedia.mediaId, profile.username);
    if (existingLocalMedia) {
      setLocalMedia(existingLocalMedia);
    }
  }

  const createMediaForUser = async () => {
    await addMedia(localMedia);
    await getLocalMediaForUser();
  }

  const updateWatchedValue = async (newValue) => {
    if (!localMedia.watched) {
      await createMediaForUser();
    }
    if (!!newValue) {
      await addWatchedValueByUsernameByMediaId(localMedia.mediaType, localMedia.mediaId, profile.username);
      setWatchedValue(newValue);
    } else {
      await deleteWatchedValueByUsernameByMediaId(localMedia.mediaType, localMedia.mediaId, profile.username);
      setWatchedValue(newValue);
    }
  }

  const updateLikedValue = async (newValue) => {
    if (!localMedia.liked) {
      await createMediaForUser();
    }
    if (!!newValue) {
      await addLikedValueByUsernameByMediaId(localMedia.mediaType, localMedia.mediaId, profile.username);
      setLikedValue(newValue);
    } else {
      await deleteLikedValueByUsernameByMediaId(localMedia.mediaType, localMedia.mediaId, profile.username);
      setLikedValue(newValue);
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

    </span>
  );
}

export default MarkItem;
