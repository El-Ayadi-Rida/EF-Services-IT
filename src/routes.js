import { DEFAULT_PATHS } from 'config.js';

import AccueilPage from 'views/Accueil';
import BacPredictor from 'views/BacPredictor';

const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const routesAndMenuItems = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      exact: true,
      redirect: true,
      to: `${appRoot}/accueil`,
    },
    {
      path: `${appRoot}/accueil`,
      component: AccueilPage,
      label: 'menu.horizontal',
      icon: 'grid-2',
      subs: [
        { path: '/bac-predictor', label: 'menu.default', component: BacPredictor },
      ],
    }
  ],
  sidebarItems: [],
};
export default routesAndMenuItems;
