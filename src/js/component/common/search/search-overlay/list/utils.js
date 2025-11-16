import { searchOverlayList } from '@instanceName';
import { MobJs } from '@mobJs';

/**
 * @param {string} currentSearch
 */
export const updateOverlayList = (currentSearch) => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('./type').SearchOverlayList>}
     */
    const listMethods = MobJs.useMethodByName(searchOverlayList);
    listMethods?.update(currentSearch);
};

export const resetOverlayList = () => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('./type').SearchOverlayList>}
     */
    const listMethods = MobJs.useMethodByName(searchOverlayList);
    listMethods?.reset();
};
