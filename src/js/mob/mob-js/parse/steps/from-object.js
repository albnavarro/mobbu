import { MobCore } from '@mobCore';

const VOID_ELEMENTS = new Set([
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
]);

/**
 * Compact classes from array
 *
 * @param {string[]} value
 * @returns {string}
 */
const getStringOrArrayOfString = (value) => {
    const valueToArray = MobCore.checkType(String, value) ? [value] : value;

    return /** @type {string[]} */ (valueToArray).reduce(
        (previous, current) => {
            return previous.length === 0 ? current : `${previous} ${current}`;
        },
        ''
    );
};

/**
 * Parse attributes
 *
 * @param {any} value
 * @param {boolean} [useData]
 */
const getAttributes = (value, useData = false) =>
    Object.entries(value).reduce((previous, [key, value]) => {
        /**
         * Skip falsi
         */
        if (value === false || value == null) return previous;

        /**
         * Boolean
         */
        if (value === true) return `${previous} ${key}`;

        /**
         * String/number
         */
        return useData
            ? `${previous} data-${key}="${value}"`
            : `${previous} ${key}="${value}"`;
    }, '');

/**
 * @type {import('./type').FromObject}
 */
export const htmlObject = (data) => {
    /**
     * Use userComponent tag or DOM generic tag
     */
    const component = data?.component ?? null;
    const componentKey = component && Object.keys(component)?.[0];
    const tag = componentKey ?? data?.tag ?? `div`;

    // @ts-ignore
    const className = getStringOrArrayOfString(data?.className ?? []);
    const classAttr = className.trim() ? `class="${className}"` : '';

    const style = data?.style ?? '';
    const styleAttr = style.trim() ? `style="${style}"` : '';

    const attributes = getAttributes(data?.attributes ?? {});
    const dataAttributes = getAttributes(data?.dataAttributes ?? [], true);
    const content = getContent(data?.content ?? []);

    // @ts-ignore
    const modules = getStringOrArrayOfString(data?.modules ?? []);
    const isVoid = VOID_ELEMENTS.has(tag.toLowerCase());

    return isVoid
        ? `<${tag} ${classAttr} ${styleAttr} ${attributes} ${dataAttributes} ${modules}/>`
        : `<${tag} ${classAttr} ${styleAttr} ${attributes} ${dataAttributes} ${modules}>${content}</${tag}>`;
};

/**
 * @param {any} value
 */
const getContent = (value) => {
    /**
     * Singolo Nodo
     */
    if (MobCore.checkType(Object, value)) {
        return htmlObject(value);
    }

    /**
     * Singolo textContent
     */
    if (MobCore.checkType(String, value)) {
        return value;
    }

    /**
     * Check for multiple content
     */
    const valueToArray = MobCore.checkType(String, value) ? [value] : value;

    /**
     * No content
     */
    if (valueToArray.length === 0) return '';

    return valueToArray.reduce(
        (
            /** @type {any} */ previous,
            /** @type {import('./type').FromObjectNodeDescriptor} */ current
        ) => {
            if (!current) return previous;

            /**
             * Array
             */
            if (MobCore.checkType(Array, current)) {
                return getContent(current);
            }

            /**
             * TextContent
             */
            if (MobCore.checkType(String, current)) {
                return `${previous} ${current}`;
            }

            /**
             * DOM node content
             */
            if (MobCore.checkType(Object, current)) {
                return `${previous} ${htmlObject(current)}`;
            }

            /**
             * Fallback per numeri e altri tipi
             */
            return `${previous} ${String(current)}`;
        },
        ''
    );
};
