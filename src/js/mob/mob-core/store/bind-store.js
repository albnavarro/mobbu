import { getStateFromMainMap, updateMainMap } from './store-map';
import { checkType } from './store-type';

/**
 * Send instance id to binded store.
 *
 * - Used in computed operation:
 * - When: Use when a state is updated/emitted.
 * - Why: prop is used by another store with bindStore():
 * - Action: Self id is added to target store.
 * - Because: ComputedPropsQueque set() of targets store should be updated.
 *
 * @param {object} params
 * @param {string} params.selfId
 * @param {string} params.bindId
 * @returns {void}
 */
const addSelfIdToBindInstanceBy = ({ selfId, bindId }) => {
    const state = getStateFromMainMap(bindId);
    if (!state) return;

    const { bindInstanceBy } = state;
    const bindInstanceByUpdated = [...bindInstanceBy, selfId];

    updateMainMap(bindId, {
        ...state,
        bindInstanceBy: bindInstanceByUpdated,
    });
};

/**
 * Remove self id from binded store.
 *
 * @param {object} params
 * @param {string} params.selfId
 * @param {string} params.bindId
 * @returns {void}
 */
export const removeSelfIdToBindInstanceBy = ({ selfId, bindId }) => {
    const state = getStateFromMainMap(bindId);
    if (!state) return;

    const { bindInstanceBy } = state;
    const bindInstanceByUpdated = bindInstanceBy.filter((id) => id !== selfId);

    updateMainMap(bindId, {
        ...state,
        bindInstanceBy: bindInstanceByUpdated,
    });
};

/**
 * Module entry point.
 *
 * @param {object} params
 * @param {import('./type').BindStoreValueType} params.value
 * @param {string} params.instanceId
 * @returns {void}
 */
export const bindStoreEntryPoint = ({ value, instanceId }) => {
    const state = getStateFromMainMap(instanceId);
    if (!state) return;

    const { bindInstance } = state;
    if (!bindInstance) return;

    /** @type {string[]} */
    const ids = checkType(Array, value)
        ? // @ts-ignore
          value.map((/** @type {getIdI: () => string} */ store) =>
              store.getId()
          )
        : // @ts-ignore
          [value.getId()];

    const bindInstanceUpdated = [...bindInstance, ...ids];

    updateMainMap(instanceId, {
        ...state,
        bindInstance: bindInstanceUpdated,
    });

    ids.forEach((id) => {
        addSelfIdToBindInstanceBy({ selfId: instanceId, bindId: id });
    });
};
