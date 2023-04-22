import React, { useEffect, useState } from "react";
import "./watchDetails.css";
import { useParams, useNavigate } from "react-router";
import watchDetailsJson from "./watchDetailsExample.json";
import { Chip, Typography, Rating, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { searchSimklById } from "./watchDetailsService";
import { NotFound, MarkItem, CommentsSection } from "../common";
import { getMediaByUsernameMediaId, addReviewByUsernameByMediaId, getReviewsForMediaByMediaId } from "../services/media/mediaService";
import { useSelector } from "react-redux";

function WatchDetails() {
  const { mediaType, simklID } = useParams();
  const navigate = useNavigate();
  const [watchDetails, setWatchDetails] = useState({});
  const [localMedia, setLocalMedia] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const { loggedIn, profile } = useSelector(state => state.account);

  useEffect(() => {
    getWatchDetails();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getProfileWatchDetails();
    }
  }, [loggedIn]);

  const getWatchDetails = async () => {
    //const simklResult = await searchSimklById(mediaType, simklID);
    //setWatchDetails(simklResult);
     setWatchDetails(watchDetailsJson);
  };

  const getProfileWatchDetails = async () => {
    const profileMediaResult = await getMediaByUsernameMediaId(mediaType, simklID, profile.username);
    setLocalMedia(profileMediaResult);
    setUserRating(profileMediaResult.rating);
  }

  const updateUserRating = async (value) => {
    const review = {
      comment: localMedia.comment,
      rating: value,
    };
    await addReviewByUsernameByMediaId(localMedia.mediaType, localMedia.mediaId, profile.username, review);
    setUserRating(value);
    setLocalMedia({
      ...localMedia,
      rating: value,
    });
  }

  const getReviewsForMedia = async () => {
    const reviews = await getReviewsForMediaByMediaId(mediaType, simklID);
    return reviews;
  }

  const createReviewForMedia = async (comment) => {
    const review = {
      rating: localMedia.rating,
      comment,
    };
    await addReviewByUsernameByMediaId(localMedia.mediaType, localMedia.mediaId, profile.username, review);
    setLocalMedia({
      ...localMedia,
      comment,
    });
  }

  if (!["movie", "tv", "anime"].includes(mediaType)) {
    return <NotFound />;
  } else {
    return (
      <div>
        <div className="row mt-4">
          <div className="col-3 col-xxl-2 text-start">
            <img
              src={`https://simkl.in/posters/${watchDetails?.poster}_m.webp`}
              alt=""
              className="img-size"
            />
          </div>
          <div className="col-9 col-xxl-10 ps-xxl-5 text-start">
            <div className="row flex-nowrap">
              <div className="mt-auto col">
                <h1>
                  {" "}
                  {watchDetails?.title} {localMedia ? <MarkItem media={localMedia}/> : <></>}{" "}
                </h1>

                {/* <small className="ps-2" height="32px">
              {watchDetails.year_start_end}
            </small> */}
                {/* <MarkItem /> */}
              </div>

              <div className="text-end mt-1 col">
                <IconButton
                  aria-label="close"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="text-dark text-opacity-25"
                  />
                </IconButton>
              </div>
            </div>

            <div>
              {watchDetails?.genres?.map((genre) => (
                <Chip key={genre} label={genre} />
              ))}
            </div>
            <div className="mt-4 mt-lg-5 d-inline-block d-md-inline-flex">
              <Typography component="legend">Average User Rating</Typography>
              {/* default value will be 0 or whatever is in database */}
              <Rating
                name="customized-10"
                defaultValue={5.7}
                max={10}
                precision={0.5}
                readOnly
                className="ms-2"
              />
            </div>
            <br />
            {localMedia && profile?.isMemberAccount ? 
            <div className="d-inline-block d-md-inline-flex mt-lg-3">
              <Typography component="legend">Your Rating</Typography>
              {/* default value will be 0 or whatever is in database */}
              <Rating
                name="customized-10"
                defaultValue={0}
                value={userRating}
                max={10}
                precision={1}
                className="ms-2"
                onChange={(event, value) => {
                  updateUserRating(value);
                }}
              />
            </div> : <></>
            }
          </div>
        </div>
        <div className="text-start mt-4">
          <h3>Overview</h3>
          <p>{watchDetails?.overview}</p>
        </div>

        <div>
          <CommentsSection maxDepth={0} loadComments={getReviewsForMedia} updateComments={createReviewForMedia} sectionTitle={"Review"} />
        </div>
      </div>
    );
  }
}

export default WatchDetails;
