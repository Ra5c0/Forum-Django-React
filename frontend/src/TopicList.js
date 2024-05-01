import React from "react";
import TopicListItem from "./TopicListItem";
import "./TopicList.css"; // Assurez-vous de créer un fichier TopicList.css pour les styles

function TopicList({ items }) {
  return (
    <div className="topic-list-container">
      <div className="topic-list">
        {items.map((item, index) => (
          <TopicListItem item={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default TopicList;
