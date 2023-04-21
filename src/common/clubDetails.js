import { Typography } from "@mui/material";
import { formatTimestampToDateWithoutTime } from "./comments/formatTimestamp";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function ClubDetails({ club }) {
  const { profile } = useSelector(state => state.account);
  const [joinedDate, setJoinedDate] = useState('');
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const joined = club.members.find((member) => member.memberId === profile._id);
    setJoinedDate(joined);
  }, [profile, club]);

  useEffect(() => {
    const latest = club.announcements.sort((a, b) => new Date(b) - new Date(a));
    setAnnouncement(latest[0].message);
  }, [club])

  return (
    <div className="p-2 border-bottom">
      <div className="row">
        <div className="col-6">
          <Typography variant="h4">{club.orgName}</Typography>
          <Typography className="d-inline" variant="h6">Latest: </Typography>
          <Typography className="d-inline" variant="body1">{announcement}</Typography>
          <Link to={`/profile/${club.username}`} className="text-blue text-decoration-none d-block">View club</Link>
        </div>
        <div className="col-6 text-end">
          <div className="align-text-bottom">
            <Typography className='pb-1' variant="body2">You joined this club on: {formatTimestampToDateWithoutTime(joinedDate.joinedDate)}</Typography>
            { club.virtualMeetings ? 
              <Typography className='pb-1' variant="body2">
                {"Virtual meetings every " + club.virtualMeetings.meetingWeekday + " at " + club.virtualMeetings.meetingTime}
              </Typography> :
              <></>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubDetails;