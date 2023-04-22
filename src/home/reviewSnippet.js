import { Card } from "react-bootstrap";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { formatTimestamp } from "../common/comments/formatTimestamp";

function ReviewSnippet({ review }) {
  return (
    <Card className="p-2">
      <img
        src={`https://simkl.in/posters/${review.poster}_m.webp`}
        alt=""
        className="img-size mb-3"
      />
      <Typography variant="h6">{review.title}</Typography>
      <small className="d-block">@{review.username} - {formatTimestamp(review.timestamp)}</small>
      <Typography variant="body1">{review.comment}</Typography>
      <Link 
        to={`/details/${review.mediaType}/${review.mediaId}`} 
        className="text-blue text-decoration-none"
      >
        See more
      </Link>
    </Card>
  );
}

export default ReviewSnippet