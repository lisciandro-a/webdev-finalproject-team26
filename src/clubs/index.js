import { Typography } from "@mui/material";
import ClubSnippet from "../home/clubSnippet";
import { useEffect, useState } from "react";
import { getAllClubs } from "../services/clubs/clubService";

function Clubs () {
  const [clubs, setClubs] = useState(null);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    const fetchedClubs = await getAllClubs();
    setClubs(fetchedClubs);
  }

  return (
    <div className="mx-auto my-4">
      <div className="my-4">
        <Typography variant="h3" className="mb-0">Explore Clubs</Typography>
        <hr></hr>
        <div className="w-100">
          <div className="d-flex p-4 gap-3 flex-wrap justify-content-center">
            {clubs?.map((c) => <ClubSnippet club={c}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clubs;