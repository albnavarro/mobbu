import { headerName } from '@instanceName';
import { MobJs } from '@mobJs';

/**
 * @returns {HTMLElement}
 */
export const getHeaderElement = () => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').Header>} */
    const headerMethods = MobJs.useMethodByName(headerName);
    return headerMethods?.getHeader();
};
