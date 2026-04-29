import { MobCore } from '@mobCore';
import { tagShouldBeComponent } from '../../component/component-tag';
import { ATTR_BIND_EFFECT, ATTR_BIND_EFFECT_INSTANCE } from '../../constant';
import { mainStore } from '../../modules';
import { MAIN_STORE_ROUTE_IS_LOADING } from '../../main-store/constant';

/**
 * Attributi da cambiare per i componenti.
 */
const attributesComponentExeptions = new Map([
    [ATTR_BIND_EFFECT, ATTR_BIND_EFFECT_INSTANCE],
]);

/**
 * Prevent click on a element while route is loading.
 *
 * @param {HTMLAnchorElement} anchor
 */
const guardAnchorWhileRouteLoading = (anchor) => {
    anchor.addEventListener('click', (event) => {
        if (mainStore.getProp(MAIN_STORE_ROUTE_IS_LOADING))
            event.preventDefault();
    });
};

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
 * @type {import('./type').FromObjectType}
 */
export const htmlObject = (data) => {
    const componentProp = data?.component ?? null;
    const componentKey = componentProp && componentProp.component.tag;
    const tag = componentKey ?? data?.tag ?? `div`;
    const rootElement = document.createElement(tag);

    /**
     * Check if tag is a component
     */
    const shouldBeComponent = tagShouldBeComponent(tag);

    /**
     * Skip click on `a` tag while route is loading
     */
    if (tag === 'a')
        guardAnchorWhileRouteLoading(
            /** @type {HTMLAnchorElement} */ (rootElement)
        );

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
        rootElement.style.setProperty(key, String(value));
    }

    /**
     * Attributes
     */
    const attributes = data?.attributes ?? {};
    for (const [key, value] of Object.entries(attributes)) {
        /**
         * I valori false e null non devono aggiungere l' attributo
         */
        if (value === false || value == null) continue;

        rootElement.setAttribute(key, /** @type {any} */ (value));
    }

    /**
     * Data attributes
     */
    const dataAttributes = data?.dataAttributes ?? {};
    for (const [key, value] of Object.entries(dataAttributes)) {
        /**
         * I valori false e null non devono aggiungere l' attributo
         */
        if (value === false || value == null) continue;

        rootElement.setAttribute(`data-${key}`, /** @type {any} */ (value));
    }

    /**
     * Modules
     */
    const modules = data?.modules ?? {};
    const modulesArray = MobCore.checkType(Array, modules)
        ? modules
        : [modules];

    /**
     * Add modules in with exceptions for component
     */
    if (shouldBeComponent) {
        /**
         * - Moduli come bindEffect efftuano una querySelectorAll su tutto i nodi figli.
         * - I nodi componente sono placeholder o customComponent resituiti dalla funzione-componente.
         * - Per questi nodi usiamo un alias diverso per inizializzare il modulo a livello parente.
         * - In parse-function-while tracciremo questi moduli separatamante.
         */
        for (const item of /** @type{Record<string, any>[]} */ (modulesArray)) {
            for (const [key, value] of Object.entries(item)) {
                const keyParsed = attributesComponentExeptions?.get(key) ?? key;
                rootElement.setAttribute(keyParsed, /** @type {any} */ (value));
            }
        }
    } else {
        /**
         * Assegnazione di default dei moduli
         */
        for (const item of /** @type{Record<string, any>[]} */ (modulesArray)) {
            for (const [key, value] of Object.entries(item)) {
                rootElement.setAttribute(key, /** @type {any} */ (value));
            }
        }
    }

    const children = data?.content;
    if (children) addContentChild(rootElement, children);

    return rootElement;
};

/**
 * @param {HTMLElement} rootElement
 * @param {import('./type').FromObjectNodeContent} children
 */
const addContentChild = (rootElement, children) => {
    const childrenToArray = MobCore.checkType(Array, children)
        ? children
        : [children];

    for (const child of /** @type {any} */ (childrenToArray)) {
        /**
         * Simple string
         */
        if (MobCore.checkType(String, child)) {
            rootElement.insertAdjacentHTML('beforeend', child);
            continue;
        }

        /**
         * HTML Node element
         */
        if (MobCore.checkType(Element, child)) {
            rootElement.append(child);
            continue;
        }

        /**
         * Nestes array.
         *
         * - Nested array should is flatted in main array.
         * - Repeat/Invalidate/BindObject/BindText return an array of element.
         * - So flat all element in main conente array.
         */
        if (MobCore.checkType(Array, child)) {
            addContentChild(rootElement, child);
            continue;
        }

        /**
         * Library component
         */
        if (MobCore.checkType(Object, child)) {
            const content = htmlObject(child);
            rootElement.append(content);
            continue;
        }
    }
};

/**
 * @param {string} value
 * @returns {HTMLElement}
 */
export const htmlString = (value) => {
    const template = document.createElement('template');
    template.innerHTML = value.trim();

    /**
     * Skip click on `a` tag while route is loading
     */
    for (const anchor of template.content.querySelectorAll('a')) {
        guardAnchorWhileRouteLoading(anchor);
    }

    return (
        /** @type {HTMLElement | null} */ (
            template.content.firstElementChild
        ) ?? document.createElement('div')
    );
};
