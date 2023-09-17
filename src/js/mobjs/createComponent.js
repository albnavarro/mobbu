import { UNSET } from './constant';

let defaultComponent = {
    isolateCreation: false,
    isolateOnMount: false,
    scoped: false,
    maxParseIteration: 5000,
    customTraversal: false,
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
 * @param {Boolean} [ obj.customTraversal ] - Use a custom selectorAll with different traversal algorithms
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
 * @param {function({'context':Object}):void} [ obj.constructorCallback ] -
 * @param {function({'context':Object,'data':Object}):void} [ obj.connectedCallback ] -
 * @param {function({'context':Object,'data':Object}):void} [ obj.disconnectedCallback ] -
 * @param {function({'context':Object,'data':Object}):void} [ obj.adoptedCallback ] -
 * @param {function({ 'name':String,'oldValue':String,'newValue':String,'context':Object, 'data':Object }):void} [ obj.attributeChangedCallback ] -
 * @param {Array<String>} [ obj.attributeToObserve ] -
 * @param {Style} [ obj.style ] -
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
    constructorCallback = () => {},
    connectedCallback = () => {},
    disconnectedCallback = () => {},
    adoptedCallback = () => {},
    attributeToObserve = [],
    attributeChangedCallback = () => {},
    style = '',
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
                constructorCallback,
                connectedCallback,
                disconnectedCallback,
                adoptedCallback,
                attributeToObserve,
                attributeChangedCallback,
                styleSlot: style,
            },
        },
    };
};
