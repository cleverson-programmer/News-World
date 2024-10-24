import './style.css'
import { useEffect, useState } from 'react';
import { TiArrowUpOutline, TiArrowDownOutline } from 'react-icons/ti'
import axios from 'axios';

const CurrencyTracker = () => {
  const [dollarRate, setDollarRate] = useState(null);
  const [euroRate, setEuroRate] = useState(null);
  const [previousDollarRate, setPreviousDollarRate] = useState(null);
  const [previousEuroRate, setPreviousEuroRate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencyRates = async () => {
      try {
        const response = await axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL');
        const data = response.data;

        setPreviousDollarRate(dollarRate);
        setPreviousEuroRate(euroRate);

        setDollarRate(parseFloat(data.USDBRL.bid));
        setEuroRate(parseFloat(data.EURBRL.bid));
      } catch (err) {
        setError('Erro ao buscar os dados da API.');
        console.log(err)
      }
    };

    fetchCurrencyRates();

    // Atualiza a cada 10 minutos
    const interval = setInterval(fetchCurrencyRates, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [dollarRate, euroRate]);

  // Função para determinar a seta de aumento ou queda
  const renderArrow = (currentRate, previousRate) => {
    if (!currentRate || !previousRate) return null; // Fallback para evitar erros
    if (currentRate > previousRate) {
      return <span style={{ color: 'green' }}><TiArrowUpOutline /></span>;
    } else if (currentRate < previousRate) {
      return <span style={{ color: 'red' }}><TiArrowDownOutline /></span>;
    }
    return null;
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (dollarRate === null || euroRate === null) {
    return <p>Carregando dados...</p>;
  }

  return (
      <div className='containerCurrencyTrack'>
        <p>
          <span>Dólar: R$</span>{dollarRate.toFixed(2)} {renderArrow(dollarRate, previousDollarRate)}
        </p>
        <p>
          <span>Euro: R$</span>{euroRate.toFixed(2)} {renderArrow(euroRate, previousEuroRate)}
        </p>

      </div>
  );
};

export default CurrencyTracker;
