import React, { useEffect, useState } from "react";
import MarkItem from "./markItem";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { getMediaByMediaId } from "../services/media/mediaService";
import { getClubDiscussionByMediaId, updateDiscussion } from "../services/clubs/clubService";
import Poster from "./poster";

function DiscussionDetails({ localMedia, clubID, viewingAsGuest, viewingAsMember, followingClub, updateMediaCallback }) {
    // const [media, setMedia] = useState(watchDetails);
    const [currTimestamp, setCurrTimestamp] = useState(null);
    const navigate = useNavigate();
    const [media, setMedia] = useState(null);
    const [discussion, setDiscussion] = useState(null);
    const ownProfile = !viewingAsGuest && !viewingAsMember;

    useEffect(() => {
      const fetchMedia = async () => {
        const result = await getMediaByMediaId(localMedia.mediaType, localMedia.mediaId);
        setMedia(result);
      }
      fetchMedia();
    }, [localMedia]);

    useEffect(() => {
      const fetchDiscussion = async () => {
        const result = await getClubDiscussionByMediaId(clubID, localMedia.mediaType, localMedia.mediaId);
        setDiscussion(result);
      }
      fetchDiscussion();
    }, [media])

    useEffect(() => {
      if (discussion && discussion?.discussionDate !== "") {
        setCurrTimestamp(parseInt(discussion.discussionDate))
      }
    }, [discussion])

const onUpdateDate = async (newTimestamp) => {
  setCurrTimestamp(newTimestamp);
  const newDiscussionObj = {
    ...discussion,
    discussionDate: newTimestamp + ""
  };
  const result = await updateDiscussion(newDiscussionObj);
  setDiscussion(result);
  updateMediaCallback();
  // update database
}

  
  return media ? (
    <li className="list-group-item p-2 border-bottom">
      <div className="row">
        <div className="col-2 col-xl-1 my-auto">
          <Poster poster={media.poster} />
        </div>
        <div className="col-5 col-xl-8 text-start ps-4 m-auto">
          <h2> {media.title} </h2>
          <h4> {media.year} </h4>
          <Link
            to={`/details/${localMedia.mediaType}/${media?.mediaId}`}
            className="text-blue text-decoration-none"
          >
            {" "}
            More...{" "}
          </Link>
        </div>
        <div className="col-5 col-xl-3 text-center pe-0 m-auto">
          <MarkItem media={localMedia}/>
          <Button onClick={() => navigate(`/club/${clubID}/discussion/${localMedia.mediaType}/${localMedia.mediaId}`)} className="mb-3 ps-4" disabled={viewingAsGuest || (!ownProfile && !followingClub)}>Discussion</Button>
          <LocalizationProvider className={ownProfile ? "d-inline-flex" : "d-none"} dateAdapter={AdapterDayjs}>
            <DatePicker value={dayjs(currTimestamp)} onChange={(newValue) => onUpdateDate(dayjs(newValue).valueOf())} className={ownProfile ? "d-inline-flex" : "d-none"}/>
          </LocalizationProvider>
        </div>
      </div>
    </li>
  ) : <></>;
}

export default DiscussionDetails;
