import React from "react";
import { Typography } from "@mui/material";
import { formatTimestampToDateWithoutTime } from "./comments/formatTimestamp";
import { Link } from "react-router-dom";


function MemberDetails({ club, member }) {

  return (
    <div className="p-2 border-bottom">
      <div className="row">
        <div className="col-6">
          <Typography variant="h5">{member.firstName + ' ' + member.lastName}</Typography>
          <Typography variant="body2">{member.username}</Typography>
          <Link to={`/profile/${member.username}`} className="text-blue text-decoration-none">View Member</Link>
        </div>
        <div className="col-6 text-end">
          <Typography className='pb-1' variant="body2">Joined club on: {formatTimestampToDateWithoutTime(club.members.find((m) => m.memberID === member.memberID)?.joinedDate)}</Typography>
        </div>
      </div>
    </div>
  );
}

export default MemberDetails;