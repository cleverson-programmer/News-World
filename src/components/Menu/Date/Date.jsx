import './style.css'
export const CurrentDate = () => {
    // Função para obter o dia da semana e o mês por extenso
    const getFormattedDate = () => {
      const date = new Date();
      
      // Array com os dias da semana por extenso
      const daysOfWeek = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
      ];
      
      // Array com os meses por extenso
      const monthsOfYear = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
      ];
  
      const dayOfWeek = daysOfWeek[date.getDay()];  // Obtém o dia da semana
      const month = monthsOfYear[date.getMonth()];  // Obtém o mês
      const day = date.getDate();  // Obtém o dia do mês
      const year = date.getFullYear();  // Obtém o ano
  
      return `${dayOfWeek}, ${month} ${day}, ${year}`;
    };
  
    return (
      <div className='containerDate'>
        <h1>{getFormattedDate()}</h1>
      </div>
    );
};