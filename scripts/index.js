import { renderNavigation } from "./renderNavigation.js";
import { createHero } from "./createHero.js";


const app = document.querySelector('.app');

//  Вызвать загрузку главной страницы
const handleHomePage = () => {
  app.textContent = ''; // каждый раз при загрузке очищаем приложение

  renderNavigation();
  const section = createHero();
  app.append(createHero());
}

/* Инициализация приложения */
const init = () => {
  handleHomePage();
}
init();