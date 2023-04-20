import React from "react";
// import results from "./searchExample.json";
import SearchResultItem from "./searchResultItem";

function SearchResults({ results }) {
  return (
    <ul className="list-group">
      {results.map((result) => (
        <SearchResultItem key={result.ids.simkl_id} result={result} />
      ))}
    </ul>
  );
}

export default SearchResults;
