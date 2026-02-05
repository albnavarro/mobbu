import { STORE_SET } from './constant';
import { setCurrentDependencies } from './current-key';
import { getLogStyle } from './log-style';
import { storeMap, updateMainMap } from './store-map';
import { storeSetEntryPoint } from './store-set';
import { checkIfPropIsComputed } from './store-utils';
import { storeProxiReadOnlyWarning } from './store-warining';

/**
 * Crea proxy dinamico.
 *
 * - Get: legge da self e binded stores
 * - Set: scrive SOLO su self store
 *
 * @param {string} instanceId
 * @returns {Record<string, any>}
 */
const createDynamicProxy = (instanceId) => {
    const logStyle = getLogStyle();

    return new Proxy(
        {},
        {
            set(_, /** @type {string} */ prop, value) {
                const mainState = storeMap.get(instanceId);
                if (!mainState) return false;

                /**
                 * Set operation is applied only in `self` store.
                 */
                if (!(prop in mainState.store)) return false;

                const isComputed = checkIfPropIsComputed({ instanceId, prop });
                const isReadOnly = mainState.proxiReadOnlyProp.has(prop);

                if (isReadOnly) storeProxiReadOnlyWarning(prop, logStyle);
                if (isComputed || isReadOnly) return false;

                storeSetEntryPoint({
                    instanceId,
                    prop,
                    value,
                    fireCallback: true,
                    clone: false,
                    action: STORE_SET,
                });

                return true;
            },
            get(_, /** @type {string} */ prop) {
                if (!storeMap.has(instanceId)) return;

                const state = storeMap.get(instanceId);
                if (!state) return;

                /**
                 * GET: cerca prima in self, poi nei binded
                 */
                if (prop in state.store) {
                    /**
                     * Autodetect dependencies
                     */
                    setCurrentDependencies(prop);
                    return state.store[prop];
                }

                for (const bindId of state.bindInstance) {
                    const bindState = storeMap.get(bindId);

                    if (bindState && prop in bindState.store) {
                        /**
                         * Autodetect dependencies
                         */
                        setCurrentDependencies(prop);
                        return bindState.store[prop];
                    }
                }
            },
            has(_, /** @type {string} */ prop) {
                if (!storeMap.has(instanceId)) return false;

                const state = storeMap.get(instanceId);
                if (!state) return false;

                /**
                 * HAS: cerca prima in self, poi nei binded
                 */
                if (prop in state.store) return true;

                for (const bindId of state.bindInstance) {
                    const bindState = storeMap.get(bindId);
                    if (bindState && prop in bindState.store) return true;
                }

                return false;
            },
        }
    );
};

/**
 * @param {object} params
 * @param {string} params.instanceId
 * @returns {Record<string, any>}
 */
export const getProxiEntryPoint = ({ instanceId }) => {
    const state = storeMap.get(instanceId);
    if (!state) return {};

    if (state.proxiObject) {
        return state.proxiObject;
    }

    const proxiObject = createDynamicProxy(instanceId);

    updateMainMap(instanceId, {
        ...state,
        proxiObject,
    });

    return proxiObject;
};
