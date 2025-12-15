import { customHistoryName } from '@instanceName';
import { useMethodByName } from 'src/js/mob/mob-js/modules';

export const toggleHistory = () => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').CustomHistory>} */
    const methods = useMethodByName(customHistoryName);

    methods?.toggle();
};

/**
 * @param {object} params
 * @param {string} params.id
 */
export const addHistoryRouteWithoutUpdate = ({ id }) => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').CustomHistory>} */
    const methods = useMethodByName(customHistoryName);

    methods?.addRouteWithoutUpdate({ id });
};
