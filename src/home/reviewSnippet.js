import { Card } from "react-bootstrap";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { formatTimestamp } from "../common/comments/formatTimestamp";
import { useEffect, useState } from "react";

function ReviewSnippet({ review, isDiscussion }) {
  const [path, setPath] = useState('');
  useEffect(() => {
    if (isDiscussion) {
      setPath(`/club/${review.clubUsername}/discussion/${review.mediaType}/${review.mediaId}`)
    } else {
      setPath(`/details/${review.mediaType}/${review.mediaId}`);
    }
  }, [review, isDiscussion])
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
        to={path} 
        className="text-blue text-decoration-none"
      >
        See more
      </Link>
    </Card>
  );
}

export default ReviewSnippet