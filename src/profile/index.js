import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ClubProfile from "./clubProfile";
import MemberProfile from "./memberProfile";


function Profile() {
  const { loggedIn, profile } = useSelector(state => state.account);

  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  });

  return ( profile?.isMemberAccount ? <MemberProfile/> : <ClubProfile/>);
}

export default Profile;