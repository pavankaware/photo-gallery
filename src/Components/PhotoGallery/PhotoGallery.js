import usePhotos from "Modules/Photos/usePhotos";
import React, { useState, useEffect } from "react";
import MasonryGrid from "Components/PhotoGallery/Masonry";

// todo : implement on escape modal close
// todo : handle error state for failed API  
const PhotoGallery = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const { fetchNextPage, data } = usePhotos(debouncedQuery);

  // debounce the query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    console.log("searching...", e);
    e.preventDefault();
    fetchNextPage(debouncedQuery);
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for images..."
          className="search-input"
        />
        <button type="button" onClick={handleSearch} className="search-button">
          <span className="search-icon">🔍</span> Search
        </button>
      </div>
      {data?.length ? (
        <MasonryGrid data={data} onLoadMore={() => fetchNextPage(debouncedQuery)} />
      ) : null}
    </>
  );
};

export default PhotoGallery;