import React, { useState } from "react";
import memberProfileDetails from "./memberProfileExample.json";
import { Popover, Button, Typography, Chip, Box, Tabs, Tab } from "@mui/material";
import "./profile.css";
import MediaDetails from "../common/mediaDetails";
import MediaReview from "../common/mediaReview";
import ClubDetails from "../common/clubDetails";

function MemberProfile() {
  const [anchorContacts, setAnchorContacts] = useState(null);
  const [tab, setTab] = useState(0);

  const onClickContacts = (event) => {
    setAnchorContacts(event.currentTarget);
  };

  return (
    <div className="my-4">
      <div className="w-100">
        <h1> {memberProfileDetails.firstName + ' ' + memberProfileDetails.lastName} </h1>
        <small>{memberProfileDetails.username}</small>
      </div>

      <div className="w-100 d-flex flex-wrap justify-content-center mt-1">
        <div className="pe-1 pt-2">
          <Button
            variant="contained"
            onClick={(event) => onClickContacts(event)}
          >
            Contact
          </Button>
          <Popover
            id={anchorContacts ? "simple-popover" : undefined}
            open={!!anchorContacts}
            anchorEl={anchorContacts}
            onClose={() => setAnchorContacts(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            {memberProfileDetails.contacts?.map((contact, idx) => (
              <Typography key={idx} className="popover" sx={{ p: 2 }}>
                {contact.type}: {contact.value}
              </Typography>
            ))}
          </Popover>
        </div>
      </div>

      <div className="text-start mt-3">
        <h3>About me</h3>
        <p>{memberProfileDetails.bio}</p>
        <div>
          <Chip
            label="Movies"
            className={
              memberProfileDetails.watchMovies ? "inline-flex px-1 me-1" : "d-none"
            }
          />
          <Chip
            label="Tv"
            className={memberProfileDetails.watchTv ? "inline-flex px-1 mx-1" : "d-none"}
          />
          <Chip
            label="Anime"
            className={memberProfileDetails.watchAnime ? "inline-flex px-1 mx-1" : "d-none"}
          />
        </div>
      </div>

      <div className="mt-4">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={(event, newValue) => setTab(newValue)}
            aria-label="basic tabs example"
          >
            <Tab label="Watched" id='watched' wrapped/>
            <Tab label="Liked" id='liked' wrapped/>
            <Tab label="Reviews" id='reviews' wrapped/>
            <Tab label="Clubs" id='clubs' wrapped/>
          </Tabs>
        </Box>
        <div hidden={tab !== 0} className="text-start pt-2">
          {
            memberProfileDetails.watched.map((w) => <MediaDetails localMedia={w}/>)
          }
        </div>
        <div hidden={tab !== 1} className="text-start pt-2">
          {
            memberProfileDetails.liked.map((l) => <MediaDetails localMedia={l}/>)
          }
        </div>
        <div hidden={tab !== 2} className="text-start pt-2">
          {
            memberProfileDetails.reviews.map((r) => <MediaReview localMedia={r}/>)
          }
        </div>
        <div hidden={tab !== 3} className="text-start pt-2">
          {
            memberProfileDetails.clubs.map((c) => <ClubDetails club={c}/>)
          }
        </div>
      </div>
    </div>
  );
}

export default MemberProfile;
