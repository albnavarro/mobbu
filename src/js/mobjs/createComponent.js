import { UNSET } from './constant';

let defaultComponent = {
    asyncCreation: false,
    asyncLoading: false,
    scoped: false,
};

/**
 * @param {Object} obj
 * @param {Boolean} [ obj.asyncLoading ] - Wait one frame after execute onMount function.( for havly onMount function ).
   `default = false`.
 * @param {Boolean} [ obj.asyncCreation ] - Add DOM element in a dedicated request animation Frame.
    - If is settled to `false` use a request animation frame to apply class/style inside onMount function ( to have css trasition working ).
   `default = false`.
 * @param {Boolean} [ obj.scoped ] - Fire onMount callback immediatly, normally onMount is fired at the end of current parse.
   This means that if `scoped:true` every querySelector fired inside onMount function is scoped inside current component, but has no effect to child component.
   `default = false`.
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
 * @param {Boolean} [ obj.asyncLoading ] - Wait one frame after execute onMount function.( for havly onMount function ).
   `default = false`.
 * @param {Boolean} [ obj.asyncCreation ] - Add DOM element in a dedicated request animation Frame.
    - If is settled to `false` use a request animation frame to apply class/style inside onMount function ( to have css trasition working ).
   `default = false`.
 * @param {Boolean} [ obj.scoped ] - Fire onMount callback immediatly, normally onMount is fired at the end of current parse.
   This means that if `scoped:true` every querySelector fired inside onMount function is scoped inside current component, but has no effect to child component.
   `default = false`.
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
    asyncCreation = UNSET,
    asyncLoading = UNSET,
    scoped = UNSET,
}) => {
    return {
        [name]: {
            componentFunction: component,
            componentParams: {
                exportState,
                asyncCreation,
                asyncLoading,
                scoped,
                state,
            },
        },
    };
};
