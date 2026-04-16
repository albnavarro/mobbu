import { MobCore } from '@mobCore';

/**
 * Get array of classes.
 *
 * - ['section-class pippo', 'pluto'] array of string
 * - 'section-class pippo' // multiple classes in string
 * - 'section-class' // string
 *
 * @param {string | string[]} value
 * @returns {string[]}
 */
const getClassList = (value) => {
    const valueToArray = /** @type {string[]} */ (
        MobCore.checkType(String, value) ? [value] : value
    );

    /**
     * - Usiamo filter(Boolean) per saltare stringhe vuote es spazi bianchi
     * - /\s+/ divisiamo per spazi anche miltipli
     */
    return valueToArray.flatMap((item) =>
        item.trim().split(/\s+/).filter(Boolean)
    );
};

/**
 * STEP1: al memento invalidate && repeat li trattiamo come stringhe
 *
 * - In seguito restuiranno il web component e il render sará trattato `salvato` come i repeat senza key
 *
 * @type {import('./from-object-next-type').FromObjectNextType}
 */
export const htmlObjectNext = (data) => {
    const component = data?.component ?? null;
    const componentKey = component && Object.keys(component)?.[0];
    const tag = componentKey ?? data?.tag ?? `div`;

    const rootElement = document.createElement(tag);

    /**
     * ClassList
     */
    // @ts-ignore
    const classList = getClassList(data?.className ?? []);
    for (const classValue of classList) {
        rootElement.classList.add(classValue);
    }

    /**
     * Style
     */
    const styles = data?.style ?? {};
    for (const [key, value] of Object.entries(styles)) {
        rootElement.style[/** @type {any} */ (key)] = value;
    }

    /**
     * Attributes
     */
    const attributes = data?.attributes ?? {};
    for (const [key, value] of Object.entries(attributes)) {
        rootElement.setAttribute(key, /** @type {any} */ (value));
    }

    /**
     * Data attributes
     */
    const dataAttributes = data?.dataAttributes ?? {};
    for (const [key, value] of Object.entries(dataAttributes)) {
        rootElement.setAttribute(`data-${key}`, /** @type {any} */ (value));
    }

    /**
     * Modules
     */
    const modules = data?.modules ?? {};
    const modulesArray = MobCore.checkType(Array, modules)
        ? modules
        : [modules];

    for (const item of /** @type{Record<string, any>[]} */ (modulesArray)) {
        for (const [key, value] of Object.entries(item)) {
            rootElement.setAttribute(key, /** @type {any} */ (value));
        }
    }

    return rootElement;
};
