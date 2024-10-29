import './style.css';
import { useContext, useState, useEffect} from "react";
import { NewsContext } from "../../../context/newsContext";
import { GiHamburgerMenu } from 'react-icons/gi';
import { CurrentDate } from '../Date/Date';
import CurrencyTracker from '../CurrencyTrack/CurrencyTrack';
import WeatherComponent from '../Weather/Weather';

export const NewsMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 935);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alterna entre abrir/fechar o menu
  };

   // Hook para monitorar o redimensionamento da tela
   useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 935); // Atualiza o estado de acordo com o tamanho da tela
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { dispatch } = useContext(NewsContext);

  const handleCategoryChange = (category) => {
    dispatch({ type: "SET_CATEGORY", payload: category });
  };

  return (
    <nav>
      {/* Ícone de menu hamburguer visível em telas menores */}
      <div className="hamburger" onClick={toggleMenu}>
        <GiHamburgerMenu />
      </div>

      <div className={`containerNav ${isMenuOpen ? 'show-menu' : ''}`}>
        <button onClick={() => handleCategoryChange("top-headlines")}>Notícias do Dia</button>
        <button onClick={() => handleCategoryChange("science")}>Ciência</button>
        <button onClick={() => handleCategoryChange("business")}>Negócios</button>
        <button onClick={() => handleCategoryChange("politics")}>Política</button>
        <button onClick={() => handleCategoryChange("sports")}>Esportes</button>
        <button onClick={() => handleCategoryChange("health")}>Saúde</button>
        <button onClick={() => handleCategoryChange("religion")}>Religião</button>
        <button onClick={() => handleCategoryChange("arts")}>Artes</button>
        <button onClick={() => handleCategoryChange("cooking")}>Culinária</button>

        {/* Renderizar componentes adicionais dentro do menu hamburguer apenas em telas menores */}
        {isMobile && (
          <div className="extraComponents">
            <CurrentDate />
            <CurrencyTracker />
            <div className='extraComponentsBottom'>
              <WeatherComponent />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
