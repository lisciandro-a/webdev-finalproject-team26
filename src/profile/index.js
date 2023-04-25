import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import ClubProfile from "./clubProfile";
import MemberProfile from "./memberProfile";
import { getProfileByUsername } from "../services/accounts/accountService";
import { NotFound } from "../common";


function Profile() {
  const { profileID } = useParams();
  const { loggedIn, profile, attemptedLogin } = useSelector(state => state.account);
  const [ user, setUser ] = useState(profile);
  const [ loadingProfile, setLoadingProfile ] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    if (profile && !profileID) {
      setUser(profile);
      setLoadingProfile(false);
    } else if (!profileID && attemptedLogin) {
      setLoadingProfile(false);
      navigate('/login');
    }
  }, [profile, attemptedLogin]);

  useEffect(() => {
    if (profileID) {
      if (profile && profile.username === profileID) {
        console.log("here");
        navigate('/profile');
      }
      const getUser = async () => {
        setLoadingProfile(true);
        const profile = await getProfileByUsername(profileID);
        setUser(profile);
        setLoadingProfile(false);
      }
      
      getUser();
    }
  }, [profile]);

  return loadingProfile ? <>Loading...</> : ( user ? (user.isMemberAccount ? <MemberProfile profilePageData={user} /> : <ClubProfile profilePageData={user}/>) : <NotFound/>);
}

export default Profile;