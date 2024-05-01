import React from "react";

export const initialState = {
  topics: [],
};

export const actions = {
  TOPIC_LOADED: "TOPIC_LOADED",
  TOPIC_CREATED: "TOPIC_CREATED",
  TOPIC_LIKED: "TOPIC_LIKED",
  TOPIC_DISLIKED: "TOPIC_DISLIKED",
};

export function reducer(state, action) {
  switch (action.type) {
    case actions.TOPIC_LOADED:
      return {
        topics: action.topics,
      };
    case actions.TOPIC_CREATED:
      return {
        ...state,
        topics: [action.topic].concat(state.topics),
      };
    case actions.TOPIC_LIKED:
      return {
        ...state,
        topics: state.topics.map((topic) =>
          topic.id === action.topic.id
            ? { ...topic, likes: topic.likes + 1 }
            : topic
        ),
      };
    case actions.TOPIC_DISLIKED:
      return {
        ...state,
        topics: state.topics.map((topic) =>
          topic.id === action.topic.id
            ? { ...topic, dislikes: topic.dislikes + 1 }
            : topic
        ),
      };
    default:
      return {};
  }
}

export const AppContext = React.createContext();
