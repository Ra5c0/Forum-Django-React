import React, { useEffect, useContext } from "react";
import { AppContext, actions } from "./AppContext";
import TopicForm from "./TopicForm";
import TopicList from "./TopicList";
import "./TopicsForum.css"; // Assurez-vous de créer un fichier TopicsForum.css pour les styles

function TopicsForum() {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/forum/topics/")
      .then((response) => response.json())
      .then((data) => dispatch({ type: actions.TOPIC_LOADED, topics: data }))
      .catch((error) => console.log(error));
  }, [dispatch]);

  function createItem(topic) {
    fetch("http://127.0.0.1:8000/forum/topics/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(topic),
    })
      .then((response) => response.json())
      .then((data) => dispatch({ type: actions.TOPIC_CREATED, topic: data }))
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <nav className="navbar">
        <h1>Topics Forum</h1>
      </nav>
      <div className="topics-forum-container">
        <div className="topics-forum-content">
          <TopicForm onCreateItem={createItem} />
          <TopicList items={state.topics} />
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Topics Forum. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default TopicsForum;
