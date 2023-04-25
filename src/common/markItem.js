import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Rating, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faHeart, faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { addLikedValueByUsernameByMediaId, addWatchedValueByUsernameByMediaId, deleteLikedValueByUsernameByMediaId, deleteWatchedValueByUsernameByMediaId, addMedia, getMediaByUsernameMediaId } from "../services/media/mediaService";
import { addNewDiscussion, deleteDiscussion } from "../services/clubs/clubService";

function MarkItem({ media }) {
  const { loggedIn, profile } = useSelector(state => state.account);
  const [likedValue, setLikedValue] = useState(0);
  const [watchedValue, setWatchedValue] = useState(0);
  const [discussingValue, setDiscussingValue] = useState(0);
  const [localMedia, setLocalMedia] = useState(null);

  useEffect(() => {
    if (profile && media) {
      setLocalMedia(media);
      getLocalMediaForUser();
    }
  }, [media, profile]);

  useEffect(() => {
    if (localMedia) {
      setLikedValue(localMedia?.liked ? 1 : 0);
      setWatchedValue(localMedia?.watched ? 1 : 0);
      setDiscussingValue(localMedia?.discussing ? 1 : 0);

    }
  }, [localMedia]);

  const getLocalMediaForUser = async () => {
    const existingLocalMedia = await getMediaByUsernameMediaId(media.mediaType, media.mediaId, profile.username);
    if (existingLocalMedia._id) {
      setLocalMedia(existingLocalMedia);
    }
  }

  const createMediaForUser = async () => {
    await addMedia(localMedia);
    await getLocalMediaForUser();
  }

  const updateWatchedValue = async (newValue) => {
    if (!localMedia._id) {
      await createMediaForUser();
    }
    if (!!newValue) {
      const updated = await addWatchedValueByUsernameByMediaId(localMedia.mediaType, localMedia.mediaId, profile.username);
      setLocalMedia(updated);
      setWatchedValue(newValue);
    } else {
      const updated = await deleteWatchedValueByUsernameByMediaId(localMedia.mediaType, localMedia.mediaId, profile.username);
      setLocalMedia(updated);
      setWatchedValue(newValue);
    }
  }

  const updateLikedValue = async (newValue) => {
    if (!localMedia._id) {
      await createMediaForUser();
    }
    if (!!newValue) {
      const updated = await addLikedValueByUsernameByMediaId(localMedia.mediaType, localMedia.mediaId, profile.username);
      setLocalMedia(updated);
      setLikedValue(newValue);
    } else {
      const updated = await deleteLikedValueByUsernameByMediaId(localMedia.mediaType, localMedia.mediaId, profile.username);
      setLocalMedia(updated);
      setLikedValue(newValue);
    }
  }

  const updateDiscussingValue = async (newValue) => {
    if (!localMedia._id) {
      await createMediaForUser();
    }
    if (!!newValue) {
      const updated = await addNewDiscussion(profile.username, localMedia.mediaType, localMedia.mediaId);
      setLocalMedia(updated);
      setDiscussingValue(newValue);
    } else {
      const updated = await deleteDiscussion(profile.username, localMedia.mediaType, localMedia.mediaId);
      setLocalMedia(updated);
      setDiscussingValue(newValue);
    }
  }

  return (
    loggedIn ? 
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
      <div className={(loggedIn && profile?.isMemberAccount) || !loggedIn ? "d-none" : "d-inline-block"}>
      <Tooltip title="Discussing">
          <Rating
            name="customized-color"
            defaultValue={0}
            value={discussingValue}
            precision={1}
            max={1}
            icon={<FontAwesomeIcon icon={faMinusCircle} className="text-warning" />}
            emptyIcon={<FontAwesomeIcon icon={faPlusCircle} />}
            className="ps-3"
            onChange={(event, newValue) => {
              updateDiscussingValue(newValue);
            }}
          />
        </Tooltip>
      </div>

    </span>
    : <></>
  );
}

export default MarkItem;
