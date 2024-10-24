import './style.css'
import { useContext } from "react";
import { NewsContext } from "../../context/newsContext";

const LoadMoreButton = () => {
  const { state, dispatch } = useContext(NewsContext);

  const handleLoadMore = () => {
    dispatch({ type: "LOAD_MORE_NEWS" });
  };

  const canLoadMore = state.result && state.filteredNews.length > state.visibleNewsCount;

  return (
    <>
      {canLoadMore && (
        <button onClick={handleLoadMore} className="loadMoreButton">
          Ver Mais
        </button>
      )}
    </>
  );
};

export default LoadMoreButton;
