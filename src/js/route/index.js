import { parseComponents } from '../baseComponent/componentParse';
import { navAccordion } from '../component/navigation/navAccordion';
import { navigationScoller } from '../component/navigation/navScroller';
import { homeModule } from './home';

/**
 * Route
 */
const routeModules = {
    home: homeModule,
};

const root = document.querySelector('#content');
let commonData = {};
export const getCommonData = () => commonData;

const loadData = async () => {
    const data = await fetch(`../data/common.json`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => console.warn('Something went wrong.', err));

    return data;
};

export const inizializeApp = async () => {
    commonData = await loadData();
    await parseComponents({ element: document.body });
    navAccordion();
    navigationScoller();

    loadRoute({ route: 'home' });
};

export const loadRoute = async ({ route = 'home' }) => {
    // TODO clear cancellable component;
    const content = routeModules?.[route]?.({ root });
    root.innerHTML = '';
    root.insertAdjacentHTML('afterbegin', content);
    await parseComponents({ element: root });

    console.log('route loaded');
};
