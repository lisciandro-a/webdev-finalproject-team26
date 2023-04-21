import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import ClubProfile from "./clubProfile";
import MemberProfile from "./memberProfile";
import { getProfileByUsername } from "../services/accounts/accountService";
import { NotFound } from "../common";


function Profile() {
  const { profileID } = useParams();
  const { loggedIn, profile } = useSelector(state => state.account);
  const [ user, setUser ] = useState(profile);
  const [ loadingProfile, setLoadingProfile ] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn && !profileID) {
      navigate('/login');
    } 
    if (profileID) {
      const getUser = async () => {
        setLoadingProfile(true);
        const profile = await getProfileByUsername(profileID);
        setUser(profile);
        setLoadingProfile(false);
      }
      
      getUser();
      
    } else {
      setUser(profile);
    }
  }, [profileID]);

  return loadingProfile ? <>Loading...</> : ( user ? (user.isMemberAccount ? <MemberProfile /> : <ClubProfile profile={user}/>) : <NotFound/>);
}

export default Profile;