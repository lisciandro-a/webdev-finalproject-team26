import { Card } from "react-bootstrap";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { formatTimestamp } from "../common/comments/formatTimestamp";

function MemberSnippet({ member }) {
  return (
    <Card className="p-2 snippet-width">
      <Typography variant="h6">@{member.username}</Typography>
      <small>Joined {formatTimestamp(member.joinedDate)}</small>
      <Link to={`/profile/${member.username}`} className="text-blue text-decoration-none">See profile</Link>
    </Card>
  );
}

export default MemberSnippet;