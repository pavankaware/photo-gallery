import React, { useState, useEffect, useRef, useCallback } from "react";

const VirtualizedList = ({ items, loadMoreItems, hasMoreItems }) => {
  const [list, setList] = useState(items);
  const listContainerRef = useRef(null);

  // Update list when items prop changes
  useEffect(() => {
    setList(items);
  }, [items]);

  const observer = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Callback to observe the last item in the list
  const lastItemRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreItems) {
          loadMoreItems(list.length, list.length + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [list, loadMoreItems, hasMoreItems]
  );

  // Function to show image preview in a modal
  const showImagePreview = (item) => {
    console.log("item", item);
    setIsModalVisible(true);
    setSelectedItem(item);
  };

  // Observe the last item in the list whenever the list changes
  useEffect(() => {
    if (listContainerRef.current) {
      const items = listContainerRef.current.querySelectorAll(".item");
      if (items.length > 0) {
        lastItemRef(items[items.length - 1]);
      }
    }
  }, [list, lastItemRef]);

  return (
    <div className="masonry" ref={listContainerRef}>
      {list.map((item, index) => (
        <div
          className="item"
          onClick={() => showImagePreview(item)}
          key={index}
        >
          <img
            width={"100%"}
            height={"100%"}
            src={item?.urls?.thumb}
            alt={item.alt_description}
          />
        </div>
      ))}

      {isModalVisible && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            className="modal show d-block"
            role="dialog"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <img
                    width={"100%"}
                    height={"100%"}
                    src={selectedItem?.urls?.regular}
                    alt={selectedItem.alt_description}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsModalVisible(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualizedList;
