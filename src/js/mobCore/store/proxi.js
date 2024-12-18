import { STORE_SET } from './constant';
import { getLogStyle } from './logStyle';
import { getStateFromMainMap, updateMainMap } from './storeMap';
import { storeSetEntryPoint } from './storeSet';
import { storePropInProxiWarning } from './storeWarining';

/**
 * @param {object} params
 * @param {string} params.instanceId
 * @returns {Record<string, any>}
 */
export const getProxiEntryPoint = ({ instanceId }) => {
    const state = getStateFromMainMap(instanceId);
    const { store, proxiObject: previousProxiObject } = state;

    /**
     * Create only one proxi.
     */
    if (previousProxiObject) {
        return previousProxiObject;
    }

    const proxiObject = new Proxy(store, {
        set(target, /** @type{string} */ prop, value) {
            if (prop in target) {
                // Mutiamo l'oggetto originale con i metodi giá presenti
                storeSetEntryPoint({
                    instanceId,
                    prop,
                    value,
                    fireCallback: true,
                    clone: false,
                    action: STORE_SET,
                });

                return true;
            }

            const logStyle = getLogStyle();
            storePropInProxiWarning(prop, logStyle);
            return false;
        },
    });

    updateMainMap(instanceId, { ...state, proxiObject });

    return proxiObject;
};
