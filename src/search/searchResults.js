import React from "react";
import searchResults from "./searchExample.json";
import SearchResultItem from "./searchResultItem";

function SearchResults({ mediaType, results }) {
// function SearchResults({ mediaType }) {
  return (
    <ul className="list-group">
      {/* switch back to results */}
      {searchResults.map((result) => (
        <SearchResultItem key={result.ids.simkl_id} mediaType={mediaType} result={result} />
      ))}
    </ul>
  );
}

export default SearchResults;
