import { parseComponents } from '../baseComponent/componentList';

/**
 * Init navigation module.
 */
export const createNavigation = () => {
    const side = document.querySelector('.side');
    parseComponents({ element: side });
};
