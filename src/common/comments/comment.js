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

function Comment({ comment, depth }) {
  const [showNewReply, setShowNewReply] = useState(false);

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
                  disabled={depth > 2}
                  onClick={() => setShowNewReply(!showNewReply)}
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
              multiline
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <FontAwesomeIcon icon={faReply} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      <List component="div" sx={{ pl: 4 }}>
        {comment.replies.map((reply) => (
          <Comment key={comment._id} comment={reply} depth={depth+1}/>
        ))}
      </List>
    </>
  );
}

export default Comment;
