// @ts-check

import { getUnivoqueId } from '../mobMotion/animation/utils/animationUtils';
import {
    ATTR_INSTANCENAME,
    ATTR_IS_COMPONENT,
    ATTR_IS_RUNTIME,
    ATTR_IS_RUNTIME_PARTIAL,
    ATTR_PROPS,
    ATTR_SLOT_NAME,
    ATTR_SLOT_POSITION,
    ATTR_WILL_COMPONENT,
} from './constant';
import { getComponentList } from './mainStore/actions/componentList';
import { setStaticProps } from './mainStore/actions/props';

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.container
 * @returns {{uniqueId:String, hasComponentInside: Number}}
 *
 * @description
 * Add a runtime id to all component inside a div
 * Return the runtime id and the number of components inside container with.
 */
export const createRunTimeComponent = ({ container }) => {
    /**
     * @type {String}
     */
    const selectorDefaultTag = getSelectorDefaultTag();

    /**
     * @type {String}
     */
    const uniqueId = getUnivoqueId();

    /**
     * @type {NodeListOf.<HTMLElement>} innerComponents
     */
    const innerComponents = container.querySelectorAll(
        `${selectorDefault}, ${selectorDefaultTag}`
    );

    [...innerComponents].forEach(
        (component) => (component.dataset[ATTR_IS_RUNTIME_PARTIAL] = uniqueId)
    );

    return { uniqueId, hasComponentInside: [...innerComponents].length };
};

/**
 * @return {Object} Return Object with
 * key: component name in uppercase.
 * value: component name original
 *
 * @description
 * Get component Object with name in uppercase and the value is the original name.
 * Name in uppercase is necessary for element.tagName
 */
export const getComponentsReference = () => {
    const componentList = getComponentList();

    return Object.keys(componentList)
        .map((key) => ({
            [key.toUpperCase()]: key,
        }))
        .reduce((previous, current) => {
            return { ...previous, ...current };
        }, {});
};

/**
 * @reurn { String }
 *
 * @description
 * For each component registered:
 * Return <component name>:not[is-runtime]:not[data-mobjs], ...
 *
 */
export const getSelectorDefaultTag = () => {
    const componentsReference = getComponentsReference();

    return Object.values(componentsReference)
        .map((value) => {
            return `${value}:not([${ATTR_IS_RUNTIME}]):not([${ATTR_IS_COMPONENT}])`;
        })
        .join(', ');
};

/**
 * @type {String}
 *
 * Non runtime default
 * Select [data-component]:not[is-runtime]:not[data-mobjs]
 */
export const selectorDefault = `[${ATTR_WILL_COMPONENT}]:not([${ATTR_IS_RUNTIME}]:not([${ATTR_IS_COMPONENT}]))`;

/**
 * @param {String} name
 * @returns {String}
 *
 * @description
 * Set instance name.
 *
 * @example
 * ```javascript
 * <MyComponent ${instanceName('my-instance-component')}></MyComponent>
 *
 * ```
 *
 */
export const instanceName = (name = '') => {
    return `${ATTR_INSTANCENAME}="${name}"`;
};

/**
 * @param {String} name
 * @returns {String}
 *
 * @description
 * Set instance name.
 *
 * @example
 * ```javascript
 * <slot ${slotName('slot2')}></slot>
 *
 * ```
 *
 */
export const slotName = (name = '') => {
    return `${ATTR_SLOT_NAME}="${name}"`;
};

/**
 * @param {String} name
 * @returns {String}
 *
 * @description
 * Set instance name.
 *
 * @example
 * ```javascript
 * <MyComponent ${useSlot('slot2')}></MyComponent>
 *
 * ```
 *
 */
export const useSlot = (name = '') => {
    return `${ATTR_SLOT_POSITION}="${name}"`;
};

/**
 * @param {{String:any}|{}} props
 * @returns {String}
 *
 * @description
 * Set static props
 *
 * @example
 * ```javascript
 * <MyComponent
 *     ${staticProps({
 *         gutter: 1,
 *         ...
 *     })}
 * ></MyComponent>
 *
 * ```
 *
 */
export const staticProps = (props = {}) => {
    return `${ATTR_PROPS}="${setStaticProps(props)}"`;
};
