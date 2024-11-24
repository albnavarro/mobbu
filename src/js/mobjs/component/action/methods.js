import { componentMap } from '../store';
import { getIdArrayByInstanceName, getIdByInstanceName } from './component';

/**
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.name
 * @param {(arg0: any) => void} obj.fn
 *
 * @description
 * Add method to component
 */
export const addMethodById = ({ id, name, fn }) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    const methods = item?.methods;

    if (!methods) return;

    if (name in methods) {
        console.warn(`Method ${name}, is already used by ${id}`);
        return;
    }

    componentMap.set(id, {
        ...item,
        methods: { ...methods, [name]: fn },
    });
};

/**
 * @param {object} obj
 * @param {string} obj.id
 * @returns {{[key:string]:(arg0: any) => void}|{}}
 *
 * @description
 * Get method by id
 */
export const getMethodsById = ({ id }) => {
    if (!id || id === '') return {};

    const item = componentMap.get(id);
    const methods = item?.methods;

    if (!methods) return {};

    if (Object.keys(methods).length === 0) {
        console.warn(`no methods available for ${id} component`);
        return {};
    }

    return methods;
};

/**
 * @param {string} name
 * @returns {{[key:string]:(...args: any[]) => void}}
 *
 * @description
 * Get method by id
 */
export const useMethodByName = (name) => {
    const id = getIdByInstanceName(name);
    if (!id || id === '') return {};

    const methods = getMethodsById({ id });
    if (Object.keys(methods).length === 0) {
        console.warn(`no methods available for ${name} component`);
        return {};
    }

    return methods;
};

/**
 * @param {string} name
 * @returns {object}
 *
 * @description
 * Get array of  method by id
 */
export const useMethodArrayByName = (name) => {
    const ids = getIdArrayByInstanceName(name);
    return ids.map((id) => getMethodsById({ id }));
};
