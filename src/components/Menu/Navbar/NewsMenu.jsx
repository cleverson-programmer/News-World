import './style.css';
import { useContext } from "react";
import { NewsContext } from "../../../context/newsContext";

export const NewsMenu = () => {
  const { dispatch } = useContext(NewsContext);

  const handleCategoryChange = (category) => {
    dispatch({ type: "SET_CATEGORY", payload: category });
  };

  return (
    <nav>
      <div className='containerNav'>
        <button onClick={() => handleCategoryChange("top-headlines")}>Notícias do Dia</button>
        <button onClick={() => handleCategoryChange("science")}>Ciência</button>
        <button onClick={() => handleCategoryChange("business")}>Negócios</button>
        <button onClick={() => handleCategoryChange("politics")}>Política</button>
        <button onClick={() => handleCategoryChange("sports")}>Esportes</button>
        <button onClick={() => handleCategoryChange("health")}>Saúde</button>
        <div className='dividingLine'></div>
        <button onClick={() => handleCategoryChange("religion")}>Religião</button>
        <button onClick={() => handleCategoryChange("arts")}>Artes</button>
        <button onClick={() => handleCategoryChange("cooking")}>Culinária</button>
      </div>
    </nav>
  );
};
