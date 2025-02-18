import { componentListMap } from './componentList';

/**
 * @description
 *
 * @returns {{[key:string]:import('../mainStore/type').ComponentListMapType}}
 */
export const getComponentList = () => {
    return componentListMap;
};
