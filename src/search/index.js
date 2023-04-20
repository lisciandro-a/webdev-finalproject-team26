import React, { useEffect, useState } from "react";
import { InputGroup, Form, DropdownButton, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router";
import SearchResults from "./searchResults";
import { fullSearch } from "./searchService";

function Search() {
    const movieTitle = 'Movies';
    const tvTitle = 'TV Shows';
    const animeTitle = 'Anime';
    const { searchTerm } = useParams();
    const navigate = useNavigate();
    const [dropdownTitle, setDropdownTitle] = useState(movieTitle);
    const [searchString, setSearchString] = useState(searchTerm || '');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
      if (searchTerm) {
        setSearchString(searchTerm);
        searchSimkl();
      }
    }, [searchTerm, dropdownTitle]);

    const onEnter = (event) => {
      if (event.key === "Enter") {
        navigate(`/search/${searchString}`);
      }
    }

    const onSearchChange = (event) => {
      setSearchString(event.target.value);
    }

    const searchSimkl = async () => {
      const encodedQuery = encodeURIComponent(searchString);
      let mediaType = 'movie';
      if (dropdownTitle === tvTitle) {
        mediaType = 'tv';
      } else if (dropdownTitle === animeTitle) {
        mediaType = 'anime';
      }
      const searchQuery = `search/${mediaType}?q=${encodedQuery}`

      const results = await fullSearch(searchQuery);
      setSearchResults(results);
    }
    
  return (
    <div>
      <h1 className="my-4">Search</h1>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1" className="text-bg-light">
            <label htmlFor="search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </label>
          
        </InputGroup.Text>

        <Form.Control id="search" placeholder="Search WatchIt" value={searchString}  onChange={(event) => onSearchChange(event)} onKeyDown={(event) => {onEnter(event)}}/>

        <DropdownButton
          variant="outline-secondary"
          title={dropdownTitle}
          id="input-group-dropdown-2"
          align="end"
        >
          <Dropdown.Item onClick={() => setDropdownTitle(movieTitle)}>{movieTitle}</Dropdown.Item>
          <Dropdown.Item onClick={() => setDropdownTitle(tvTitle)}>{tvTitle}</Dropdown.Item>
          <Dropdown.Item onClick={() => setDropdownTitle(animeTitle)}>{animeTitle}</Dropdown.Item>
        </DropdownButton>
      </InputGroup>

      <SearchResults results={searchResults}/>
    </div>
  );
}

export default Search;
