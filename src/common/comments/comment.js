import React from "react";
import Button from "@mui/material/Button";
import { List, ListItem, ListItemText } from "@mui/material";
import { formatTimestamp } from "./formatTimestamp";

function Comment({ comment, rootComment }) {
  return (
    <>
      <ListItem>
        {/* <ListItemText>
          <div className="mb-2">
            <b>@{comment.username}</b>
          </div>
          <div>
            <p>{comment.comment}</p>
          </div>
        </ListItemText> */}
        <ListItemText
          primary={
            <div>
              <b>@{comment.username}</b>
            </div>
          }
          secondary={
            <div>
              {comment.comment}
              <div className="text-start">
                {/* <small className="pe-3">{comment.timestamp}</small> */}
                <small className="pe-3">{formatTimestamp(comment.timestamp)}</small>
                <Button color="primary">Reply</Button>
              </div>
            </div>
          }
          disableTypography={true}
        />
      </ListItem>
      <List component="div" sx={{pl: 4}}>
        {comment.replies.map((reply) => (
          <Comment key={comment._id} comment={reply} rootComment={false}/>
        ))}
      </List>
      {/* <li className="list-group-item text-start">
        <b>@{comment.username}</b>
        <p>{comment.comment}</p>

        <div className="text-end">
          <Button color="primary">Reply</Button>
        </div>

      </li>
      <ol className="ms-n5">
        {comment.replies.map((reply) => (
          <Comment comment={reply} />
        ))}
      </ol> */}
    </>
  );
}

export default Comment;
