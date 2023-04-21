import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
  List,
  ListItem,
  ListItemText,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { formatTimestamp } from "./formatTimestamp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";

function Comment({ comment, updateComments, depth, maxDepth }) {
  const [showNewReply, setShowNewReply] = useState(false);
  const [newReply, setNewReply] = useState('');

  const onReplyChange = (event) => {
    setNewReply(event.target.value);
  };

  const onClickReplySubmit = () => {
    // updateComments(newComment);
    console.log(newReply);
    setNewReply('');
    setShowNewReply(false);
  }

  return (
    <>
      <ListItem className={showNewReply ? "bg-light" : ""}>
        <ListItemText
          primary={
            <div>
              <b>@{comment.username}</b>
            </div>
          }
          secondary={
            <div>
              {comment.comment}
              <div className="text-start w-100">
                <small className="pe-3">
                  {formatTimestamp(comment.timestamp)}
                </small>
                <Button
                  color="primary"
                  disabled={depth >= maxDepth}
                  onClick={() => setShowNewReply(!showNewReply)}
                  className={depth < maxDepth ? "d-flex" : "d-none"}
                >
                  {showNewReply? 'Cancel' : 'Reply'}
                </Button>
              </div>
            </div>
          }
          disableTypography={true}
        />
      </ListItem>
      <div className="">
          <FormControl
            variant="outlined"
            className={showNewReply ? "d-inline-block p-3 w-100" : "d-none"}
          >
            <OutlinedInput
              id="outlined-multiline-flexible"
              placeholder="Add comment"
              onChange={(event) => onReplyChange(event)}
              value={newReply}
              multiline
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => onClickReplySubmit()}>
                    <FontAwesomeIcon icon={faReply} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      <List component="div" sx={{ pl: 4 }}>
        {comment.replies?.map((reply) => (
          <Comment key={comment._id} comment={reply} updateComments={updateComments} depth={depth+1} maxDepth={maxDepth}/>
        ))}
      </List>
    </>
  );
}

export default Comment;
