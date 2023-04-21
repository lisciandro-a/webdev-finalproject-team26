import React from "react";
import { Card } from "react-bootstrap";
import './home.css';
import { Link } from "react-router-dom";
import { Chip, Typography, Rating, IconButton } from "@mui/material";

function Home() {
    const media = {
      poster: "13/1348110199d54afb40"
    }
    return (
      <div className="mx-auto my-4">
        <Typography variant="h2" className="mb-0">Welcome to WatchIt</Typography>
        <Typography variant="h5">WatchIt. DiscussIt. ReviewIt.</Typography>
        <hr></hr>
        <div className="my-4">
          <Typography variant="h4" className="mb-0">Recent Reviews</Typography>
          <div className="w-100">
            <div className="d-flex p-4 gap-3 flex-wrap justify-content-center">
              <Card className="p-2 w-25">
                <img
                  src={`https://simkl.in/posters/${media?.poster}_m.webp`}
                  alt=""
                  className="img-size mb-3"
                />
                <Typography variant="h6">Perfect Match</Typography>
                <Link to="#" className="text-blue text-decoration-none">View discussion</Link>
              </Card>
              <Card className="p-2 w-25">
                <img
                  src={`https://simkl.in/posters/${media?.poster}_m.webp`}
                  alt=""
                  className="img-size mb-3"
                />
                <Typography variant="h6">Perfect Match</Typography>
                <Link to="#" className="text-blue text-decoration-none">View discussion</Link>
              </Card>
              <Card className="p-2 w-25">
                <img
                  src={`https://simkl.in/posters/${media?.poster}_m.webp`}
                  alt=""
                  className="img-size mb-3"
                />
                <Typography variant="h6">Perfect Match</Typography>
                <Link to="#" className="text-blue text-decoration-none">View discussion</Link>
              </Card>
            </div>
          </div>
          <hr></hr>
          <div className="my-4">
            <Typography variant="h4" className="mb-0">Popular Clubs</Typography>
            <div className="w-100">
              <div className="d-flex p-4 gap-3 flex-wrap justify-content-center">
                <Card className="p-2 w-25">
                  <Typography variant="h6">Mike's Movie Mates</Typography>
                  <Typography variant="body1">@mike</Typography>
                  <Link to="#" className="text-blue text-decoration-none">View club</Link>
                </Card>
                <Card className="p-2 w-25">
                  <Typography variant="h6">Mike's Movie Mates</Typography>
                  <Typography variant="body1">@mike</Typography>
                  <Link to="#" className="text-blue text-decoration-none">View club</Link>
                </Card>
                <Card className="p-2 w-25">
                  <Typography variant="h6">Mike's Movie Mates</Typography>
                  <Typography variant="body1">@mike</Typography>
                  <Link to="#" className="text-blue text-decoration-none">View club</Link>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Home;
