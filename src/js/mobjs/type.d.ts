// https://stackoverflow.com/questions/65668969/event-maps-and-type-guards#answer-65890181

import { mobStoreBaseData } from '../mobCore/store/type';
import { componentFunctionType } from './mainStore/type';
import {
    PartialBindEvents,
    PartialBindProps,
    PartialCompunted,
    PartialDelegateEvents,
    PartialEmit,
    PartialEmitAsync,
    PartialFreezeProp,
    PartialGetChildren,
    PartialGetParentId,
    PartialGetState,
    PartialOnMount,
    PartialRemove,
    PartialRemoveDOM,
    PartialRenderComponent,
    PartialRepeat,
    PartialSetState,
    PartialUnBind,
    PartialUnFreezeProp,
    PartialWatch,
    PartialWatchParent,
} from './tsUtils/mobComponentProps';

export type BindProps<T> = PartialBindProps<T>;
export type DelegateEvents = PartialDelegateEvents;
export type BindEvents = PartialBindEvents;
export type GetState<T> = PartialGetState<T>;
export type SetState<T> = PartialSetState<T>;
export type Emit<T> = PartialEmit<T>;
export type EmitAsync<T> = PartialEmitAsync<T>;
export type Computed<T> = PartialCompunted<T>;
export type Watch<T> = PartialWatch<T>;
export type RemoveDom = PartialRemoveDOM;
export type Remove = PartialRemove;
export type GetChildren = PartialGetChildren;
export type FreezeProp<T> = PartialFreezeProp<T>;
export type UnFreezeProp<T> = PartialUnFreezeProp<T>;
export type GetParentId = PartialGetParentId;
export type WatchParent = PartialWatchParent;
export type UnBind = PartialUnBind;
export type OnMount = PartialOnMount;
export type Repeat<T> = PartialRepeat<T>;
export type RenderComponent = PartialRenderComponent;

/**
 * Main component.
 */
interface MobComponentMap {
    [prop: string]: any;
}

export interface componentReturnType {
    content: string;
}

export type mobComponent<T = MobComponentMap> = (
    props: componentPropsType<T>
) => string;

export interface componentPropsType<T> {
    key: string;
    id: string;

    /**
     * @example
     * ```javascript
     *
     * const storeObject = getState();
     * const { myProp } = getState();
     *
     * ```
     */
    getState: GetState<T>;

    /**
     * @example
     * ```javascript
     *
     * //Direct value:
     * setState('myProp', newValue, true);
     * setState('myPropObject', { myProp: newValue, ... });
     *
     * //Function that return a value:
     * setState('myProp', (currentValue) => currentValue + 1);
     *
     * //Use spread to return a new data without mutate original
     * setState('myArray', (arr) => [...arr, 1]);
     * setState('myObject', (obj) => ({ ...obj, ...{ prop: <val> }}))
     *
     * // Use a Map and clone original data.
     * setState('mySet', (set) => {
     *     set.add(<val>)
     *     return set
     *  }, true, true);
     *
     * ```
     */
    setState: SetState<T>;

    /**
     * @example
     * ```javascript
     *
     * emit('myProp');
     *
     * ```
     */
    emit: Emit<T>;

    /**
     * @example
     * ```javascript
     *
     * // Module1.
     * watch('myProp', async (value) => {
     *     await myAsyncFunction(value);
     * });
     *
     * // Module2.
     * // Set prop without execute related callBack.
     * setState('myProp', value, false);
     *
     * // Fire related async callBack.
     * await emitAsync('myProp');
     *
     * ```
     */
    emitAsync: EmitAsync<T>;

    /**
     *
     * @description
     * Update propierties value if some dependency change.
     * Computed functions are resolved on the nextTick.
     * If multiple dependencies change at the same time, the computed will be resolved only once.
     *
     * @example
     * ```javascript
     *
     * //Prop target is not an object, and dependency is not an object:
     * computed('prop', ['prop1', 'prop2'], (val1, val2) => {
     *     return val1 + val2;
     * });
     *
     * //Prop target is not an object and dependency is an object.
     * computed('prop', ['objectProp'], (obj) => {
     *      return obj.val1 + obj.val2;
     * })
     *
     * //Prop target is an object and dependency is not an object.
     * //When target is on object the result will be mergerd with original object.
     * computed('objectProp', ['prop1', 'prop2'], (val1, val2) => {
     *     return { sum: val1 + val2 };
     * });
     *
     * //Prop target is an object, and dependency is an object.
     * //When target is on object the result will be mergerd with original object.
     * computed('objectProp', ['objectProp1'], (obj) => {
     *     return { sum: obj.val1 + obj.val2 };
     * });
     *
     * ```
     */
    computed: Computed<T>;

    /**
     * @description
     * Watch state change.
     *
     * @example
     * ```javascript
     *
     * const unsubscribe =  watch('myprop', (newval, oldval, validate) => {
     *      // code
     * })
     * unsubscribe();
     *
     * ```
     *
     */
    watch: Watch<T>;

    /**
     * @description
     * Watch state change and fire one callback after initialization.
     *
     * @example
     * ```javascript
     *
     * const unsubscribe =  watchSync('myprop', (newval, oldval, validate) => {
     *      // code
     * })
     * unsubscribe();
     *
     * ```
     *
     */
    watchSync: Watch<T>;

    /**
     * @description
     * Remove and destroy specific DOM element ( not component ).
     * Every time the dom is removed, any reference to any components present within it such as watchers etc... will be removed from the map.
     *
     * @example
     * ```javascript
     *
     * removeDOM(myHTMLElement)
     *
     * ```
     */
    removeDOM: RemoveDom;

    /**
     * @description
     * Remove and destroy component.
     *
     * @example
     * ```javascript
     *
     * remove()
     *
     * ```
     */
    remove: Remove;

    /**
     * @example
     * ```javascript
     *
     * const componentsId = getChildren('MyComponent');
     *
     * ```
     */
    getChildren: GetChildren;

    /**
     * @example
     * ```javascript
     *
     * freezeProp('myStateProp');
     *
     * ```
     */
    freezeProp: FreezeProp<T>;

    /**
     * @example
     * ```javascript
     *
     * unFreezeProp('myStateProp');
     *
     * ```
     */
    unFreezeProp: UnFreezeProp<T>;

    /**
     * @example
     * ```javascript
     *
     * const parentId = getParentId():
     *
     * ```
     */
    getParentId: GetParentId;

    /**
     * @example
     * ```javascript
     *
     * const unsubscribe =  watchParent('myprop', (newval, oldval, validate) => {
     *      // code
     * })
     * unsubscribe();
     *
     * ```
     */
    watchParent: WatchParent;

    /**
     *
     * @description
     * Non-reactive props.
     *
     * - `Slot`
     *  It is possible to combine this utility directly with a slot, the bindings will then be used by the component that will be hosted.
     *
     * @example
     * ```javascript
     * <MyComponent
     *     ${staticProps({
     *         childState1: key,
     *         callBack: () => setState('parentState', key)
     *     })}
     * ></MyComponent>
     * ```
     */
    staticProps(arg0: { [key: string]: any }): string;

    /**
     * @example
     * ```javascript
     * unBind()
     * ```
     *
     * @description
     * Detach binbProps.
     * Note: The function will be active as soon as the whole route is rendered.
     */
    unBind: UnBind;

    /**
     * @description
     * Bind props from parent to Children.
     * The watch function must be used inside onMount() function.
     *
     * - `forceParent`:
     *   Basically, the states of the current function are bound. With this option the state(s) of the nearest relative will be observed regardless of the component in which the component is defined, a frequent case with the use of slots.
     *   Default value is false.
     *
     * - `Extra props inside repeater:`
     * `_current` and `_index` they return the updated value corresponding to the current element of the observed array.
     * Correspond to `myArray.map((_current, _index) => { ... })`.
     *
     *
     * - `Slot`
     *  It is possible to combine this utility directly with a slot, the bindings will then be used by the component that will be hosted.
     *
     *
     * @example
     * ```javascript
     * <MyComponent
     *     ${bindProps({
     *         bind: ['state1','state2'],
     *         forceParent: false,
     *         props: ({ state1, state2, _current, _index }) => {
     *             return {
     *                 <state>: ...
     *                 <state>: ...
     *             };
     *         },
     *     })}
     * ></MyComponent>
     * ```
     */
    bindProps: BindProps<T>;
    // bindProps(arg0: {
    //     bind: Array<T>;
    //     forceParent: [boolean];
    //     props(arg0: { [key: T]: any }): object;
    // }): string;

    /**
     * @description
     * Bind event to component.
     * It is possible use an array to bind multiple event.
     *
     * - `Extra props inside repeater:`
     * Return the current value inside a repeater:
     *
     * - `Slot`
     *  It is possible to combine this utility directly with a slot, the bindings will then be used by the component that will be hosted.
     *
     * @example
     * ```javascript
     * <MyComponent
     *       ${bindEvents({
     *            click: (e, {current, index}) => myFunction(e)
     *       })}
     * ></MyComponent>
     *
     * <MyComponent
     *       ${bindEvents([
     *           {
     *               click: (e, {current, index}) => myFunction(e)
     *           },
     *           {
     *               mousedown: (e, {current, index}) => myFunction(e)
     *           },
     *       ])}
     * ></MyComponent>
     * ```
     */
    bindEvents: BindEvents;

    /**
     * @description
     * Delegate event.
     * Event is associaed to document.
     * If target of event is the dom element, the callBack will be fired.
     * It is possible use an array to bind multiple event.
     *
     * - `Extra props inside repeater:`
     * Return the current value inside a repeater:
     *
     * - `Slot`
     *  It is possible to combine this utility directly with a slot, the bindings will then be used by the component that will be hosted.
     *
     * @example
     * ```javascript
     * <MyComponent
     *       ${delegateEvents({
     *            click: (e, {current, index}) => myFunction(e)
     *       })}
     * ></MyComponent>
     *
     * <MyComponent
     *       ${delegateEvents([
     *           {
     *               click: (e, {current, index}) => myFunction(e)
     *           },
     *           {
     *               mousedown: (e, {current, index}) => myFunction(e)
     *           },
     *       ])}
     * ></MyComponent>
     * ```
     */
    delegateEvents: DelegateEvents;

    /**
     *
     * @description
     * DOM
     *
     * @example
     * ```javascript
     *
     * export const MyComponent = ({  html }) => {
     *     return html`<div></div>`;
     * };
     *
     * ```
     */
    html(string: TemplateStringsArray, ...values: any[]): string;

    /**
     *
     * @description
     * Function fired on mount.
     * Return destroy function.
     *
     * @example
     * ```javascript
     *
     * export const MyComponent = ({ onMount, html }) => {
     *     onMount(({ element, refs, ref }) => {
     *         const { myRef } = refs;
     *
     *         return () => {}
     *     });
     *
     *     return html`
     *       <div>
     *          <div ref='myRef'></div>
     *       </div>
     *     `;
     * };
     *
     * ```
     */
    onMount: OnMount;

    /**
     * @description
     * The repeater utility accepts a simple array or an array of objects. An object array is necessary to be able to use a unique key to track the location of persistent elements.
     *
     *
     * Note:
     * If the same state with the data array is used in the same component several times but one with key and others not, use two different states, otherwise you may have unwanted effects (all repeaters act only in the same state but the same one risks being changed in different ways)
     *
     * Propierties:
     * - `watch`:
     *   Reactive data base from compo state.
     *
     * - `key`:
     *   Optional key to use if you are using an array of objects.
     *
     * - `clean`:
     *   Removes all previous instances each time the monitored state is updated.
     *
     * - `beforeUpdate`:
     *   Event triggered before list update.
     *
     * - `afterUpdate`:
     *   Event triggered after list update.
     *
     * - `render`:
     *   Function that returns the dom of each item. within the new retaken DOM it will be possible to use standard utilities such as staticProps/bindProps/bindEvent ...
     *
     *
     * @example
     *
     * ```javascript
     *
     * <div>
     *     ${repeat({
     *         clean: false,
     *         watch: 'my_array_state',
     *         key: 'my_object_unique_key',
     *         beforeUpdate: ({ element, container, childrenId }) => {
     *             ....
     *         },
     *         afterUpdate: ({ element, container, childrenId }) => {
     *             ....
     *         },
     *         render: ({ sync, html }) => {
     *            return html`
     *                <my-component
     *                    ${sync} !important
     *                    ${staticProps({
     *                        myState: value,
     *                    })}
     *                    ${bindProps({
     *                        bind: ['my_array_state', 'myState2'],
     *                        props: ({ myState2, _current, _index }) => {
     *                            return {
     *                                myState2,
     *                                label: _current.myValue,
     *                                index,
     *                            };
     *                        },
     *                    })}
     *                    ${bindEvents({
     *                        mousedown: (_e, { current, index }) =>
     *                            //
     *                    })}
     *                >
     *                </my-component>
     *            `
     *         }
     *     })}
     * </div>
     *
     * ```
     */
    repeat: Repeat<T>;

    /**
     * @description
     * Internal use.
     */
    bindEventsId: string | undefined;

    /**
     * @description
     * Internal use.
     * List if repeater id inside a single component
     */
    repeatIdArray: string[];

    /**
     * @description
     * Parse node with component to render.
     * The function receives as an argument the root element to be parsed, if no element is supplied the root of the component will be used.
     */
    renderComponent: RenderComponent;
}

interface webComponentParmas {
    componentId: string;
    emit(prop: string): void;
    emitAsync(prop: string): Promise<{ success: boolean }>;
    freezeProp(prop: string): void;
    getChildren(componentName: string): Array<string>;
    getParentId(): string | undefined;
    getState(arg0: string): any;
    remove: () => void;
    setState(
        prop: string,
        newValue: any,
        fireCallback?: boolean,
        clone?: boolean
    ): void;
    unBind: (arg0: { id: string }) => void;
    unFreezeProp(prop: string): void;
    watch(prop: string, callback: () => void): void;
    watchSync(prop: string, callback: () => void): void;
    watchParent(prop: string, callback: () => void): void;
}

export interface componentParsedType {
    exportState?: string[];

    /**
     * @description
     * Fire onMount callback immediately, normally onMount is fired at the end of current parse.
     * This means that if `scoped:true` every querySelector fired inside onMount function is scoped inside current component, but has no effect to child component.
     * `default = false`.
     */
    scoped?: boolean;
    constructorCallback?: (arg0: { context: object }) => void;
    connectedCallback?: (arg0: {
        context: object;
        data: webComponentParmas;
    }) => void;
    disconnectedCallback?: (arg0: {
        context: object;
        data: webComponentParmas;
    }) => void;
    adoptedCallback?: (arg0: {
        context: object;
        data: webComponentParmas;
    }) => void;
    attributeChangedCallback?: (arg0: {
        name: string;
        oldValue: string;
        newValue: string;
        context: object;
        data: webComponentParmas;
    }) => void;
    attributeToObserve?: string[];
    style?: string;
    state?: mobStoreBaseData;
    child?: {
        [key: string]: {
            componentFunction: import('./mainStore/type').componentFunctionType;
            componentParams: import('./type').componentParsedType;
        };
    }[];
}

export interface createComponentType extends componentParsedType {
    name: string;
    component: componentFunctionType;
}

export interface createComponentReturnType {
    [key: string]: {
        componentFunction: import('./mainStore/type').componentFunctionType;
        componentParams: import('./type').componentParsedType;
    };
}

export interface defaultComponent {
    /**
     * @description
     * Add DOM element in a dedicated request animation Frame.
     * - If is settled to `false` use a request animation frame to apply class/style inside onMount function ( to have css transition working ).
     * `default = false`.
     */
    isolateCreation?: boolean;

    /**
     * @description
     * Fire onMount callback immediately, normally onMount is fired at the end of current parse.
     * This means that if `scoped:true` every querySelector fired inside onMount function is scoped inside current component, but has no effect to child component.
     * `default = false`.
     */
    scoped?: boolean;

    /**
     * @description
     * DOM creation use a recursive function, this value mimit the number of iteration.
     * - Prevent infinite loop, in case of error or wrong component incapsulation
     */
    maxParseIteration?: number;

    /**
     * Add data-mobjs="<id>" to each component
     */
    debug?: boolean;
}

export type beforePageTransition = (arg0: {
    oldNode: HTMLElement;
    oldRoute: string;
    newRoute: string;
}) => Promise<any>;

export type pageTransition = (arg0: {
    oldNode: HTMLElement | Node;
    newNode: HTMLElement | Node;
    oldRoute: string;
    newRoute: string;
}) => Promise<any>;

export interface routeType {
    name: string;
    layout:
        | ((arg0: { params: any; props: any }) => Promise<string>)
        | ((arg0: { params: any; props: any }) => string);
    props: any;
}

export interface inizializeApp {
    rootId: string;
    wrapper: () => Promise<any>;
    contentId: string;
    routes: routeType[];
    afterInit: () => void;
    index: string;
    pageNotFound: string;
    beforePageTransition?: beforePageTransition;
    pageTransition?: pageTransition;
    restoreScroll?: boolean;
}
