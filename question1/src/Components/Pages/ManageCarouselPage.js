import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';

const ManageCarousel = () => {
  clearPage();
  renderManageCarousel();
};

function renderManageCarousel() {
  const main = document.querySelector('main');
  const formHTML = `
    <h1>Configuration du carrousel</h1>
    <form id="carouselConfigForm">
      <label for="interval">Nombre de millisecondes entre chaque citation:</label>
      <input type="number" id="interval" name="interval" value="5000" required />
      <button type="submit">Mettre à jour</button>
    </form>
  `;
  main.innerHTML = formHTML;

  const form = document.getElementById('carouselConfigForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const intervalValue = document.getElementById('interval').value;
    localStorage.setItem('carouselInterval', intervalValue);

    Navigate('/quotecarousel');
  });
}

export default ManageCarousel;
