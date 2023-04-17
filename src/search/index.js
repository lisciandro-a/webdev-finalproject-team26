import React, { useEffect, useState } from "react";
import { InputGroup, Form, DropdownButton, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router";
import SearchResults from "./searchResults";
import { fullSearch } from "./searchService";
import NotFound from "../common/notFound";

function Search() {
  const movieTitle = "Movies";
  const tvTitle = "TV Shows";
  const animeTitle = "Anime";
  const mediaMap = { movie: movieTitle, tv: tvTitle, anime: animeTitle };
  const { mediaType, searchTerm } = useParams();
  const navigate = useNavigate();
  const [searchMediaType, setSearchMediaType] = useState(mediaType || "movie");
  const [searchString, setSearchString] = useState(searchTerm || "");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      setSearchString(searchTerm);
      setSearchMediaType(mediaType);
      searchSimkl();
    }
  }, [searchTerm, mediaType]);

  const onEnter = (event) => {
    if (event.key === "Enter") {
      navigate(`/search/${searchMediaType}/${searchString}`);
    }
  };

  const onChangeMediaType = (newMediaType) => {
    // console.log('being called');
    setSearchMediaType(newMediaType);
    if (searchString) {
      navigate(`/search/${newMediaType}/${searchString}`);
    }
  };

  const onSearchChange = (event) => {
    setSearchString(event.target.value);
  };

  const searchSimkl = async () => {
    const encodedQuery = encodeURIComponent(searchString);

    const results = await fullSearch(searchMediaType, encodedQuery);
    setSearchResults(results);
  };

  if (!Object.keys(mediaMap).includes(mediaType)) {
    return <NotFound />;
  } else {
    return (
      <div>
        <h1 className="my-4">Search</h1>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" className="text-bg-light">
            <label htmlFor="search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </label>
          </InputGroup.Text>

          <Form.Control
            id="search"
            placeholder="Search WatchIt"
            value={searchString}
            onChange={(event) => onSearchChange(event)}
            onKeyDown={(event) => {
              onEnter(event);
            }}
          />

          <DropdownButton
            variant="outline-secondary"
            title={mediaMap[searchMediaType]}
            id="input-group-dropdown-2"
            align="end"
          >
            <Dropdown.Item onClick={() => onChangeMediaType("movie")}>
              {movieTitle}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onChangeMediaType("tv")}>
              {tvTitle}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onChangeMediaType("anime")}>
              {animeTitle}
            </Dropdown.Item>
          </DropdownButton>
        </InputGroup>

        <SearchResults mediaType={searchMediaType} results={searchResults} />
      </div>
    );
  }
}

export default Search;
