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
    PartialInvalidateComponent,
    PartialRepeat,
    PartialOnMount,
    PartialRemove,
    PartialRemoveDOM,
    PartialRenderComponent,
    PartialRepeat,
    PartialSetState,
    PartialSetStateByName,
    PartialStaticProps,
    PartialUnBind,
    PartialUnFreezeProp,
    PartialWatch,
    PartialWatchParent,
    PartialMethods,
    PartialUpdateState,
    PartialUpdateStateByName,
    PartialSetRef,
    PartialGetRef,
    PartialGetRefs,
    PartialBindText,
    PartialReturnBindProps,
    PartialUseMethodByName,
} from './tsUtils/mobComponentProps';

export type BindProps<T, R = MobComponentMap> = PartialBindProps<T, R>;
export type DelegateEvents = PartialDelegateEvents;
export type BindEvents = PartialBindEvents;
export type GetState<T> = PartialGetState<T>;
export type SetState<T> = PartialSetState<T>;
export type UpdateState<T> = PartialUpdateState<T>;
export type Emit<T> = PartialEmit<T>;
export type EmitAsync<T> = PartialEmitAsync<T>;
export type Computed<T> = PartialCompunted<T>;
export type ComputedSync<T> = PartialCompunted<T>;
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
export type Invalidate<T> = PartialInvalidateComponent<T>;
export type StaticProps<R = MobComponentMap> = PartialStaticProps<R>;
export type SetStateByName<T> = PartialSetStateByName<T>;
export type UpdateStateByName<T> = PartialUpdateStateByName<T>;
export type Methods<T> = PartialMethods<T>;
export type SetRef = PartialSetRef;
export type GetRef = PartialGetRef;
export type GetRefs = PartialGetRefs;
export type Bindtext = PartialBindText;
export type ReturnBindProps<T> = PartialReturnBindProps<T>;
export type UseMethodByName<T = { methods: any }> = PartialUseMethodByName<T>;
export type UseMethodArrayByName<T = { methods: any }> =
    PartialUseMethodByName<T>[];

/**
 * Main component.
 */
type MobComponentMap = Record<string, any>;

export interface componentReturnType {
    content: string;
}

export type MobComponent<T = MobComponentMap, R = MobComponentMap> = (
    props: componentPropsType<T, R>
) => string;

export type MobComponentAsync<T = MobComponentMap, R = MobComponentMap> = (
    props: componentPropsType<T, R>
) => Promise<string>;

export interface componentPropsType<T, R> {
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
     * Direct value:
     * setState('myProp', newValue, true);
     * setState('myPropObject', { myProp: newValue, ... });
     *
     *  Use a Map and clone original data.
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
     * Function that return a value:
     * setState('myProp', (currentValue) => currentValue + 1);
     *
     * Use spread to return a new data without mutate original
     * setState('myObject', (obj) => ({ ...obj, ...{ prop: <val> }}))
     * ```
     */
    updateState: UpdateState<T>;

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
     * computed('prop', ['prop1', 'prop2'], (val1, val2) => {
     *     return val1 + val2;
     * });
     *
     * computed('prop', ['objectProp'], (obj) => {
     *      return obj.val1 + obj.val2;
     * })
     *
     * computed('objectProp', ['prop1', 'prop2'], (val1, val2) => {
     *     return { sum: val1 + val2 };
     * });
     *
     * computed('objectProp', ['objectProp1'], (obj) => {
     *     return { sum: obj.val1 + obj.val2 };
     * });
     *
     * ```
     */
    computed: Computed<T>;

    /**
     *
     * @description
     * Update propierties value if some dependency change.
     * Computed functions are resolved on the nextTick.
     * If multiple dependencies change at the same time, the computed will be resolved only once.
     * computedSync is executed once before there is a dependency mutation
     *
     * @example
     * ```javascript
     *
     * computed('prop', ['prop1', 'prop2'], (val1, val2) => {
     *     return val1 + val2;
     * });
     *
     * computed('prop', ['objectProp'], (obj) => {
     *      return obj.val1 + obj.val2;
     * })
     *
     * computed('objectProp', ['prop1', 'prop2'], (val1, val2) => {
     *     return { sum: val1 + val2 };
     * });
     *
     * computed('objectProp', ['objectProp1'], (obj) => {
     *     return { sum: obj.val1 + obj.val2 };
     * });
     *
     * ```
     */
    computedSync: ComputedSync<T>;

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
    staticProps: StaticProps<R>;

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
     * `index` position of element inside array.
     * Correspond to `myArray.map((_current, index) => { ... })`.
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
     *         props: ({ state1, state2 }, index) => {
     *             return {
     *                 <state>: ...
     *                 <state>: ...
     *             };
     *         },
     *     })}
     * ></MyComponent>
     * ```
     */
    bindProps: BindProps<T, R>;
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
     *            click: (e, index) => myFunction(e)
     *       })}
     * ></MyComponent>
     *
     * <MyComponent
     *       ${bindEvents([
     *           {
     *               click: (e, index) => myFunction(e)
     *           },
     *           {
     *               mousedown: (e, index) => myFunction(e)
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
     *            click: (e, index) => myFunction(e)
     *       })}
     * ></MyComponent>
     *
     * <MyComponent
     *       ${delegateEvents([
     *           {
     *               click: (e, index) => myFunction(e)
     *           },
     *           {
     *               mousedown: (e, index) => myFunction(e)
     *           },
     *       ])}
     * ></MyComponent>
     * ```
     */
    delegateEvents: DelegateEvents;

    /**
     * @description
     * Add method to current instance component;
     *
     *
     * @example
     * ```javascript
     * export const MyComponent = ({ html, addMethod }) => {
     *     addMethod('myMethod', (val) => {
     *         console.log(val)
     *     })
     *
     *     return html`<div></div>`;
     * };
     * ```
     */
    addMethod: PartialMethods<T>;

    /**
     * @description
     * Add method to current instance component;
     *
     *
     * @example
     * ```javascript
     * export const MyComponent = ({ html, addMethod }) => {
     *     return html`<div ${setRef('myRef')}></div>`;
     * };
     * ```
     */
    setRef: PartialSetRef;

    /**
     * @description
     * Add method to current instance component;
     *
     *
     * @example
     * ```javascript
     * export const MyComponent = ({ html, getRef }) => {
     *     onMount(() => {
     *         getRef()?.myRef.classList.add('myClass')
     *
     *         return () => {}
     *     });
     *
     *     return html`<div ${setRef('myRef')}></div>`;
     * };
     * ```
     */
    getRef: PartialGetRef;

    /**
     * @description
     * Add method to current instance component;
     *
     *
     * @example
     * ```javascript
     * export const MyComponent = ({ html, getRef }) => {
     *     onMount(() => {
     *         getRef()?.myRef.forEach((ref) => {
     *             ref.classList.add('myClass')
     *         })
     *
     *         return () => {}
     *     });
     *
     *     return html`
     *         <div ${setRef('myRef')}></div>
     *         <div ${setRef('myRef')}></div>
     *     `;
     * };
     * ```
     */
    getRefs: PartialGetRefs;

    /**
     *
     */
    bindText: PartialBindText;

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
     *     onMount(({ element }) => {
     *         return () => {}
     *     });
     *
     *     return html`
     *       <div>
     *          <div></div>
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
     *                        props: ({ myState2 }, index) => {
     *                        const { my_array_state } = getState();
     *
     *                            return {
     *                                myState2,
     *                                label: my_array_state[index].myValue,
     *                                index,
     *                            };
     *                        },
     *                    })}
     *                    ${bindEvents({
     *                        mousedown: (event, index) =>
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

    /**
     * @description
     * Invalidate component
     */
    invalidate: Invalidate<T>;

    /**
     * @description
     * Debug state function.
     */
    debug: () => void;
}

interface WebComponentParmas {
    componentId: string;
    emit(prop: string): void;
    emitAsync(prop: string): Promise<{ success: boolean }>;
    freezeProp(prop: string): void;
    getChildren(componentName: string): string[];
    getParentId(): string | undefined;
    getState(arg0: string): any;
    remove: () => void;
    setState(
        prop: string,
        newValue: any,
        options?: {
            emit?: boolean;
            clone?: boolean;
        }
    ): void;
    unBind: (arg0: { id: string }) => void;
    unFreezeProp(prop: string): void;
    watch(prop: string, callback: () => void): void;
    watchSync(prop: string, callback: () => void): void;
    watchParent(prop: string, callback: () => void): void;
}

export interface ComponentParsed {
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
        data: WebComponentParmas;
    }) => void;
    disconnectedCallback?: (arg0: {
        context: object;
        data: WebComponentParmas;
    }) => void;
    adoptedCallback?: (arg0: {
        context: object;
        data: WebComponentParmas;
    }) => void;
    attributeChangedCallback?: (arg0: {
        name: string;
        oldValue: string;
        newValue: string;
        context: object;
        data: WebComponentParmas;
    }) => void;
    attributeToObserve?: string[];
    style?: string;
    state?: mobStoreBaseData;
    child?: Record<
        string,
        {
            componentFunction: import('./mainStore/type').componentFunctionType;
            componentParams: import('./type').ComponentParsed;
        }
    >[];
}

export interface CreateComponent extends ComponentParsed {
    name: string;
    component: componentFunctionType;
}

export type CreateComponentReturn = Record<
    string,
    {
        componentFunction: import('./mainStore/type').componentFunctionType;
        componentParams: import('./type').ComponentParsed;
    }
>;

export interface DefaultComponent {
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

export type BeforePageTransition = (arg0: {
    oldNode: HTMLElement;
    oldRoute: string;
    newRoute: string;
    oldTemplateName: string;
    newTemplateName: string;
}) => Promise<any>;

export type PageTransition = (arg0: {
    oldNode: HTMLElement | Node;
    newNode: HTMLElement | Node;
    oldRoute: string;
    newRoute: string;
    oldTemplateName: string;
    newTemplateName: string;
}) => Promise<any>;

export interface Route {
    name: string;
    templateName?: string;
    layout:
        | ((arg0: { params: any; props: any }) => Promise<string>)
        | ((arg0: { params: any; props: any }) => string);
    restoreScroll?: boolean;
    props: any;
}

export interface InizializeApp {
    rootId: string;
    wrapper: () => Promise<any>;
    contentId: string;
    routes: Route[];
    afterInit: () => void;
    index: string;
    pageNotFound: string;
    beforePageTransition?: BeforePageTransition;
    pageTransition?: PageTransition;
    restoreScroll?: boolean;
}
