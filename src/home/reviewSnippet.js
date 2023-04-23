import { Card } from "react-bootstrap";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { formatTimestamp } from "../common/comments/formatTimestamp";
import { useEffect, useState } from "react";
import Poster from "../common/poster";

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
    <Card className="p-2 snippet-width">
      <Poster poster={review.poster} />
      <Typography variant="h6">{review.title}</Typography>
      <small className="d-block">
        <Link className="text-blue text-decoration-none" to={`/profile/${review.username}`}>@{review.username}</Link>
        - {formatTimestamp(review.timestamp)}
      </small>
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