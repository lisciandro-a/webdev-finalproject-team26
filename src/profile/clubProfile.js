import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import clubProfileDetails from "./clubDetailsExample.json";
import {
  Popover,
  Button,
  Typography,
  Chip,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import "./profile.css";
import "bootstrap/js/src/collapse.js";
import { formatTimestampToDate } from "../common/comments/formatTimestamp";
import MemberDetails from "../common/memberDetails";
import DiscussionDetails from "../common/discussionDetails";
import { getMediaByUsername } from "../services/media/mediaService";
import UpdateClubProfile from "./updateClubProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

function ClubProfile({ profilePageData }) {
  const [anchorVirtualMeetings, setAnchorVirtualMeetings] = useState(null);
  const [anchorContacts, setAnchorContacts] = useState(null);
  const [anchorAnnounce, setAnchorAnnounce] = useState(null);
  const [tab, setTab] = useState(0);
  const [media, setMedia] = useState([]);
  const [edit, setEdit] = useState(false);
  const [following, setFollowing] = useState(false);
  const { profile } = useSelector((state) => state.account);

  useEffect(() => {
    if (profilePageData) {
      getMedia(profilePageData.username);
    }
  }, [tab, profilePageData]);

  const getMedia = async (username) => {
    const result = await getMediaByUsername(username);
    setMedia(result);
  };

  const currDate = new Date().getTime();

  const onClickVirtualMeeting = (event) => {
    setAnchorVirtualMeetings(event.currentTarget);
  };

  const onClickContacts = (event) => {
    setAnchorContacts(event.currentTarget);
  };

  const onClickAnnounce = (event) => {
    setAnchorAnnounce(event.currentTarget);
  };

  return (
    <div className="my-4">
      <div className="w-100">
        <div className="d-flex align-items-center justify-content-center">
          <h1> {profilePageData?.orgName} </h1>
          <FontAwesomeIcon
            onClick={() => setEdit(!edit)}
            className="btn ms-2 outline"
            icon={faPencil}
            size="lg"
            title="Edit profile"
          />
          <Button onClick={() => setFollowing(!following)}>{following? "Unfollow" : "Follow"}</Button>
        </div>

        <small>@{profilePageData?.username}</small>
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
            {profilePageData?.contacts?.map((contact) => (
              <Typography className="popover" sx={{ p: 2 }}>
                {contact.type}: {contact.value}
              </Typography>
            ))}
          </Popover>
        </div>
        <div className="px-1 pt-2">
          <Button
            variant="contained"
            onClick={(event) => onClickVirtualMeeting(event)}
            className={
              clubProfileDetails.virtualMeetings ? "d-inline-block" : "d-none"
            }
          >
            Virtual Meeting Details
          </Button>
          <Popover
            id={anchorVirtualMeetings ? "simple-popover" : undefined}
            open={!!anchorVirtualMeetings}
            anchorEl={anchorVirtualMeetings}
            onClose={() => setAnchorVirtualMeetings(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography className="popover" sx={{ p: 2 }}>
              Link: {clubProfileDetails.virtualMeetings?.link}
            </Typography>
            <Typography className="popover" sx={{ p: 2 }}>
              When: {clubProfileDetails.virtualMeetings?.meetingWeekday}s at{" "}
              {clubProfileDetails.virtualMeetings?.meetingTime}
            </Typography>
          </Popover>
        </div>
        <div className="ps-1 pt-2">
          <Button
            variant="contained"
            onClick={(event) => onClickAnnounce(event)}
          >
            Announcements
          </Button>
          <Popover
            id={anchorAnnounce ? "simple-popover" : undefined}
            open={!!anchorAnnounce}
            anchorEl={anchorAnnounce}
            onClose={() => setAnchorAnnounce(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            {clubProfileDetails?.announcements?.map((announce) => (
              <Typography className="popover" sx={{ p: 2 }}>
                <p>{announce.message}</p>{" "}
                <small>{formatTimestampToDate(announce.timestamp)}</small>
              </Typography>
            ))}
          </Popover>
        </div>
      </div>

      {edit ? <UpdateClubProfile setEdit={setEdit} /> : <></>}

      <div className="text-start mt-3">
        <h3>Description</h3>
        <p>{profilePageData?.bio}</p>
        <div>
          <Chip
            label="Movies"
            className={
              profilePageData?.watchMovies ? "inline-flex" : "d-none"
            }
          />
          <Chip
            label="Tv"
            className={profilePageData?.watchTv ? "inline-flex" : "d-none"}
          />
          <Chip
            label="Anime"
            className={profilePageData?.watchAnime ? "inline-flex" : "d-none"}
          />
        </div>
      </div>

      <div className="mt-5">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={(event, newValue) => setTab(newValue)}
            aria-label="basic tabs example"
          >
            <Tab label="Upcoming Discussions" id="upcoming" wrapped />
            <Tab label="Past Discussions" id="past" wrapped />
            <Tab label="Members" id="members" wrapped />
          </Tabs>
        </Box>
        <div hidden={tab !== 0} className="text-start pt-2">
          {clubProfileDetails.discussionList
            .filter((d) => parseInt(d.discussionDate) <= currDate)
            .map((ud) => (
              <DiscussionDetails
                localMedia={ud}
                clubID={clubProfileDetails._id}
              />
            ))}
        </div>
        <div hidden={tab !== 1} className="text-start pt-2">
          {clubProfileDetails.discussionList
            .filter((d) => parseInt(d.discussionDate) > currDate)
            .map((ud) => (
              <DiscussionDetails
                localMedia={ud}
                clubID={media._id}
              />
            ))}
        </div>
        <div hidden={tab !== 2} className="text-start pt-2">
          {clubProfileDetails?.members?.map((m) => (
            <MemberDetails club={clubProfileDetails} member={m} isOwnProfile={profile && profilePageData && profile?.username === profilePageData?.username} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClubProfile;
