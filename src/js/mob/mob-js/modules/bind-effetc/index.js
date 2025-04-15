import { MobCore, MobDetectBindKey } from '../../../mob-core';
import { watchById } from '../../component/action/watch';
import { ATTR_BIND_EFFECT } from '../../constant';

/** @type {import('./type').BindEffectMap} */
const bindEffectMap = new Map();

/**
 * @param {string | string[]} bind
 * @returns {string[]}
 */
const getExplicitBind = (bind) => {
    return /** @type {string[]} */ (
        MobCore.checkType(Array, bind) ? bind : [bind]
    );
};

/**
 * @param {object} params
 * @param {Record<string, () => string>} params.toggleStyle
 * @param {Record<string, () => void>} params.toggleClass
 * @param {Record<string, () => void>} params.toggleAttribute
 * @returns {string[]}
 */
const getAutoBind = ({ toggleClass, toggleStyle, toggleAttribute }) => {
    MobDetectBindKey.initializeCurrentDependencies();
    Object.values(toggleStyle).forEach((fn) => fn());
    Object.values(toggleClass).forEach((fn) => fn());
    Object.values(toggleAttribute).forEach((fn) => fn());
    return MobDetectBindKey.getCurrentDependencies();
};

/**
 * Save bindClass data in temporary map
 *
 * @type {import('./type').BindEffectSet}
 */
export const setBindEffect = ({ data, id }) => {
    /** @type {import('./type').BindEffectObject<any>[]} */
    const dataToArray = MobCore.checkType(Array, data) ? data : [data];

    const dataBindToArray = dataToArray.map(
        ({ bind, toggleClass, toggleStyle, toggleAttribute }) => {
            /**
             * Detect explicit or auto dependencies.
             */
            const bindParsed = bind
                ? getExplicitBind(bind)
                : getAutoBind({
                      toggleStyle: toggleStyle ?? { fake: () => '' },
                      toggleClass: toggleClass ?? { fake: () => {} },
                      toggleAttribute: toggleAttribute ?? { fake: () => {} },
                  });

            return {
                bind: bindParsed,
                toggleClass: toggleClass ?? {},
                toggleStyle: toggleStyle ?? {},
                toggleAttribute: toggleAttribute ?? {},
            };
        }
    );

    const item = {
        parentId: id,
        items: dataBindToArray,
    };

    const univoqueId = MobCore.getUnivoqueId();
    bindEffectMap.set(univoqueId, item);
    return univoqueId;
};

/**
 * Get data from map at the end of parse.
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const applyBindEffect = (element) => {
    const occurrences = /** @type {HTMLElement[]} */ ([
        ...element.querySelectorAll(`[${ATTR_BIND_EFFECT}]`),
    ]);

    /**
     * TODO: Check that target don't is garbage collected.
     */
    occurrences.forEach((target) => {
        const id = target.getAttribute(ATTR_BIND_EFFECT);
        if (!id) return;

        const data = bindEffectMap.get(id);
        if (!data) return;

        target.removeAttribute(ATTR_BIND_EFFECT);
        watchBindEffect({ data, element: target });
        bindEffectMap.delete(id);
    });
};

/**
 * @param {object} params
 * @param {WeakRef<HTMLElement>} params.ref
 * @param {Record<string, () => boolean> | undefined} params.data
 * @returns {void}
 */
const applyClass = ({ ref, data }) => {
    if (!data) return;

    Object.entries(data).forEach(([className, fn]) => {
        if (!ref.deref()) return;

        // @ts-ignore
        ref.deref().classList.toggle(className, fn?.());
    });
};

/**
 * @param {object} params
 * @param {WeakRef<HTMLElement>} params.ref
 * @param {Record<string, () => string>} params.data
 * @returns {void}
 */
const applyStyle = ({ ref, data }) => {
    Object.entries(data).forEach(([styleName, fn]) => {
        if (!ref.deref()) return;

        // @ts-ignore
        ref.deref().style[styleName] = fn?.() ?? '';
    });
};

/**
 * @param {object} params
 * @param {WeakRef<HTMLElement>} params.ref
 * @param {Record<string, () => string | null | undefined>} params.data
 * @returns {void}
 */
const applyAttribute = ({ ref, data }) => {
    Object.entries(data).forEach(([attributeName, fn]) => {
        if (!ref.deref()) return;
        const value = fn?.();

        if (!value) {
            // @ts-ignore
            ref.deref().removeAttribute(attributeName);
            return;
        }

        // @ts-ignore
        ref.deref()?.setAttribute(attributeName, value);
    });
};

/**
 * Apply watcher.
 *
 * @param {object} params
 * @param {import('./type').BindEffectMapValue} params.data
 * @param {HTMLElement} params.element
 * @returns {void}
 */
const watchBindEffect = ({ data, element }) => {
    /** @type {WeakRef<HTMLElement>} */
    const ref = new WeakRef(element);

    const { parentId: id } = data;
    const { items } = data;

    const unsubScribeFunction = items.flatMap(
        ({ bind, toggleClass, toggleStyle, toggleAttribute }) => {
            /**
             * Watch props on change
             */
            let watchIsRunning = false;

            return bind.map((state) => {
                /**
                 * Initial class render
                 */
                if (toggleClass) {
                    MobCore.useFrame(() => {
                        applyClass({ ref, data: toggleClass });
                    });
                }

                /**
                 * Initial style render
                 */
                if (toggleStyle) {
                    MobCore.useFrame(() => {
                        applyStyle({ ref, data: toggleStyle });
                    });
                }

                /**
                 * Initial attribute render
                 */
                if (toggleAttribute) {
                    MobCore.useFrame(() => {
                        applyAttribute({ ref, data: toggleAttribute });
                    });
                }

                return watchById(id, state, () => {
                    /**
                     * Check if element is garbage collected.
                     */
                    if (!ref || !ref?.deref()) {
                        /**
                         * Unsubscribe all watcher attached to this ref
                         */
                        unsubScribeFunction.forEach((fn) => {
                            if (fn) fn();
                        });

                        unsubScribeFunction.length = 0;
                        return;
                    }

                    /**
                     * Wait for all all props is settled.
                     */
                    if (watchIsRunning) return;
                    watchIsRunning = true;

                    MobCore.useNextLoop(() => {
                        MobCore.useFrame(() => {
                            if (toggleClass && ref.deref()) {
                                applyClass({ ref, data: toggleClass });
                            }

                            if (toggleStyle && ref.deref()) {
                                applyStyle({ ref, data: toggleStyle });
                            }

                            if (toggleAttribute && ref.deref()) {
                                applyAttribute({ ref, data: toggleAttribute });
                            }

                            watchIsRunning = false;
                        });
                    });
                });
            });
        }
    );
};
