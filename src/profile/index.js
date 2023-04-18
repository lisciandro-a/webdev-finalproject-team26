import React from "react";
import { useParams } from "react-router";
import ClubProfile from "./clubProfile";
import MemberProfile from "./memberProfile";

function Profile() {
    const { profileID } = useParams();
    const isClub = true;

  return (
    <div>
        {isClub? <ClubProfile /> : <MemberProfile />}       
    </div>
  );
}

export default Profile;
