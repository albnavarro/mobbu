import { componentListMap } from './componentList';

/**
 * @description
 *
 * @returns {{[key:string]:import('../mainStore/type').ComponentListMap}}
 */
export const getComponentList = () => {
    return componentListMap;
};
