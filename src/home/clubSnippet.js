import { Card } from "react-bootstrap";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ClubSnippet({ club }) {
  return (
    <Card className="p-2 snippet-width">
      <Typography variant="h6">{club.orgName}</Typography>
      <Typography variant="body2">{(club.members?.length ?? club.numMembers) ?? 0} members</Typography>
      <Link to={`/profile/${club.username}`} className="text-blue text-decoration-none">See club</Link>
    </Card>
  );
}

export default ClubSnippet;