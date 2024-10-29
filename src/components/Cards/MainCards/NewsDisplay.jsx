import './style.css'
import { useContext, useEffect } from "react";
import { NewsContext } from "../../../context/newsContext";
import LoadMoreButton from '../../ShowMore/LoadMoreButton';

export const NewsDisplay = () => {
  const { state, dispatch } = useContext(NewsContext);
  const { result, searchTerm, filteredNews } = state;

  useEffect(() => {
    if (result) {
      
      const filtered = result.articles.filter((article) => {
        const hasValidTitle = article.title && article.title.toLowerCase() !== "removed";
        const hasValidImage = article.urlToImage && article.urlToImage.toLowerCase() !== "removed";

        return hasValidTitle && hasValidImage && article.title.toLowerCase().includes(searchTerm.toLowerCase());
      });

      dispatch({ type: "SET_FILTERED_NEWS", payload: filtered });
    }
  }, [result, searchTerm, dispatch]);

  if (!result) return <p>Carregando...</p>;

  return (
    <>
      <div className="containerCard">
      {filteredNews.length > 0 ? (
        filteredNews.slice(0, state.visibleNewsCount).map((article, index) => (
          <a href={article.url} target="_blank" rel="noopener noreferrer" key={index} className="contentCard">
            <img src={article.urlToImage} alt="" />
            <div>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              
            </div>
          </a>
        ))
      ) : (
        <p>Não existem notícias relacionadas à sua pesquisa.</p>
      )}
    </div>
    <LoadMoreButton />
    </>
  );
};
