import { useReducer } from "react";
import { AppContext, reducer, initialState } from "./AppContext";
import TopicsForum from "./TopicsForum";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <TopicsForum />
    </AppContext.Provider>
  );
}

export default App;
