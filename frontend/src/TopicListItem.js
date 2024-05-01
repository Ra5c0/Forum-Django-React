import React, { useContext } from "react";
import { AppContext, actions } from "./AppContext";
import "./TopicListItem.css"; // Assurez-vous de créer un fichier TopicListItem.css pour les styles

function TopicListItem({ item }) {
  const { dispatch } = useContext(AppContext);

  function vote(vote) {
    fetch(`http://127.0.0.1:8000/forum/topics/${item.id}/vote/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        vote: vote,
      }),
    })
      .then((response) => {
        if (vote === "l") {
          dispatch({ type: actions.TOPIC_LIKED, topic: item });
        } else {
          dispatch({ type: actions.TOPIC_DISLIKED, topic: item });
        }
      })
      .catch((error) => console.log(error));
  }

  function like() {
    vote("l");
  }

  function dislike() {
    vote("d");
  }

  return (
    <div className="topic-list-item">
      <h2 className="topic-title">{item.title}</h2>
      <p className="topic-description">{item.description}</p>
      <div className="topic-votes">
        <button className="vote-button like" onClick={like}>
          {item.likes} Likes
        </button>
        <button className="vote-button dislike" onClick={dislike}>
          {item.dislikes} Dislikes
        </button>
      </div>
    </div>
  );
}

export default TopicListItem;
