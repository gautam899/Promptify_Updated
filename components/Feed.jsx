"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

// Since the prompt card list component will only be used in this componenet we
// can create it inside here only.
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  // We can search in the search box in three different manner
  //1. Seach by word.
  //2. Search by tag
  //3. Search by
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  //We need a state to store the search results that we will get back after filtering the prompts
  const [searchedResults, setSearchedResults] = useState([]);
  const [numPosts, setNumPosts] = useState(0);
  //We need a function to handle the event when we click on the search

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt", {
        headers: {
          "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
        },
      });
      const data = await response.json();
      // console.log(data.length);
      setNumPosts(data.length);
      setAllPosts(data);
    };
    // call the function fetch post. This is will be called only on the starting of the app since there is only one dependency.
    fetchPosts();
  }, []);

  // A function to filter the prompts based upon the search
  const filterPrompts = (searchtext) => {
    // const regex = new RegExp(searchtext, "i");
    const escapedSearchText = searchtext.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedSearchText, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = filterPrompts(e.target.value);
        setSearchedResults(searchResults);
      })
    );
  };
  //Lets implement the handle tag click
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResults = filterPrompts(tagName);
    setSearchedResults(searchResults);
  };
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <p className="flex flex-1 flex-start mt-5 text-white text-3xl font-semibold">
        All Prompts
      </p>
      <span className="text-white text-xl mb-[-50px]">
        {searchText ? searchedResults.length : allPosts.length} Results
      </span>
      {/* We need to display all the prompts from all the users */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
