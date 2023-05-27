import { renderNavigation } from "./renderNavigation.js";
import { createHero } from "./createHero.js";
import { createWishlist } from "./createWishlist.js";
import { createEditProfile } from "./createEditProfile.js";
import { getLogin } from "./service.js";
import { JWT_TOKEN_KEY } from "./const.js";

export const router = Router();
const token = localStorage.getItem(JWT_TOKEN_KEY);
export const auth = token ? await getLogin(token) : {};

const app = document.querySelector('.app');

const handleEditPageRoute = (id) => {

}

const handleEditProfileRoute = async (login) => {
  app.textContent = '';
  const {sectionEditProfile, formProfile} = await createEditProfile(login);
  renderNavigation('profile', formProfile);
  app.append(sectionEditProfile);
}

const handleUserRoute = async (login) => {
  const wishlistSection = await createWishlist(login);
  app.textContent = '';
  renderNavigation();

  if (!app.contains(wishlistSection)) {
    app.append(wishlistSection);
  }
  // app.textContent = ''; 
  // renderNavigation();
  // app.append(await createWishlist(login));
}

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