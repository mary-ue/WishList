import { renderNavigation } from "./renderNavigation.js";
import { createHero } from "./createHero.js";
import { createWishlist } from "./createWishlist.js";
import { getLogin } from "./getLogin.js";
import { JWT_TOKEN_KEY } from "./const.js";

export const router = Router();
const token = localStorage.getItem(JWT_TOKEN_KEY);
export const auth = token ? await getLogin(token) : {};

const app = document.querySelector('.app');

const handleEditPageRoute = (id) => {

}

const handleEditProfileRoute = (login) => {

}

const handleUserRoute = async (login) => {
  app.textContent = ''; 
  renderNavigation();
  app.append(await createWishlist(login));
}

// createWishlist()

//  Вызвать загрузку главной страницы
const handleHomePage = () => {
  app.textContent = ''; // каждый раз при загрузке очищаем приложение

  renderNavigation();
  app.append(createHero());
}

/* Инициализация приложения */
const init = () => {
  let isMainPage = true;

  router.on('/', handleHomePage);

  router.on('/editwish/newwish', handleEditPageRoute);
  router.on('/editwish/:id', handleEditPageRoute);
  router.on('/editprofile/:ligin', handleEditProfileRoute);
  router.on('/user/:login', handleUserRoute);

  router.init();

  if (isMainPage) {
    isMainPage = false;
    router.setRoute('/');

    if(auth.login) {
      router.setRoute(`/user/${auth.login}`);
    } else {
      router.setRoute('/')
    }
  }
};

init();