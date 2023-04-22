import { Card } from "react-bootstrap";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function PopularClubSnippet({ club }) {
  return (
    <Card className="p-2">
      <Typography variant="h6">{club.orgName}</Typography>
      <Typography variant="body2">{club.numMembers ?? 0} members</Typography>
      <Link to={`/profile/${club.username}`} className="text-blue text-decoration-none">See club</Link>
    </Card>
  );
}

export default PopularClubSnippet;