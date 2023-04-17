import React, { useEffect, useState } from "react";
// import "./commentsSection.css";
import { Button } from "react-bootstrap";
import commentExamples from "./commentExamples.json";
import Comment from "./comment";
import { List } from "@mui/material";

// load comments and update commentswill be callbacks to local database
// allows us to reuse the comments section while loading comments from different parts of database (re-use component for club discussions and )
function CommentsSection({ loadComments, updateComments }) {
  const [comments, setComments] = useState(commentExamples);

  useEffect(() => {
    // setComments(loadComments());
    setComments(commentExamples);
  }, []);

  useEffect(() => {}, [comments]);

  return (
    <div>
      <div className="mt-4 border border-dark rounded p-3">
        <div className="row">
          <div className="col-6 text-start">
            <h3>Comments</h3>
          </div>
          <div className="col-6 text-end">
            <Button className="btn btn-outline-dark" variant="light">
              New Comment
            </Button>
          </div>
        </div>
        <List className="mt-2">
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} rootComment={true} />
          ))}
        </List>
      </div>
    </div>
  );
}

export default CommentsSection;
