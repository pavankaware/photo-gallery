import React from "react";
import "Components/PhotoGallery/style.css";
import VirtualizedList from "Components/PhotoGallery/Virtulizer";

const Masonry = ({ data, onLoadMore }) => {
  return (
    <div>
      <VirtualizedList
        items={data}
        loadMoreItems={onLoadMore}
        hasMoreItems={true}
      />
    </div>
  );
};
export default Masonry;
