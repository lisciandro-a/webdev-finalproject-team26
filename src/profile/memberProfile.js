import React, { useEffect, useState } from "react";
import { Popover, Button, Typography, Chip, Box, Tabs, Tab } from "@mui/material";
import "./profile.css";
import MediaDetails from "../common/mediaDetails";
import MediaReview from "../common/mediaReview";
import ClubDetails from "../common/clubDetails";
import { getMediaByUsername } from "../services/media/mediaService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import UpdateProfile from "./updateProfile";
import { useSelector } from "react-redux";

function MemberProfile() {
  const [anchorContacts, setAnchorContacts] = useState(null);
  const [tab, setTab] = useState(0);
  const [media, setMedia] = useState([]);
  const [edit, setEdit] = useState(false);
  const { profile } = useSelector(state => state.account);

  const onClickContacts = (event) => {
    setAnchorContacts(event.currentTarget);
  };

  useEffect(() => {
    getMedia(profile.username);
  }, [tab])

  const getMedia = async (username) => {
    const result = await getMediaByUsername(username);
    setMedia(result);
  }

  return (
    <div className="my-4">
      <div className="w-100">
        <div className="d-flex align-items-center justify-content-center">
          <h1> {profile?.firstName + ' ' + profile?.lastName} </h1>
          <FontAwesomeIcon onClick={() => setEdit(!edit)} className="btn ms-2 outline" icon={faPencil} size="lg" title="Edit profile"/>
        </div>
        <small>@{profile?.username}</small>
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
            {profile?.contacts?.map((contact, idx) => (
              <Typography key={idx} className="popover" sx={{ p: 2 }}>
                {contact.type}: {contact.value}
              </Typography>
            ))}
          </Popover>
        </div>
      </div>

      {
        edit ? (<UpdateProfile setEdit={setEdit}/>
          
         ) : <></>
      }

      <div className="text-start mt-3">
        <h3>About me</h3>
        <p>{profile?.bio}</p>
        <div>
          <Chip
            label="Movies"
            className={
              profile?.watchMovies ? "inline-flex px-1 me-1" : "d-none"
            }
          />
          <Chip
            label="Tv"
            className={profile?.watchTv ? "inline-flex px-1 mx-1" : "d-none"}
          />
          <Chip
            label="Anime"
            className={profile?.watchAnime ? "inline-flex px-1 mx-1" : "d-none"}
          />
        </div>
      </div>

      <div className="mt-4">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={(event, newValue) => {
              setTab(newValue);
            }}
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
            media.filter((m) => m.watched).map((m) => <MediaDetails key={m.mediaId} profile={profile} localMedia={m}/>)
          }
        </div>
        <div hidden={tab !== 1} className="text-start pt-2">
          {
            media.filter((m) => m.liked).map((m) => <MediaDetails key={m.mediaId} profile={profile} localMedia={m}/>)
          }
        </div>
        <div hidden={tab !== 2} className="text-start pt-2">
          {
            media.filter((m) => m.reviewed).map((r) => <MediaReview key={r.mediaId} localMedia={r}/>)
          }
        </div>
        <div hidden={tab !== 3} className="text-start pt-2">
          {
            profile?.clubs?.map((c) => <ClubDetails key={c.mediaId} club={c}/>)
          }
        </div>
      </div>
    </div>
  );
}

export default MemberProfile;
