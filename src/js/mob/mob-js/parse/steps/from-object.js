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
 * Parse style
 *
 * @param {Record<string, string>} value
 * @returns {string}
 */
const getStylesFromObject = (value) => {
    return Object.entries(value).reduce((previous, [key, value]) => {
        if (previous.length === 0) return `${key}:${value};`;
        return `${previous}${key}:${value};`;
    }, '');
};

/**
 * Parse modules
 *
 * @param {Record<string, string>} value
 * @returns {string}
 */
const extractSingleModule = (value) => {
    return Object.entries(value).reduce((previous, [key, value]) => {
        if (previous.length === 0) return `${key}="${value}" `;
        return `${previous} ${key}="${value}" `;
    }, '');
};

/**
 * Parse modules
 *
 * @param {Record<string, string> | Record<string, string>[]} value
 * @returns {string}
 */
const getModules = (value) => {
    const valueToArray = /** @type{Record<string, string>[]} */ (
        MobCore.checkType(Array, value) ? value : [value]
    );

    return valueToArray.reduce((previous, current) => {
        const currentModule = extractSingleModule(current);
        return `${previous} ${currentModule}`;
    }, '');
};

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

    const styleToParse = data?.style;
    const style = styleToParse ? getStylesFromObject(data?.style ?? {}) : '';
    const styleAttr = style.trim() ? `style="${style}"` : '';

    const attributeToParse = data?.attributes;
    const attributes = attributeToParse
        ? getAttributes(data?.attributes ?? {})
        : '';

    const dataAttributeToParse = data?.dataAttributes;
    const dataAttributes = dataAttributeToParse
        ? getAttributes(data?.dataAttributes ?? [], true)
        : '';

    const contentToParse = data?.content;
    const content = contentToParse ? getContent(data?.content ?? []) : '';

    // @ts-ignore
    const moduleToParse = data?.modules;
    const modules = moduleToParse ? getModules(data?.modules ?? {}) : '';

    /**
     * Check for void elements
     */
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
