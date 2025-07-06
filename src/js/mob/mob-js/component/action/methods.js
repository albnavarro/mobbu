import { componentMap } from '../store';
import { getIdArrayByInstanceName, getIdByInstanceName } from './component';

/**
 * Add method to component
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.name
 * @param {(arg0: any) => void} obj.fn
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
 * Get method by id
 *
 * @template T
 * @param {object} obj
 * @param {string} obj.id
 * @returns {T | {}}
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
 * Get method by id
 *
 * @template T
 * @param {string} name
 * @returns {import('../../type').UseMethodByName<T> | undefined}
 */
export const useMethodByName = (name) => {
    const id = getIdByInstanceName(name);
    if (!id || id === '') return;

    const methods = getMethodsById({ id });
    if (Object.keys(methods).length === 0) {
        console.warn(`no methods available for ${name} component`);
        return;
    }

    return methods;
};

/**
 * Get array of method by id
 *
 * @template T
 * @param {string} name
 * @returns {import('../../type').UseMethodByName<T>[]}
 */
export const useMethodArrayByName = (name) => {
    const ids = getIdArrayByInstanceName(name);

    return ids
        .map((id) => getMethodsById({ id }))
        .filter((method) => {
            return Object.keys(method).length > 0;
        });
};
