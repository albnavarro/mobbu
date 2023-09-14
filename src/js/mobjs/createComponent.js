import { UNSET } from './constant';

let defaultComponent = {
    isolateCreation: false,
    isolateOnMount: false,
    scoped: false,
    maxParseIteration: 5000,
};

/**
 * @param {Object} obj
 * @param {Boolean} [ obj.isolateOnMount ] - Wait one frame after execute onMount function.( for havly onMount function ).
 *   - Less stress for big script fired inside onMont function.
 *  `default = false`.
 * @param {Boolean} [ obj.isolateCreation ] - Add DOM element in a dedicated request animation Frame.
 *   - If is settled to `false` use a request animation frame to apply class/style inside onMount function ( to have css trasition working ).
 *  `default = false`.
 * @param {Boolean} [ obj.scoped ] - Fire onMount callback immediatly, normally onMount is fired at the end of current parse.
 *  This means that if `scoped:true` every querySelector fired inside onMount function is scoped inside current component, but has no effect to child component.
 *  `default = false`.
 * @param {Number} [ obj.maxParseIteration ] - DOM creation use a recursive function, this value mimit the number of iteration.
 * - Prevent infinite loop, in case of error or wrong component incapsulation
 *
 * @returns Object
 *
 * @description
 */
export const setDefaultComponent = (obj) => {
    defaultComponent = { ...defaultComponent, ...obj };
};

export const getDefaultComponent = () => defaultComponent;

/**
 * @param {Object} obj
 * @param {String} obj.name
 * @param {Function} obj.component
 * @param {Array<String>} [ obj.exportState ]
 * @param {Boolean} [ obj.isolateOnMount ] - Wait one frame after execute onMount function.( for havly onMount function ).
 *   - Less stress for big script fired inside onMont function.
 *  `default = false`.
 * @param {Boolean} [ obj.isolateCreation ] - Add DOM element in a dedicated request animation Frame.
 *   - If is settled to `false` use a request animation frame to apply class/style inside onMount function ( to have css trasition working ).
 *  `default = false`.
 * @param {Boolean} [ obj.scoped ] - Fire onMount callback immediatly, normally onMount is fired at the end of current parse.
 *  This means that if `scoped:true` every querySelector fired inside onMount function is scoped inside current component, but has no effect to child component.
 *  `default = false`.
 * @param {import('../../mobCore').MobbuStoreType} [ obj.state ]
 * @returns Object<string:{componentFunction:function,componentParams:Object}>
 *
 * @description
 * Format component definition in object key: value.
 * name, function, props, state
 */
export const createComponent = ({
    name = '',
    component = () => {},
    state = {},
    exportState = [],
    isolateCreation = UNSET,
    isolateOnMount = UNSET,
    scoped = UNSET,
    type = 'div',
    DOMprimitive = HTMLElement,
}) => {
    return {
        [name]: {
            componentFunction: component,
            componentParams: {
                exportState,
                isolateCreation,
                isolateOnMount,
                scoped,
                state,
                type,
                DOMprimitive,
            },
        },
    };
};
