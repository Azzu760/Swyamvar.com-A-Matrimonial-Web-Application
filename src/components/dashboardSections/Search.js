"use client";
import React, { useState } from "react";
import SearchByFirstname from "./SearchByFirstname";
import SearchByParameters from "./SearchByParameters";

const Search = ({ userId }) => {
  const [searchType, setSearchType] = useState("firstname");

  return (
    <div className="p-4 w-[80%] mx-auto bg-transparent">
      <div className="flex mb-4 p-3 rounded-md bg-dark-gray">
        <button
          onClick={() => setSearchType("firstname")}
          className={`p-3 rounded w-1/2 ${
            searchType === "firstname"
              ? "bg-black text-white"
              : "bg-transparent"
          }`}
        >
          Search by Firstname
        </button>
        <button
          onClick={() => setSearchType("parameters")}
          className={`p-3 rounded w-1/2 ${
            searchType === "parameters"
              ? "bg-black text-white"
              : "bg-transparent"
          }`}
        >
          Search by Parameters
        </button>
      </div>

      {searchType === "firstname" ? (
        <SearchByFirstname userId={userId} />
      ) : (
        <SearchByParameters userId={userId} />
      )}
    </div>
  );
};

export default Search;