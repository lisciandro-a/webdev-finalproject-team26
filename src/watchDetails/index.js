import React, { useEffect, useState } from "react";
import "./watchDetails.css";
import { useParams, useNavigate } from "react-router";
import watchDetailsJson from "./watchDetailsExample.json";
import { Chip, Typography, Rating, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { searchSimklById } from "./watchDetailsService";
import { NotFound, MarkItem, CommentsSection } from "../common";
import { useSelector } from "react-redux";

function WatchDetails() {
  const { mediaType, simklID } = useParams();
  const navigate = useNavigate();
  const [watchDetails, setWatchDetails] = useState({});
  const { loggedIn, profile } = useSelector(state => state.account);

  useEffect(() => {
    getWatchDetails();
  }, [simklID, mediaType]);

  const getWatchDetails = async () => {
    // const result = await searchSimklById(mediaType, simklID);
    // setWatchDetails(result);
    setWatchDetails(watchDetailsJson);
  };

  if (!["movie", "tv", "anime"].includes(mediaType)) {
    return <NotFound />;
  } else {
    return (
      <div>
        <div className="row mt-4">
          <div className="col-3 col-xxl-2 text-start">
            <img
              src={`https://simkl.in/posters/${watchDetails?.poster}_m.webp`}
              className="img-size"
            />
          </div>
          <div className="col-9 col-xxl-10 ps-xxl-5 text-start">
            <div className="row flex-nowrap">
              <div className="mt-auto col">
                <h1>
                  {" "}
                  {watchDetails?.title} <MarkItem />{" "}
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
                <Chip label={genre} />
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
            <div className={loggedIn && profile?.isMemberAccount ? "d-inline-block d-md-inline-flex mt-lg-3" : "d-none"}>
              <Typography component="legend">Your Rating</Typography>
              {/* default value will be 0 or whatever is in database */}
              <Rating
                name="customized-10"
                defaultValue={0}
                max={10}
                precision={1}
                className="ms-2"
              />
            </div>
          </div>
        </div>
        <div className="text-start mt-4">
          <h3>Overview</h3>
          <p>{watchDetails?.overview}</p>
        </div>

        <div>
          <CommentsSection maxDepth={0} loadComments={() => console.log("Loading")} sectionTitle={"Review"} />
        </div>
      </div>
    );
  }
}

export default WatchDetails;
