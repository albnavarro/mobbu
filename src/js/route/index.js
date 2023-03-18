import { parseComponents } from '../baseComponent/componentList';
import { homeModule } from './home';

/**
 * Route
 */
const routeModules = {
    home: homeModule,
};

export const inizializeApp = async () => {
    /**
     *
     * Common modules
     */
    await parseComponents({ element: document });

    /**
     * Load module
     */
    const root = document.querySelector('#content');
    const currentModule = 'home';
    routeModules?.[currentModule]?.({ root });
};
