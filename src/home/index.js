import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ReviewSnippet from "./reviewSnippet";
import AnnouncementSnippet from "./announcementSnippet";
import MemberSnippet from "./memberSnippet";
import { getNewAnnouncements, getNewComments, getNewMembersForClub, getPopularClubs } from "../services/clubs/clubService";
import { getRecentReviews, getRecentReviewsOnLiked } from "../services/media/mediaService";
import PopularClubSnippet from "./popularClubSnippet";

function Home() {
  const {loggedIn, profile} = useSelector(state => state.account);
  const [recentReviews, setRecentReviews] = useState([]);
  const [popularClubs, setPopularClubs] = useState([]);
  const [newReviewsOnLiked, setNewReviewsOnLiked] = useState([]);
  const [newAnnouncements, setNewAnnouncements] = useState([]);
  const [newCommentsOnDiscussion, setNewCommentsOnDiscussion] = useState([]);
  const [newMembers, setNewMembers] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      if (profile.isMemberAccount) {
        // load member profile data
        fetchNewReviews();
        fetchNewAnnouncements();
      } else {
        // load club profile data
        fetchNewComments();
        fetchNewMembers();
      }
    } else {
      // load anonymous data
      fetchRecentReviews();
      fetchPopularClubs();
    }
  }, [loggedIn, profile]);

  const fetchRecentReviews = async () => {
    // get reviews from database
    const reviews = await getRecentReviews();
    setRecentReviews(reviews);
  }

  const fetchPopularClubs = async () => {
    // get clubs from database
    const clubs = await getPopularClubs();
    setPopularClubs(clubs);
  }

  const fetchNewReviews = async () => {
    const reviews = await getRecentReviewsOnLiked(profile.username);
    setNewReviewsOnLiked(reviews);
  }

  const fetchNewAnnouncements = async () => {
    // get clubs from database
    const announcements = await getNewAnnouncements(profile.username);
    setNewAnnouncements(announcements);
  }

  const fetchNewComments = async () => {
    // get comments from database
    const comments = await getNewComments(profile.username);
    setNewCommentsOnDiscussion(comments);
  }

  const fetchNewMembers = async () => {
    // get new members from database
    const members = await getNewMembersForClub(profile.username);
    setNewMembers(members);
  }

  return (
    <div className="mx-auto my-4">
      <Typography variant="h2" className="mb-0">Welcome to WatchIt</Typography>
      <Typography variant="h5">WatchIt. DiscussIt. ReviewIt.</Typography>
      { loggedIn ? (profile.isMemberAccount ? 
        <>
          <hr></hr>
          <div className="my-4">
            <Typography variant="h5" className="mb-0">New reviews on movies you liked</Typography>
            <div className="w-100">
              <div className="d-flex p-4 gap-3 flex-wrap justify-content-center">
                {newReviewsOnLiked.map((r) => <ReviewSnippet review={r}/>)}
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="my-4">
            <Typography variant="h5" className="mb-0">New announcements from your clubs</Typography>
            <div className="w-100">
              <div className="d-flex p-4 gap-3 flex-wrap justify-content-center">
                {newAnnouncements.map((a) => <AnnouncementSnippet announcement={a}/>)}
              </div>
            </div>
          </div>
        </>
        : (
          <>
          <hr></hr>
          <div className="my-4">
            <Typography variant="h5" className="mb-0">New comments on your discussions</Typography>
            <div className="w-100">
              <div className="d-flex p-4 gap-3 flex-wrap justify-content-center">
                {newCommentsOnDiscussion.map((r) => <ReviewSnippet review={r} isDiscussion={true}/>)}
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="my-4">
            <Typography variant="h5" className="mb-0">New members joined your club</Typography>
            <div className="w-100">
              <div className="d-flex p-4 gap-3 flex-wrap justify-content-center">
                {newMembers.map((a) => <MemberSnippet member={a}/>)}
              </div>
            </div>
          </div>
          </>)
        )
        : 
        <>
          <hr></hr>
          <div className="my-4">
            <Typography variant="h5" className="mb-0">Recently reviewed</Typography>
            <div className="w-100">
              <div className="d-flex p-4 gap-3 flex-wrap justify-content-center">
                {recentReviews.map((r) => <ReviewSnippet review={r}/>)}
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="my-4">
            <Typography variant="h5" className="mb-0">Popular clubs</Typography>
            <div className="w-100">
              <div className="d-flex p-4 gap-3 flex-wrap justify-content-center">
                {popularClubs.map((c) => <PopularClubSnippet club={c}/>)}
              </div>
            </div>
          </div>
        </>
      }
    </div>
    
  );
}

export default Home;
