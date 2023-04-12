import React, { useState } from "react";
import "./index.css";
import { InputGroup, Form, DropdownButton, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search() {
    const movieTitle = "Movies";
    const tvTitle = "TV Shows";
    const animeTitle = "Anime";
    const [dropdownTitle, setDropdownTitle] = useState(movieTitle);
    
  return (
    <div>
      <h1 className="my-4">Search</h1>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1" className="text-bg-light">
            <label for="search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </label>
          
        </InputGroup.Text>

        <Form.Control id="search" placeholder="Search WatchIt" />

        <DropdownButton
          variant="outline-secondary"
          title={dropdownTitle}
          id="input-group-dropdown-2"
          align="end"
          className=".dropdown"
        >
          <Dropdown.Item onClick={() => setDropdownTitle(movieTitle)}>{movieTitle}</Dropdown.Item>
          <Dropdown.Item onClick={() => setDropdownTitle(tvTitle)}>{tvTitle}</Dropdown.Item>
          <Dropdown.Item onClick={() => setDropdownTitle(animeTitle)}>{animeTitle}</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
    </div>
  );
}

export default Search;
