import { Typography } from "@mui/material";
import { formatTimestampToDateWithoutTime } from "./comments/formatTimestamp";
import { Link } from "react-router-dom";


function ClubDetails({ club }) {
  return (
    <div className="p-2 border-bottom">
      <div className="row">
        <div className="col-6">
          <Typography variant="h4">{club.orgName}</Typography>
          <Typography variant="body1">{club.meetingFrequency}</Typography>
          <Link to={`/clubs/${club._id}`} className="text-blue text-decoration-none">View club</Link>
        </div>
        <div className="col-6 text-end">
          <Typography className='pb-1' variant="body2">You joined this club on: {formatTimestampToDateWithoutTime(club.joinedDate)}</Typography>
          <Typography className='pb-1' variant="body2">Next club meeting on: {formatTimestampToDateWithoutTime(club.nextMeeting)}</Typography>
        </div>
      </div>
    </div>
  );
}

export default ClubDetails;