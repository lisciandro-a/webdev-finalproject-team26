import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { accountUpdateThunk } from "../services/accounts/accountThunks";

function UpdateProfile ({setEdit}) {
  const { profile } = useSelector(state => state.account);
  const [updatedProfile, setUpdatedProfile] = useState(profile);
  const [contacts, setContacts] = useState([
    ...profile?.contacts,
    {
      type: undefined,
      value: undefined,
    },
    {
      type: undefined,
      value: undefined,
    },
    {
      type: undefined,
      value: undefined,
    }
  ])
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const updateProfile = async (e) => {
    e.preventDefault();
    const newContacts = contacts.filter((c) => c.type && c.value)
    const updateObject = {
      ...updatedProfile,
      contacts: newContacts,
      password,
      oldUsername: profile.username
    }
    console.log(updateObject);
    await dispatch(accountUpdateThunk(updateObject)).unwrap();
    setEdit(false);
  }

  return (
    <div className='mt-3'>
      <Card className="w-50 mx-auto text-start">
        <h5 className="px-4 mt-2 text-center">Update Profile</h5>
        <form onSubmit={(e) => updateProfile(e)} className="px-3">
          <div className="d-flex justify-content-center flex-wrap gap-3">
            <div className="flex-fill">
              <label htmlFor="update-fname" className="py-1">First name</label>
              <input 
                id="update-fname"
                className="form-control" 
                defaultValue={profile.firstName}
                onChange={(e) => {
                  setUpdatedProfile({
                    ...updatedProfile,
                    firstName: e.target.value,
                  })
                }}
              ></input>
            </div>
            <div className="flex-fill">
              <label htmlFor="update-lname" className="py-1">Last name</label>
              <input 
                id="update-lname" 
                className="form-control" 
                defaultValue={profile.lastName}
                onChange={(e) => {
                  setUpdatedProfile({
                    ...updatedProfile,
                    lastName: e.target.value,
                  })
                }}
              ></input>
            </div>
          </div>
          <div className="d-flex justify-content-center flex-wrap gap-3 pt-2">
            <div className="flex-fill">
              <label htmlFor="update-username" className="py-1">Username</label>
              <input 
                id="update-username"
                className="form-control" 
                defaultValue={profile.username}
                onChange={(e) => {
                  setUpdatedProfile({
                    ...updatedProfile,
                    username: e.target.value,
                  })
                }}
              ></input>
            </div>
            <div className="flex-fill">
              <label htmlFor="update-email" className="py-1">Email</label>
              <input 
                id="update-email" 
                className="form-control" 
                defaultValue={profile.email}
                onChange={(e) => {
                  setUpdatedProfile({
                    ...updatedProfile,
                    email: e.target.value,
                  })
                }}
              ></input>
            </div>
          </div>
          <div className="pt-2">
              <label htmlFor="password" className="">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </button>
              </div>
            </div>

          <div className="pt-2">
            <label htmlFor="update-bio" className="py-1">Bio</label>
            <textarea 
              id="update-bio" 
              className="form-control" 
              value={updatedProfile.bio}
              onChange={(e) => {
                  setUpdatedProfile({
                    ...updatedProfile,
                    bio: e.target.value,
                  })
                }}
            ></textarea>
          </div>
          <div className="pt-2">
            <div className="d-flex justify-content-evenly">
              <div>
                <input type="checkbox" id="anime" checked={updatedProfile.watchAnime} onChange={() => {
                  setUpdatedProfile({
                    ...updatedProfile,
                    watchAnime: !updatedProfile.watchAnime
                  });
                }}></input>
                <label htmlFor="id_anime" className="ps-1">Anime</label>
              </div>
              <div>
                <input type="checkbox" id="movie" checked={updatedProfile.watchMovies} onChange={() => {
                  setUpdatedProfile({
                    ...updatedProfile,
                    watchMovies: !updatedProfile.watchMovies
                  });
                }}></input>
                <label htmlFor="movie" className="ps-1">Movies</label>
              </div>
              <div>
                <input type="checkbox" id="tv" checked={updatedProfile.watchTv} onChange={() => {
                  setUpdatedProfile({
                    ...updatedProfile,
                    watchTv: !updatedProfile.watchTv
                  });
                }}></input>
                <label htmlFor="tv" className="ps-1">TV</label>
              </div>
            </div>
          </div>
          <div className="py-2">
          <h5>Contacts</h5>
            <div className="d-flex justify-content-center flex-wrap gap-3 pt-2">
              <div className="flex-fill">
                <label htmlFor="update-contact-type-1" className="py-1">Type</label>
                <input 
                  id="update-contact-type-1" 
                  className="form-control" 
                  value={contacts[0]?.type}
                  onChange={(e) => {
                    const newContacts = [
                      ...contacts
                    ];
                    newContacts[0] = {
                      ...contacts[0],
                      type: e.target.value
                    };
                    setContacts(newContacts);
                  }}
                ></input>
              </div>
              <div className="flex-fill">
                <label htmlFor="update-contact-value-1" className="py-1">Account</label>
                <input 
                  id="update-contact-value-1" 
                  className="form-control" 
                  value={contacts[0]?.value}
                  onChange={(e) => {
                    const newContacts = [
                      ...contacts
                    ];
                    newContacts[0] = {
                      ...contacts[0],
                      value: e.target.value
                    };
                    setContacts(newContacts);
                  }}
                ></input>
              </div>
            </div>
            <div className="d-flex justify-content-center flex-wrap gap-3 pt-2">
              <div className="flex-fill">
                <label htmlFor="update-contact-type-2" className="py-1">Type</label>
                <input 
                  id="update-contact-type-2" 
                  className="form-control" 
                  value={contacts[1]?.type}
                  onChange={(e) => {
                    const newContacts = [
                      ...contacts
                    ];
                    newContacts[1] = {
                      ...contacts[1],
                      type: e.target.value
                    };
                    setContacts(newContacts);
                  }}
                ></input>
              </div>
              <div className="flex-fill">
                <label htmlFor="update-contact-value-2" className="py-1">Account</label>
                <input 
                  id="update-contact-value-2" 
                  className="form-control" 
                  value={contacts[1]?.value}
                  onChange={(e) => {
                    const newContacts = [
                      ...contacts
                    ];
                    newContacts[1] = {
                      ...contacts[1],
                      value: e.target.value
                    };
                    setContacts(newContacts);
                  }}
                ></input>
              </div>
            </div>
            <div className="d-flex justify-content-center flex-wrap gap-3 pt-2">
              <div className="flex-fill">
                <label htmlFor="update-contact-type-3" className="py-1">Type</label>
                <input 
                  id="update-contact-type-3" 
                  className="form-control" 
                  value={contacts[2]?.type}
                  onChange={(e) => {
                    const newContacts = [
                      ...contacts
                    ];
                    newContacts[2] = {
                      ...contacts[2],
                      type: e.target.value
                    };
                    setContacts(newContacts);
                  }}
                ></input>
              </div>
              <div className="flex-fill">
                <label htmlFor="update-contact-value-3" className="py-1">Account</label>
                <input 
                  id="update-contact-value-3" 
                  className="form-control" 
                  value={contacts[2]?.value}
                  onChange={(e) => {
                    const newContacts = [
                      ...contacts
                    ];
                    newContacts[2] = {
                      ...contacts[2],
                      value: e.target.value
                    };
                    setContacts(newContacts);
                  }}
                ></input>
              </div>
            </div>
          </div>
          <div className="text-center py-2">
            <Button type="button" onClick={() => setEdit(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Update</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default UpdateProfile;