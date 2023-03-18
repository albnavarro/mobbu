import { parseComponents } from '../../baseComponent/componentList';

/**
 * Init navigation module.
 */
export const createHeader = () => {
    const pippo = document.querySelector('.pippo');
    parseComponents({ element: pippo });
};
