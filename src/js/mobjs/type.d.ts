// @ts-check

export interface componentType {
    key: String;
    id: String;

    /**
     * @example
     * ```javascript
     *
     * const storeObject = getState();
     * const { myProp } = getState();
     *
     * ```
     */
    getState(): Object;

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
     * //Use spred to return a new data without mutate original
     * setState('myArray', (arr) => [...arr, 1]);
     * setState('myObject', (obj) => ({ ...obj, ...{ prop: <val> }}))
     *
     * // Use a Map and clone original data.
     * setState('mySet', (set) => {
          set.add(<val>)
          return set
       }, true, true);
     *
     * ```
     */
    setState(
        prop: string,
        newValue: any,
        fireCallback?: Boolean,
        clone?: Boolean
    ): void;

    /**
     * @example
     * ```javascript
     *
     * emit('myProp');
     *
     * ```
     */
    emit(prop: string): void;

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
    emitAsync(prop: string): Promise<{ success: boolean }>;

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
    computed(prop: String, keys: [String], callback: Function): void;

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
    watch(prop: String, callback: Function): void;

    /**
     * @description
     * Watch state change and fire one callback after inizialization.
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
    watchSync(prop: String, callback: Function): void;

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
    removeDOM(element: HTMLElement): void;

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
    remove(): void;

    /**
     * @example
     * ```javascript
     *
     * const componentsId = getChildren('MyComponent');
     *
     * ```
     */
    getChildren(componentName: String): Array<String>;

    /**
     * @example
     * ```javascript
     * <MyComponent ${instanceName('my-instance-component')}></MyComponent>
     *
     * ```
     */
    instanceName(name: String): void;

    /**
     * @example
     * ```javascript
     *
     * freezeProp('myStateProp');
     *
     * ```
     */
    freezeProp(prop: String): void;

    /**
     * @example
     * ```javascript
     *
     * unFreezeProp('myStateProp');
     *
     * ```
     */
    unFreezeProp(prop: String): void;

    /**
     * @example
     * ```javascript
     *
     * const parentId = getParentId():
     *
     * ```
     */
    getParentId(): String | undefined;

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
    watchParent(prop: String, callback: Function): void;

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
    staticProps(arg0: { [key: string]: any }): Object;

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
    unBind(): (arg0: { id: String }) => void;

    /**
     * @description
     * Bind props from parent to Children.
     * The watch function must be used inside onMount() function.
     *
     * - `forceParent`:
     *   Basically, the states of the current function are bound. With this option the state(s) of the nearest relative will be observed regardless of the component in which the component is defined, a frequent case with the use of slots.
     *
     * - `Extra props inside repeater:`
     * Return the current value inside a repeater:
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
     *         props: ({ state1, state2 }, { current, index }) => {
     *             return {
     *                 childrenState: myParsedState.
     *             };
     *         },
     *     })}
     * ></MyComponent>
     * ```
     */
    bindProps(arg0: {
        bind: Array<String>;
        forceParent: [Boolean];
        props(arg0: { [key: string]: any }): Object;
    }): Object;

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
    bindEvents(
        arg0:
            | { [key: string]: (arg0: Object) => {} }
            | [{ [key: string]: (arg0: Object) => {} }]
    ): void;

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
    html(DOMContent: String): {
        id: string;
        content: string;
        componentParsed: HTMLElement;
    };

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
     *     return html`<div></div>`;
     * };
     *
     * ```
     */
    onMount(arg0: { element: HTMLElement }): Function;

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
     * - `component`:
     *   The name of the top-level component that is the subject of the list.
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
     *         component: 'MyComponent',
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
     *                    ${sync}
     *                    ${staticProps({
     *                        myState: value,
     *                    })}
     *                    ${bindProps({
     *                        bind: ['my_array_state', 'myState2'],
     *                        props: ({ myState2 }, { current, index }) => {
     *                            return {
     *                                myState2,
     *                                label: current.myValue,
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
    repeat(arg0: {
        /**
         * @description
         * Clean previous item.
         */
        clean: Boolean;

        /**
         * @description
         * Array of object used to create list
         */
        watch: String;

        /**
         * @description
         * Unique key used to track the mutation of each individual component.
         */
        key?: String | undefined;

        /**
         * @description
         * Component used in the dynamic list.
         */
        component: String;

        /**
         * @description
         * Function fired before update
         *
         * @example
         *
         * ${repeat({
         *     beforeUpdate: ({ container, childrenId }) => {
         *         ....
         *     },
         * })}
         */
        beforeUpdate(arg0: {
            /**
             * @description
             * Main component
             */
            element: HTMLElement;

            /**
             * @description
             * List container element.
             */
            container: HTMLElement;

            /**
             * @description
             * Active Childern ids
             */
            childrenId: [string];
        }): void;

        /**
         * @description
         * Function fired after update
         *
         * @example
         *
         * ${repeat({
         *     afterUpdate: ({ container, childrenId }) => {
         *         ....
         *     },
         * })}
         */
        afterUpdate(arg0: {
            /**
             * @description
             * Main component
             */
            element: HTMLElement;

            /**
             * @description
             * List container element.
             */
            container: HTMLElement;

            /**
             * @description
             * New Childern ids
             */
            childrenId: [string];
        }): void;

        /**
         * @description
         * Render child component.
         *
         * * sync props is necessary for traking key and store current and index value.
         *
         * @example
         *
         * ```javascript
         *
         * <div>
         *     ${repeat({
         *         ...
         *         render: ({ sync, html }) => {
         *            return html`
         *                <my-component
         *                    ${sync}
         *                    ${staticProps({
         *                        myState: value,
         *                    })}
         *                    ${bindProps({
         *                        bind: ['my_array_state', 'myState2'],
         *                        props: ({ myState2 }, { current, index }) => {
         *                            return {
         *                                myState2,
         *                                label: current.myValue,
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
        render: (arg0: {
            sync: Object;
            html: (arg0: String) => String;
        }) => String;
    }): string;
}
