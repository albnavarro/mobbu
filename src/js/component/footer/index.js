import { parseComponents } from '../../baseComponent/componentList';

/**
 * Init navigation module.
 */
export const createFooter = () => {
    const pippo2 = document.querySelector('.pippo2');
    parseComponents({ element: pippo2 });
};
