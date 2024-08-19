import { clearPage } from '../../utils/render';
import pic from '../../img/tingey-injury-law-firm-unsplash-low-res.jpg';

const QuoteCarouselPage = () => {
  clearPage();
  renderQuoteCarousel();
};

async function fetchQuotes() {
  try {
    const response = await fetch('http://localhost:3000/quotes');
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des citations.');
    }
    const quotes = await response.json();
    return quotes;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function renderQuoteCarousel() {
  const main = document.querySelector('main');
  const carouselContainer = document.createElement('div');
  carouselContainer.id = 'quote-carousel';
  main.appendChild(carouselContainer);

  fetchQuotes().then(quotes => {
    if (quotes.length === 0) {
      carouselContainer.innerHTML = 'Aucune citation disponible.';
      return;
    }

    let currentIndex = 0;

    const showNextQuote = () => {
      const { thinker, quote, image } = quotes[currentIndex];

      // Reset container content
      carouselContainer.innerHTML = `
        <img src="${image}" alt="${thinker}" onerror="this.onerror=null; this.src='${pic}'">
        <p><strong>${thinker}</strong></p>
        <p>${quote}</p>
      `;

      currentIndex+=1;
      if (currentIndex >= quotes.length) {
        setTimeout(() => {
          carouselContainer.innerHTML = '<p>Rechargez la page si vous souhaitez réafficher le carrousel des citations !</p>';
        }, 5000);
      } else {
        setTimeout(showNextQuote, 5000);
      }
    };

    showNextQuote();
  });
}

export default QuoteCarouselPage;
