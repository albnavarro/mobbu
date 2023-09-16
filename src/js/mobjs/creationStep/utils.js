// @ts-check

import {
    ATTR_BIND_EVENTS_PARTIAL,
    ATTR_CURRENT_LIST_VALUE_PARTIAL,
    ATTR_DYNAMIC_PARTIAL,
    ATTR_DYNAMIC_PROPS_FROM_SLOT_PARTIAL,
    ATTR_INSTANCENAME_PARTIAL,
    ATTR_IS_RUNTIME_PARTIAL,
    ATTR_KEY_PARTIAL,
    ATTR_PROPS_FROM_SLOT_PARTIAL,
    ATTR_PROPS_PARTIAL,
    ATTR_WILL_COMPONENT_PARTIAL,
} from '../constant';

/**
 * Exclude this props becouse if a reserved props keys.
 */
export const propsKeyToExclude = [
    `${ATTR_PROPS_PARTIAL}`,
    `${ATTR_WILL_COMPONENT_PARTIAL}`,
    `${ATTR_KEY_PARTIAL}`,
    `${ATTR_DYNAMIC_PARTIAL}`,
    `${ATTR_INSTANCENAME_PARTIAL}`,
    `${ATTR_PROPS_FROM_SLOT_PARTIAL}`,
    `${ATTR_DYNAMIC_PROPS_FROM_SLOT_PARTIAL}`,
    `${ATTR_IS_RUNTIME_PARTIAL}`,
    `${ATTR_CURRENT_LIST_VALUE_PARTIAL}`,
    `${ATTR_BIND_EVENTS_PARTIAL}`,
];

/**
 * @param {Object} obj
 * @param {{bind:Array<String>, props: Function}|undefined} obj.dynamicProps
 * @param {String|undefined} obj.stateToWatch
 * @returns {{bind:Array<String>, props: Function}|undefined}
 *
 * @description
 * Remove watch state from bind.
 */
export const removeWatchFromDynamicProps = ({ dynamicProps, stateToWatch }) => {
    if (!dynamicProps || !('bind' in dynamicProps) || !stateToWatch)
        return dynamicProps;

    const { bind } = dynamicProps;
    const newBind = bind.filter(
        (/** @type{String} */ state) => state !== stateToWatch
    );

    return { ...dynamicProps, bind: newBind };
};

export const renderHtml = (
    /** @type{Array<String>} */ strings,
    /** @type{any} */ ...values
) => String.raw({ raw: strings }, ...values);
