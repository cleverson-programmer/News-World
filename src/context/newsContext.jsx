import { createContext, useReducer } from "react";
import { initialState, newsReducer } from "./newsReducer";
import P from 'prop-types'

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(newsReducer, initialState);

  return (
    <NewsContext.Provider value={{ state, dispatch }}>
      {children}
    </NewsContext.Provider>
  );
};

NewsProvider.propTypes ={
    children: P.node.isRequired
}