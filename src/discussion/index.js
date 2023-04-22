import React, { useEffect, useState } from "react";
import "./discussion.css";
import { useParams, useNavigate } from "react-router";
import watchDetailsJson from "../watchDetails/watchDetailsExample.json";
import { Chip, Typography, Rating, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { searchSimklById } from "../watchDetails/watchDetailsService";
import { NotFound, MarkItem, CommentsSection } from "../common";
import { useSelector } from "react-redux";
import { createCommentForClubDiscussion, getClubDiscussion } from "../services/clubs/clubService";
import { addReviewByUsernameByMediaId, getAverageRating, getMediaByUsernameMediaId } from "../services/media/mediaService";

function Discussion() {
  const { clubUsername, mediaType, simklID } = useParams();
  const navigate = useNavigate();
  const [watchDetails, setWatchDetails] = useState({});
  const [clubDiscussion, setClubDiscussion] = useState({});
  const [localMedia, setLocalMedia] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const { loggedIn, profile } = useSelector(state => state.account);

  useEffect(() => {
    getWatchDetails();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getProfileWatchDetails();
    }
  }, [loggedIn]);

  const getProfileWatchDetails = async () => {
    const profileMediaResult = await getMediaByUsernameMediaId(mediaType, simklID, profile.username);
    setLocalMedia(profileMediaResult);
    setUserRating(profileMediaResult.rating);
  }

  useEffect(() => {
    getWatchDetails();
    getClubDiscussionForMedia();
  }, []);

  const getWatchDetails = async () => {
    // const result = await searchSimklById(mediaType, simklID);
    // setWatchDetails(result);
    setWatchDetails(watchDetailsJson);
    const { rating } = await getAverageRating(mediaType, simklID);
    setAverageRating(rating);
  };

  const getClubDiscussionForMedia = async () => {
    const result = await getClubDiscussion(clubUsername, mediaType, simklID);
    setClubDiscussion(result);
  }

  const getComments = async () => {
    const result = await getClubDiscussion(clubUsername, mediaType, simklID);
    return result.comments;
  }

  const updateComments = async (comment, replyToId) => {
    console.log(clubDiscussion);
    const newCommentObject = {
      comment,
      replyToId,
      clubId: clubDiscussion.clubId,
      mediaType: mediaType,
      mediaId: simklID,
      discussionId: clubDiscussion._id,
      timestamp: new Date().getTime(),
      memberId: profile._id,
    }
    const result = await createCommentForClubDiscussion(clubUsername, mediaType, simklID, newCommentObject);
    setClubDiscussion(result);
  }

  const updateUserRating = async (value) => {
    const review = {
      comment: localMedia.comment,
      rating: value,
    };
    await addReviewByUsernameByMediaId(localMedia.mediaType, localMedia.mediaId, profile.username, review);
    const { rating } = await getAverageRating(mediaType, simklID);
    setAverageRating(rating);
    setUserRating(value);
    setLocalMedia({
      ...localMedia,
      rating: value,
    });
  }

  return (
    loggedIn ?
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
                {watchDetails?.title} <MarkItem media={localMedia} />{" "}
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
            <Typography component="legend">Average Club Rating</Typography>
            {/* default value will be 0 or whatever is in database */}
            <Rating
              name="customized-10"
              value={averageRating}
              max={10}
              precision={0.5}
              readOnly
              className="ms-2"
            />
          </div>
          <br />
          {localMedia ? 
            <div className={"d-inline-block d-md-inline-flex mt-lg-3"}>
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

      <div>
        <CommentsSection
          maxDepth={3}
          loadComments={getComments}
          updateComments={updateComments}
          sectionTitle={"Comment"}
        />
      </div>
    </div> : <NotFound/>
  );
}

export default Discussion;
