// @ts-check
import { core } from '../../mobMotion';

/**
 * @typedef {Object} componentStoreType
 * @prop { HTMLElement } element
 * @prop { String } component
 * @prop { Function } destroy
 * @prop { Array<Function> } parentPropsWatcher
 * @prop { Array<String> } freezedPros
 * @prop { Object } state
 * @prop {{ String: Array.<string> }} child
 * @prop { String } instanceName
 * @prop { String } parentId
 * @prop { String } key
 * @prop { Object } currentRepeaterState
 * @prop { Boolean } isRepeater
 * @prop { String } id
 */

/**
 * Inizializa component store
 */
export const componentStore = core.createStore({
    instances: () => ({
        value: [],
        type: Array,
        strict: true,
        validate: (/** @type {Array} */ val) => {
            const isValid = val.every(
                (item) =>
                    item?.element &&
                    item?.component &&
                    item?.destroy &&
                    item?.parentPropsWatcher &&
                    item?.state &&
                    item?.child &&
                    item?.freezedPros &&
                    'currentRepeaterState' in item &&
                    'isRepeater' in item &&
                    'instanceName' in item &&
                    'parentId' in item &&
                    'key' in item &&
                    'id' in item
            );

            if (!isValid) console.warn(`componentStore error on instances add`);
            return isValid;
        },
    }),
});
