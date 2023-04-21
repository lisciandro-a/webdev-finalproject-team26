import React from "react";
import { useSelector } from "react-redux";
import { Rating, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faHeart, faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

function MarkItem({ liked, watched, discussing }) {
  const { loggedIn, profile } = useSelector(state => state.account);

  return (

    <span>
      <div className={loggedIn && profile?.isMemberAccount ? "d-inline-block" : "d-none"}>
        <Tooltip title="Watched">
          <Rating
            name="customized-color"
            defaultValue={watched ? 1 : 0}
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
            defaultValue={liked ? 1 : 0}
            precision={1}
            max={1}
            icon={<FontAwesomeIcon icon={faHeart} className="text-danger" />}
            emptyIcon={<FontAwesomeIcon icon={faHeart} />}
            className="ps-3"
          />
        </Tooltip>
      </div>
      <div className={loggedIn && profile?.isMemberAccount ? "d-none" : "d-inline-block"}>
      <Tooltip title="Discussing">
          <Rating
            name="customized-color"
            defaultValue={discussing ? 1 : 0}
            precision={1}
            max={1}
            icon={<FontAwesomeIcon icon={faMinusCircle} className="text-warning" />}
            emptyIcon={<FontAwesomeIcon icon={faPlusCircle} />}
            className="ps-3"
          />
        </Tooltip>
      </div>

    </span>
  );
}

export default MarkItem;
