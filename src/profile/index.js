import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ClubProfile from "./clubProfile";


function Profile() {
  const { loggedIn, profile } = useSelector(state => state.account);

  console.log(loggedIn, profile);

  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  })

  return ( profile?.isMemberAccount ?
    (<div className="container">
      <div>
        <Card className='text-center'>
          <Card.Header>
              <h3 className="mb-1">Profile</h3>
          </Card.Header>
          <Card.Body className="text-start mb-2">
            <h4>
              {`${profile?.firstName} ${profile?.lastName}`}
            </h4>
            <h5>
              {`${profile?.username}`}
            </h5>
          </Card.Body>
        </Card>
      </div>
    </div>) : <ClubProfile/>);
}

export default Profile;