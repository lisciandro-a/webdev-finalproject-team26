import React, { useEffect, useState } from "react";
import MarkItem from "./markItem";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import watchDetails from "../watchDetails/watchDetailsExample.json";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

function DiscussionDetails({ localMedia, clubID, isOwnProfile }) {
    const [media, setMedia] = useState(watchDetails);
    const [currTimestamp, setCurrTimestamp] = useState(null);
    const navigate = useNavigate();
//   const [media, setMedia] = useState(null);

//   useEffect(() => {
//     const fetchMedia = async () => {
//       const result = await searchSimklById(localMedia.idType, localMedia.mediaId);
//       console.log(result);
//       setMedia(result);
//     }
//     fetchMedia();
//   }, [localMedia]);

const onUpdateDate = (newTimestamp) => {
  setCurrTimestamp(newTimestamp);
  // update database
}

  
  return media ? (
    <li className="list-group-item p-2 border-bottom">
      <div className="row">
        <div className="col-2 col-xl-1 my-auto">
          <img
            src={`https://simkl.in/posters/${media.poster}_m.webp`}
            alt=""
            className="img-size"
          />
        </div>
        <div className="col-7 col-xl-8 text-start ps-4 m-auto">
          <h2> {media.title} </h2>
          <h4> {media.year} </h4>
          <Link
            to={`/details/${localMedia.mediaType}/${media?.ids.simkl}`}
            className="text-blue text-decoration-none"
          >
            {" "}
            More...{" "}
          </Link>
        </div>
        <div className="col-3 text-center pe-0 m-auto">
          <MarkItem liked={localMedia.liked} watched={localMedia.watched}/>
          <Button onClick={() => navigate(`/club/${clubID}/discussion/${localMedia.mediaId}`)} className="mb-3 ps-4">Discussion</Button>
          <LocalizationProvider className={isOwnProfile ? "d-flex" : "d-none"} dateAdapter={AdapterDayjs}>
            <DatePicker value={dayjs(currTimestamp)} onChange={(newValue) => onUpdateDate(dayjs(newValue).valueOf())}/>
          </LocalizationProvider>
        </div>
      </div>
    </li>
  ) : <></>;
}

export default DiscussionDetails;
