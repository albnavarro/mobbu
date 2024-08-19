import { componentMap } from '../store';

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

    if (name in methods) {
        console.warn(`${name}, giá presente`);
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
 *
 * @description
 * Get method by id
 */
export const getMethodsById = ({ id }) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    const methods = item?.methods;
    return methods;
};
