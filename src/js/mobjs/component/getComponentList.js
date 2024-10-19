import { componentListMap } from './componentList';

/**
 * @description
 *
 * @returns {{[key:string]:import('../mainStore/type').componentListMapType}}
 */
export const getComponentList = () => {
    return componentListMap;
};
