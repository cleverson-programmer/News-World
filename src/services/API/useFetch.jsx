/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { NewsContext } from "../../context/newsContext";

const CACHE_EXPIRATION_TIME = 10 * 60 * 1000;

export const FetchNews = ({ endpoint }) => {
  const { dispatch } = useContext(NewsContext);

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem(endpoint);
      const cachedTimestamp = localStorage.getItem(`${endpoint}_timestamp`);

      if (cachedData && cachedTimestamp) {
        const isCacheValid = new Date().getTime() - cachedTimestamp < CACHE_EXPIRATION_TIME;
        if (isCacheValid) {
          dispatch({ type: "SET_RESULT", payload: JSON.parse(cachedData) });
          return;
        } else {
          localStorage.removeItem(endpoint);
          localStorage.removeItem(`${endpoint}_timestamp`);
        }
      }

      try {
        const response = await fetch(endpoint);
        const jsonResult = await response.json();

        localStorage.setItem(endpoint, JSON.stringify(jsonResult));
        localStorage.setItem(`${endpoint}_timestamp`, new Date().getTime());

        dispatch({ type: "SET_RESULT", payload: jsonResult });
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [endpoint, dispatch]);

  return null;
};
