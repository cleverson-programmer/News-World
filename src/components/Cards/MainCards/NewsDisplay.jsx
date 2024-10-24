import './style.css'
import { useContext, useEffect } from "react";
import { NewsContext } from "../../../context/newsContext";

export const NewsDisplay = () => {
  const { state, dispatch } = useContext(NewsContext);
  const { result, searchTerm, filteredNews } = state;

  useEffect(() => {
    if (result) {
      // Filtrar as notícias que têm urlToImage e title válidos e correspondem ao termo de busca
      const filtered = result.articles.filter((article) => {
        const hasValidTitle = article.title && article.title.toLowerCase() !== "removed";
        const hasValidImage = article.urlToImage && article.urlToImage.toLowerCase() !== "removed";

        // Verifica se a notícia tem título e imagem válidos e corresponde ao termo de busca
        return hasValidTitle && hasValidImage && article.title.toLowerCase().includes(searchTerm.toLowerCase());
      });

      dispatch({ type: "SET_FILTERED_NEWS", payload: filtered });
    }
  }, [result, searchTerm, dispatch]);

  if (!result) return <p>Carregando...</p>;

  return (
    <div className='containerCard'>
      {filteredNews.length > 0 ? (
        filteredNews.map((article, index) => (
          <div key={index} className='contentCard'>
            <img src={article.urlToImage} alt="" />
            <div className='textContent'>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Não existem notícias relacionadas à sua pesquisa.</p>
      )}
    </div>
  );
};
