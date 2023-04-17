import React from "react";
import { Rating, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faHeart } from "@fortawesome/free-solid-svg-icons";

function MarkItem() {
  return (
    <span>
      <div className="d-inline-block">
              <Tooltip title="Watched">
        <Rating
          name="customized-color"
          defaultValue={0}
          precision={1}
          max={1}
          icon={
            <FontAwesomeIcon icon={faCircleCheck} className="text-success" />
          }
          emptyIcon={<FontAwesomeIcon icon={faCircleCheck} />}
          className="ps-3 pe-md-3"
        />
      </Tooltip>

      <Tooltip title="Liked">
        <Rating
          name="customized-color"
          defaultValue={0}
          precision={1}
          max={1}
          icon={<FontAwesomeIcon icon={faHeart} className="text-danger" />}
          emptyIcon={<FontAwesomeIcon icon={faHeart} />}
          className="ps-3"
        />
      </Tooltip>
      </div>

    </span>
  );
}

export default MarkItem;
