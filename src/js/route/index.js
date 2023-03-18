import { parseComponents } from '../baseComponent/componentList';
import { homeModule } from './home';

/**
 * Route
 */
const routeModules = {
    home: homeModule,
};

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

    /**
     *
     * Common modules
     */
    await parseComponents({ element: document.body });

    /**
     * Load module
     */
    const root = document.querySelector('#content');
    const currentModule = 'home';
    routeModules?.[currentModule]?.({ root });
};
