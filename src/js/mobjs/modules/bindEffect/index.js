import { mobCore } from '../../../mobCore';
import { checkType } from '../../../mobCore/store/storeType';
import { getStateById } from '../../component/action/state/getStateById';
import { watchById } from '../../component/action/watch';
import { ATTR_BIND_EFFECT } from '../../constant';

/** @type{import("./type").BindEffectMap} */
const bindEffectMap = new Map();

/**
 * @description Save bindClass data in temporary map
 *
 * @type {import("./type").BindEffectSet}
 */
export const setBindEffect = ({ data, id }) => {
    /** @type{import('./type').BindEffectObject<any>[]} */
    const dataToArray = mobCore.checkType(Array, data) ? data : [data];

    const dataBindToArray = dataToArray.map(
        ({ bind, toggleClass, toggleStyle }) => {
            return {
                bind: /** @type{string[]} */ (
                    mobCore.checkType(Array, bind) ? bind : [bind]
                ),
                toggleClass: toggleClass ?? {},
                toggleStyle: toggleStyle ?? {},
            };
        }
    );

    const item = {
        parentId: id,
        items: dataBindToArray,
    };

    const univoqueId = mobCore.getUnivoqueId();
    bindEffectMap.set(univoqueId, item);
    return univoqueId;
};

/**
 * @description Get data from map at the end of parse.
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const applyBindEffect = (element) => {
    let occurrences = /** @type{HTMLElement[]} */ ([
        ...element.querySelectorAll(`[${ATTR_BIND_EFFECT}]`),
    ]);

    /**
     * TODO:
     * Check that target don't is garbage collected.
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

    /**
     * Trigger target remove grom garbage collector as soon as possible.
     */
    // @ts-ignore
    occurrences = null;
};

/**
 * @description Apply watcher.
 *
 * @param {object} params
 * @param {import('./type').BindEffectMapValue} params.data
 * @param {HTMLElement} params.element
 * @returns {void}
 */
const watchBindEffect = ({ data, element }) => {
    /** @type{WeakRef<HTMLElement>} */
    const ref = new WeakRef(element);

    const { parentId: id } = data;
    const { items } = data;

    items.forEach(({ bind, toggleClass, toggleStyle }) => {
        /**
         * Watch props on change
         */
        let watchIsRunning = false;

        /**
         * proxiIndex issue.
         * Get states to check if there is an array
         * Will check that array has always a length > 0
         */
        const states = getStateById(id);

        bind.forEach((state) => {
            const initialStateValue = states?.[state];
            const isArray = checkType(Array, initialStateValue);

            /**
             * Repeat ProxiIndex issue.
             * Array che be destroyed before element will removed.
             * proxi.data[proxiIndex.value].prop can fail when array is empty.
             */
            const shouldRender = !isArray || initialStateValue.length > 0;

            /**
             * Initial class render
             */
            if (toggleClass && shouldRender) {
                mobCore.useFrame(() => {
                    Object.entries(toggleClass).forEach(([className, fn]) => {
                        if (!ref.deref()) return;

                        // @ts-ignore
                        ref.deref().classList.toggle(className, fn?.());
                    });
                });
            }

            /**
             * Initial style render
             */
            if (toggleStyle && shouldRender) {
                mobCore.useFrame(() => {
                    Object.entries(toggleStyle).forEach(([styleName, fn]) => {
                        if (!ref.deref()) return;

                        // @ts-ignore
                        ref.deref().style[styleName] = fn?.() ?? '';
                    });
                });
            }

            const unwatch = watchById(id, state, (value) => {
                if (!ref.deref() && unwatch) {
                    unwatch();
                    return;
                }

                /**
                 * Wait for all all props is settled.
                 */
                if (watchIsRunning) return;
                watchIsRunning = true;

                mobCore.useNextLoop(() => {
                    mobCore.useFrame(() => {
                        /**
                         * Repeat ProxiIndex issue.
                         * Array che be destroyed before element will removed.
                         * proxi.data[proxiIndex.value].prop can fail when array is empty.
                         */
                        const shouldRender = !isArray || value.length > 0;

                        if (toggleClass && shouldRender) {
                            if (!ref.deref()) return;
                            Object.entries(toggleClass).forEach(
                                ([className, fn]) => {
                                    if (!ref.deref()) return;

                                    // @ts-ignore
                                    ref.deref().classList.toggle(
                                        className,
                                        fn?.()
                                    );
                                }
                            );
                        }

                        if (toggleStyle && shouldRender) {
                            if (!ref.deref()) return;
                            Object.entries(toggleStyle).forEach(
                                ([styleName, fn]) => {
                                    if (!ref.deref()) return;

                                    // @ts-ignore
                                    ref.deref().style[styleName] = fn?.() ?? '';
                                }
                            );
                        }

                        watchIsRunning = false;
                    });
                });
            });
        });
    });
};
