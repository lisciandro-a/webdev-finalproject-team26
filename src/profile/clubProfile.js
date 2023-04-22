import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Popover,
  Button,
  Typography,
  Chip,
  Box,
  Tabs,
  Tab,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField
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
import {
  createClubAnnouncement,
  getClubAnnouncements,
  getClubMembers,
  deleteClubAnnouncement,
  createClubMember,
  deleteClubMember
} from "../services/clubs/clubService";

function ClubProfile({ profilePageData }) {
  const [anchorVirtualMeetings, setAnchorVirtualMeetings] = useState(null);
  const [anchorContacts, setAnchorContacts] = useState(null);
  const [anchorAnnounce, setAnchorAnnounce] = useState(null);
  const [tab, setTab] = useState(0);
  const [media, setMedia] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [members, setMembers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [following, setFollowing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const { loggedIn, profile } = useSelector((state) => state.account);
  const [viewingAsMember, setViewingAsMember] = useState(false);
  const [viewingAsGuest, setViewingAsGuest] = useState(true);

  useEffect(() => {
    if (profilePageData) {
      getMedia(profilePageData.username);
      getMembers(profilePageData.username);
      getAnnouncements(profilePageData.username);
      setViewingAsMember(profile && profilePageData && profile._id !== profilePageData._id);
      setViewingAsGuest(!profile);
    } else {

    }
  }, [tab, profilePageData, profile]);

  console.log(media);

  const getMedia = async (username) => {
    const result = await getMediaByUsername(username);
    // console.log(result);
    setMedia(result);
  };

  const getAnnouncements = async (username) => {
    const result = await getClubAnnouncements(username);
    setAnnouncements(result);
  };

  const getMembers = async (username) => {
    const result = await getClubMembers(username);
    if (profile && profilePageData._id !== profile._id ) {
      setFollowing(!!result.find((m) => m.memberId === profile._id));
    }
    setMembers(result);
  };

  const makeNewAnnouncement = async () => {
    setDialogOpen(false);
    const newAnnouncementObject = {
      clubId: profile._id,
      message: newAnnouncement,
      timestamp: new Date().getTime() + ""
    };
    await createClubAnnouncement(newAnnouncementObject);
    setNewAnnouncement("");
    getAnnouncements(profilePageData.username);
    // await database call to make a new announcement
  }

  const deleteAnnouncement = async (announcement) => {
    await deleteClubAnnouncement(announcement._id);
    getAnnouncements(profilePageData.username);
  }

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

  const onClickFollow = async () => {
    setFollowing(!following);
    if (!following) {
      const newMemberObject = {
        clubId: profilePageData._id,
        memberId: profile._id,
        joinedDate: new Date().getTime() + ""
      };
      await createClubMember(newMemberObject);
    } else {
      await deleteClubMember(profilePageData._id, profile._id);
    }

  }

  return (
    <div className="my-4">
      <div className="w-100">
        <div className="d-flex align-items-center justify-content-center">
          <h1> {profilePageData?.orgName} </h1>
          {loggedIn && profilePageData.username === profile.username ? (
            <FontAwesomeIcon
              onClick={() => setEdit(!edit)}
              className="btn ms-2 outline"
              icon={faPencil}
              size="lg"
              title="Edit profile"
            />
          ) : (
            <></>
          )}
          <Button onClick={() => onClickFollow()} className={viewingAsMember || viewingAsGuest ? "d-inline-flex" : "d-none"} disabled={viewingAsGuest}>
            {following ? "Leave" : "Join"}
          </Button>
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
              profilePageData.virtualMeetings ? "d-inline-block" : "d-none"
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
              Link: {profilePageData?.virtualMeetings?.link}
            </Typography>
            <Typography className="popover" sx={{ p: 2 }}>
              When: {profilePageData?.virtualMeetings?.meetingWeekday}s at{" "}
              {profilePageData?.virtualMeetings?.meetingTime}
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
            {announcements.map((announce) => (
              <Typography className="popover" sx={{ p: 2 }}>
                <p>{announce.message}</p>{" "}
                <small>{formatTimestampToDate(announce.timestamp)}</small>
                <Button onClick={() => deleteAnnouncement(announce)} className={viewingAsGuest || viewingAsMember ? "d-none" : "d-inline-flex"}><small>Remove</small></Button>
              </Typography>
            ))}
            <Button onClick={() => setDialogOpen(true)} className={viewingAsGuest || viewingAsMember ? "d-none" : "d-inline-flex"}>New Announcement</Button>
            <Dialog open={dialogOpen} onClose={() => {setDialogOpen(false); setNewAnnouncement("")}} fullWidth>
              <DialogTitle>Announcement</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  type="test"
                  fullWidth
                  variant="standard"
                  placeholder="Enter new announcement here"
                  onChange={(event) => setNewAnnouncement(event.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => {setDialogOpen(false); setNewAnnouncement("")}}>Cancel</Button>
                <Button onClick={() => makeNewAnnouncement()}>Create</Button>
              </DialogActions>
            </Dialog>
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
            className={profilePageData?.watchMovies ? "inline-flex" : "d-none"}
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
          {media
            .filter(
              (d) =>
                parseInt(d.discussionDate) >= currDate || d.discussionDate === ""
            )
            .map((ud) => (
              <DiscussionDetails
                localMedia={ud}
                clubID={profilePageData?.username}
                updateMediaCallback={() => getMedia(profilePageData?.username)}
                viewingAsGuest={viewingAsGuest}
                viewingAsMember={viewingAsMember}
                followingClub={following}
              />
            ))}
        </div>
        <div hidden={tab !== 1} className="text-start pt-2">
          {media
            .filter((d) => parseInt(d.discussionDate) < currDate)
            .map((ud) => (
              <DiscussionDetails
                localMedia={ud}
                clubID={profilePageData?.username}
                updateMediaCallback={() => getMedia(profilePageData?.username)}
                viewingAsGuest={viewingAsGuest}
                viewingAsMember={viewingAsMember}
                followingClub={following}
              />
            ))}
        </div>
        <div hidden={tab !== 2} className="text-start pt-2">
          {members.map((m) => (
            <MemberDetails
              key={m._id}
              clubMembers={members}
              member={m}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClubProfile;
