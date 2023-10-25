"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
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
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setAllPosts(data);
      setFilteredPosts(data);
    };
    fetchPosts();
  }, []);

  const filterPosts=(searchText)=>{
    const regex = new RegExp(searchText, "i");
    const searchResult = allPosts.filter(
      (post) =>
        regex.test(post.creator.username) ||
        regex.test(post.prompt) ||
        regex.test(post.tag)
    );
    return searchResult;
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    const searchResult = filterPosts(e.target.value);
    setFilteredPosts(searchResult);
  };

  const handleTagClick=(tag)=>{
    setSearchText(tag);
    const tagResult=filterPosts(tag);
    setFilteredPosts(tagResult);
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
