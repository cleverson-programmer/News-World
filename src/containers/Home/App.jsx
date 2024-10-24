import './style.css'

import { useContext } from "react";
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
  const { state } = useContext(NewsContext);
  const apiKey = "5a65b0a3618b47d6aa1ce618a4293a37";
  const baseUrl = "https://newsapi.org/v2/";

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
              <CurrentDate/>
              <CurrencyTracker/>
            </div>
            <div className='contentRight'>
              <WeatherComponent/>
              <SearchBar />
            </div>
          </div>

          <Logo/>

          <nav className='containerNavbar'>
            <NewsMenu />
          </nav>

          <Slogan/>
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



















// import { useEffect, useState } from "react"

// const CACHE_EXPIRATION_TIME = 10 * 60 * 1000;

// const useFetch = (endpoint) =>{
//   const [result, setResult] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null);


//   useEffect( () =>{
//     setLoading(true)
//     let wait = false;

//     const fetchData = async () =>{
//       const cachedData = localStorage.getItem(endpoint);
//       const cachedTimestamp = localStorage.getItem(`${endpoint}_timestamp`);

//       // Verifica se há dados no cache e se o cache ainda é válido
//       if (cachedData && cachedTimestamp) {
//         const isCacheValid = new Date().getTime() - cachedTimestamp < CACHE_EXPIRATION_TIME;

//         if (isCacheValid) {
//           setResult(JSON.parse(cachedData));
//           setLoading(false);
//           return;
//         } else {
//           // Cache expirou, remover dados antigos
//           localStorage.removeItem(endpoint);
//           localStorage.removeItem(`${endpoint}_timestamp`);
//         }
//       }

//       try{
//         const response = await fetch(endpoint);
//         const jsonResult = await response.json();

//         // Salva os dados no cache e o timestamp
//         localStorage.setItem(endpoint, JSON.stringify(jsonResult));
//         localStorage.setItem(`${endpoint}_timestamp`, new Date().getTime());

//         if(!wait){
//           setResult(jsonResult);
//           setLoading(false)
//         }
//       }
//       catch(e){
//         if(!wait){
//           setLoading(false)
//           setError(e)
//         }
//        setError(e)
//       }
//     }

//     fetchData();

//     return () =>{
//       wait= true
//     }

//   },[endpoint])

//   return {result, loading, error}
// }

// export const App = () =>{

//   const [selectedCategory, setSelectedCategory] = useState('top-headlines');

//   const [searchTerm, setSearchTerm] = useState(''); // Estado para controlar o campo de busca
//   const [filteredNews, setFilteredNews] = useState([]); // Estado para armazenar as notícias filtradas

//   // URL base da API
//   const apiKey = '5a65b0a3618b47d6aa1ce618a4293a37';
//   const baseUrl = 'https://newsapi.org/v2/';

//   // Define o endpoint com base no tópico selecionado
//   const endpoint = selectedCategory === 'top-headlines'
//     ? `${baseUrl}top-headlines?country=us&apiKey=${apiKey}`
//     : `${baseUrl}everything?q=${selectedCategory}&apiKey=${apiKey}`;

//   // Faz a requisição à API usando o hook personalizado
//   const { result, loading, error } = useFetch(endpoint);


//   useEffect(() => {
//     // Filtrar as notícias com base no que o usuário está digitando no campo de busca
//     if (result) {
//       const filtered = result.articles.filter(article =>
//         article.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredNews(filtered);
//     }
//   }, [result, searchTerm]); // Refiltrar sempre que o searchTerm ou os dados mudarem

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);

//     setSearchTerm(''); // Limpa o campo de busca ao mudar de categoria
//   };

//   console.log(result)

//   if(loading){
//     return <p>Loading...</p>
//   }

//   if (error) return <p>Erro ao buscar as notícias: {error.message}</p>;

//   if(!loading && result){
//     const {articles} = result
//     console.log(articles)

//     return(
//         <div>
//           <div>
//             <button onClick={() => handleCategoryChange('top-headlines')}>Notícias do Dia</button>
//             <button onClick={() => handleCategoryChange('science')}>Ciência</button>
//             <button onClick={() => handleCategoryChange('religion')}>Religião</button>
//             <button onClick={() => handleCategoryChange('politics')}>Política</button>
//             {/* Adicione mais tópicos conforme necessário */}
//           </div>

//           <input
//             type="text"
//             placeholder="Buscar notícias..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />

//           {articles.map((article, index) => (
//             <div key={index} style={{display: 'flex'}} >
//               <div>
//                 <img style={{width: '300px', height: '300px'}} src={article.urlToImage} alt="" />
//               </div>
//               <div>
//                 <h2>{article.title}</h2>
//                 <p>{article.description}</p>
//               </div>
//             </div>
//           ))}

//           {/* Exibição das notícias filtradas */}
//         <ul style={{position:'absolute', top:'0', right: '0'}}>
//           {filteredNews.length > 0 ? (
//             filteredNews.map((article, index) => (
//               <li key={index}>
//                 <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
//               </li>
//             ))
//           ) : (
//             <p>Não existem notícias relacionadas à sua pesquisa.</p>
//           )}
//         </ul>
//       </div>
//     )
//   }
//     return null
// }


