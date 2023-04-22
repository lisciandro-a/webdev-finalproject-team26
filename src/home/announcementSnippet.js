import { Card } from "react-bootstrap";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { formatTimestamp } from "../common/comments/formatTimestamp";

function AnnouncementSnippet({ announcement }) {

  return (
    <Card className="p-2">
      <Typography variant="h6">{announcement.orgName}</Typography>
      <Typography variant="body2">{announcement.message}</Typography>
      <small>{formatTimestamp(announcement.timestamp)}</small>
      <Link to={`/profile/${announcement.username}`} className="text-blue text-decoration-none">See club</Link>
    </Card>
  );
}

export default AnnouncementSnippet;