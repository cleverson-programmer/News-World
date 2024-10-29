import './style.css'

import { useContext, useEffect, useState } from "react";
import { NewsContext } from "../../context/newsContext";
import { NewsMenu } from "../../components/Menu/Navbar/NewsMenu";
import { SearchBar } from "../../components/Menu/Search/SearchBar";
import { NewsDisplay } from "../../components/Cards/MainCards/NewsDisplay";
import { FetchNews } from "../../services/API/useFetch";
import { CurrentDate } from "../../components/Menu/Date/Date";
import WeatherComponent from "../../components/Menu/Weather/Weather";
import { Logo } from "../../components/Menu/Logotype/Logo";
import CurrencyTracker from "../../components/Menu/CurrencyTrack/CurrencyTrack";
import { Slogan } from '../../components/Menu/Slogan/Slogan';

export const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  const { state } = useContext(NewsContext);
  const apiKey = "5a65b0a3618b47d6aa1ce618a4293a37";
  const baseUrl = "https://newsapi.org/v2/";

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderTopComponents = () => (
    <>
      <CurrentDate />
      <CurrencyTracker />
    </>
  );

  const endpoint =
    state.selectedCategory === "top-headlines"
      ? `${baseUrl}top-headlines?country=us&apiKey=${apiKey}`
      : `${baseUrl}everything?q=${state.selectedCategory}&apiKey=${apiKey}`;

  return (
    <>
      <header>
        <div className='containerHeader'>
          <div className='contentTopComponents'>
            <div className='contentLeft'>
              {windowWidth > 935 && renderTopComponents()}
            </div>
            <div className='contentRight'>
              {windowWidth > 935 && <WeatherComponent />}
              <SearchBar />
            </div>
          </div>

          <Logo />

          <nav className='containerNavbar'>
            <NewsMenu
              isHamburgerMenuOpen={isHamburgerMenuOpen}
              setIsHamburgerMenuOpen={setIsHamburgerMenuOpen}
            />
            {windowWidth <= 935 && isHamburgerMenuOpen && (
              <div className='hamburgerMenuContent'>
                {renderTopComponents()}
                <WeatherComponent />
              </div>
            )}
          </nav>

          <Slogan />
        </div>
      </header>

      <main>
        <div className='containerCardsNoticies'>
          <NewsDisplay />
        </div>
      </main>
      <FetchNews endpoint={endpoint} />
    </>
  );
};

