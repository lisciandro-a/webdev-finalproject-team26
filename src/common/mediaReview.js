import { Typography, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { getMediaByMediaId } from "../services/media/mediaService";
import { Link } from "react-router-dom";
import MarkItem from "./markItem";
import Poster from "./poster";

function MediaReview({ localMedia }) {
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      const result = await getMediaByMediaId(localMedia.mediaType, localMedia.mediaId);
      setMedia(result);
    }
    fetchMedia();
  }, []);
  
  return media ? (
    <div className="list-item p-2 border-bottom">
      <div className='row'>
        <div className='col-2 my-auto'>
          <Poster poster={media.poster} />
        </div>
        <div className='col-10 mt-2'>
          <div className='d-flex'>
            <div className='align-self'>
              <Typography variant="h4">{media?.title}</Typography>
            </div>
            <div className='align-self-center'>
              <MarkItem media={media}/>
            </div>
          </div>
          <Typography component="legend">Rating</Typography>
          <Rating
            name="customized-10"
            defaultValue={5.7}
            value={localMedia.rating}
            max={10}
            precision={0.1}
            readOnly
            className="mb-3"
          />
          <p className="ps-1">{localMedia.comment}</p>
          <div>
            <Link
              to={`/details/${localMedia.mediaType}/${media?.mediaId}`}
              className="text-blue text-decoration-none"
            >
              {" "}More...{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : <></>;
}

export default MediaReview;