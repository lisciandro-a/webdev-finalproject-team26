import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  FormControl,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import commentExamples from "./commentExamples.json";
import Comment from "./comment";
import { List, InputAdornment } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";

// load comments and update commentswill be callbacks to local database
// allows us to reuse the comments section while loading comments from different parts of database (re-use component for club discussions and )
function CommentsSection({ loadComments, updateComments, maxDepth, sectionTitle }) {
  const [comments, setComments] = useState(commentExamples);
  const [showNewComment, setShowNewComment] = useState(false);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // setComments(loadComments());
    console.log(maxDepth);
    setComments(commentExamples);
  }, []);

  useEffect(() => {}, [comments]);

  const onCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const onClickCommentSubmit = () => {
    // updateComments(newComment);
    console.log(newComment);
    setNewComment('');
    setShowNewComment(false);
  }

  return (
    <div>
      <div className="mt-4 border border-dark rounded p-3">
        <div className="row position-relative">
          <div className="col-6 text-start">
            <h3>{sectionTitle}s</h3>
          </div>
          <div className="col-6 text-end">
            <Button className="btn btn-outline-dark" variant="light" onClick={() => setShowNewComment(!showNewComment)}>
              {showNewComment? 'Cancel' : `New ${sectionTitle}`}
            </Button>
          </div>

          <FormControl variant="outlined" className={showNewComment? 'd-inline-block p-3' : 'd-none'}>
            <OutlinedInput
              id="outlined-multiline-flexible"
              placeholder="Add comment"
              onChange={(event) => onCommentChange(event)}
              value={newComment}
              multiline
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => onClickCommentSubmit()}>
                    <FontAwesomeIcon icon={faReply} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <List className="mt-2">
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} updateComments={updateComments} depth={0} maxDepth={maxDepth}/>
          ))}
        </List>
      </div>
    </div>
  );
}

export default CommentsSection;
