import { Typography, Rating } from "@mui/material";

function MediaReview({ localMedia }) {
  
  return (
    <div className="list-item p-2 border-bottom">
      <div className='row'>
        <div className='col-2 my-auto'>
          <img
            src={`https://simkl.in/posters/${localMedia.poster}_m.webp`}
            alt=""
            className="img-size"
          />
        </div>
        <div className='col-6 mt-2'>
          <div className='d-flex'>
            <div className='align-self'>
              <Typography variant="h4">{localMedia.title}</Typography>
            </div>
          </div>
          <p className="ps-1">{localMedia.comment}</p>
        </div>
        <div className='col-4 mt-2'>
          <Typography component="legend">Your rating</Typography>
          <Rating
            name="customized-10"
            defaultValue={5.7}
            value={localMedia.rating}
            max={10}
            precision={0.1}
            readOnly
            className="mb-3"
          />
          <Typography component="legend">Average user rating</Typography>
          <Rating
            name="customized-10"
            defaultValue={5.7}
            value={localMedia.avgRating}
            max={10}
            precision={0.1}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default MediaReview;