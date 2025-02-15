//@ts-check

import { mobCore } from '../../mobCore';
import {
    ATTR_BIND_EVENTS,
    ATTR_BIND_REFS_ID,
    ATTR_BIND_REFS_NAME,
    ATTR_CHILD_REPEATID,
    ATTR_CURRENT_LIST_VALUE,
    ATTR_DYNAMIC,
    ATTR_INSTANCENAME,
    ATTR_KEY,
    ATTR_PARENT_ID,
    ATTR_PROPS,
    ATTR_REPEATER_PROP_BIND,
    ATTR_SLOT,
    ATTR_WEAK_BIND_EVENTS,
} from '../constant';
import { useQuery } from '../parse/useQuery';
import {
    addUserPlaceholder,
    getSkipAddUserComponent,
    removeUserPlaceholder,
} from '../modules/userComponent';

/**
 * @param {{[key:string]:import('../mainStore/type').componentListMapType}} componentList
 */
export const defineUserComponent = (componentList) => {
    Object.entries(componentList).forEach(([key, value]) => {
        const {
            constructorCallback: _constructorCallback,
            connectedCallback: _connectedCallBack,
            disconnectedCallback: _disconnectedCallback,
            adoptedCallback: _adoptedCallback,
            attributeChangedCallback: _attributeChangedCallback,
            style,
            attributeToObserve,
        } = value.componentParams;

        customElements.define(
            key,
            class extends HTMLElement {
                /**
                 * @type {string}
                 */
                #componentname;

                /**
                 * @type {string}
                 */
                #componentId;

                /**
                 * @type {(prop: string) => void}
                 */
                #emit;

                /**
                 * @type {(prop: string) => Promise<{ success: boolean }>}
                 */
                #emitAsync;

                /**
                 * @type {(prop: string) => void}
                 */
                #freezeProp;

                /**
                 * @type {(componentName: string) => Array<string>}
                 */
                #getChildren;

                /**
                 * @type {() => string|undefined}
                 */
                #getParentId;

                /**
                 * @type {(arg0: string) => any}
                 */
                #getState;

                /**
                 * @type {() => void}
                 */
                #remove;

                /**
                 * @type {( prop: string, newValue: any, options: { emit?: boolean, clone?: boolean } ) => void}
                 */
                #setState;

                /**
                 * @type {(arg0: { id: string }) => void}
                 */
                #unBind;

                /**
                 * @type {(prop: string) => void}
                 */
                #unFreezeProp;

                /**
                 * @type {(prop: string, callback: () => void) => void}
                 */
                #watch;

                /**
                 * @type {(prop: string, callback: () => void) => void}
                 */
                #watchParent;

                /**
                 * @type {boolean}
                 */
                #isPlaceholder;

                /**
                 * @type {string|undefined|null}
                 */
                #name;

                /**
                 * @type {string|undefined|null}
                 */
                #staticPropsId;

                /**
                 * @type {string|undefined|null}
                 */
                #dynamicPropsId;

                /**
                 * @type {string|undefined|null}
                 */
                #bindEventsId;

                /**
                 * @type {string}
                 */
                #dynamicPropsFromSlotId;

                /**
                 * @type {string}
                 */
                #propsFromSlotId;

                /**
                 * @type {string|undefined|null}
                 */
                #currentRepeatValueId;

                /**
                 * @type {string|undefined|null}
                 */
                #slotPosition;

                /**
                 * @type {string|undefined|null}
                 */
                #currentKey;

                /**
                 * @type {string|undefined|null}
                 */
                #parentId;

                /**
                 * @type {string|undefined|null}
                 */
                #componentRepeatId;

                /**
                 * @type {string|undefined|null}
                 */
                #delegateEventId;

                /**
                 * @type {string|undefined|null}
                 */
                #repeatPropBind;

                /**
                 * @type {string|undefined|null}
                 */
                #bindRefId;

                /**
                 * @type {string|undefined|null}
                 */
                #bindRefName;

                static get observedAttributes() {
                    return attributeToObserve;
                }

                constructor() {
                    super();

                    this.attachShadow({ mode: 'open' });
                    this.active = false;
                    this.#componentId = mobCore.getUnivoqueId();
                    this.#emit = () => {};
                    this.#emitAsync = () => Promise.resolve({ success: true });
                    this.#freezeProp = () => {};
                    this.#freezeProp = () => {};
                    this.#getChildren = () => [''];
                    this.#getParentId = () => '';
                    this.#getState = () => {};
                    this.#remove = () => {};
                    this.#setState = () => {};
                    this.#unBind = () => {};
                    this.#unFreezeProp = () => {};
                    this.#watch = () => {};
                    this.#watchParent = () => {};
                    this.#componentname = key;

                    // Default symbols without attribute
                    this.#isPlaceholder = true;
                    this.isUserComponent = true;
                    this.#dynamicPropsFromSlotId = '';
                    this.#propsFromSlotId = '';

                    /** host exist */
                    const host = this.shadowRoot?.host;
                    if (!host) return;

                    /**
                     * When fragment to repeater item is created to add attribute
                     * skip
                     */
                    const skip = getSkipAddUserComponent();
                    if (skip) return;

                    /** Get all attribute */
                    [
                        this.#name,
                        this.#staticPropsId,
                        this.#dynamicPropsId,
                        this.#currentKey,
                        this.#bindEventsId,
                        this.#currentRepeatValueId,
                        this.#slotPosition,
                        this.#parentId,
                        this.#componentRepeatId,
                        this.#delegateEventId,
                        this.#repeatPropBind,
                        this.#bindRefId,
                        this.#bindRefName,
                    ] = [
                        ATTR_INSTANCENAME,
                        ATTR_PROPS,
                        ATTR_DYNAMIC,
                        ATTR_KEY,
                        ATTR_BIND_EVENTS,
                        ATTR_CURRENT_LIST_VALUE,
                        ATTR_SLOT,
                        ATTR_PARENT_ID,
                        ATTR_CHILD_REPEATID,
                        ATTR_WEAK_BIND_EVENTS,
                        ATTR_REPEATER_PROP_BIND,
                        ATTR_BIND_REFS_ID,
                        ATTR_BIND_REFS_NAME,
                    ].map((attribute) => host.getAttribute(attribute) ?? '');

                    /**
                     * Placeholder element that will move to slot.
                     * Add visibility hidden to avoid visiual jump before and after the sobstituition.
                     */
                    if (this.#slotPosition && !this.active) {
                        this.style.visibility = 'hidden';
                    }

                    /** Check for shadow root */
                    if (!this.shadowRoot) return;

                    /** Append customs style */
                    if (style) {
                        const styleTag = document.createElement('style');
                        styleTag.textContent = style;
                        this.shadowRoot.append(styleTag);
                    }

                    /** Slot content is accessible by external javascript. */
                    const slot = document.createElement('slot');
                    this.shadowRoot.append(slot);

                    _constructorCallback?.({
                        context: this,
                    });
                }

                getComponentName() {
                    return this.#componentname;
                }

                /**
                 * @param { string } value
                 */
                setId(value) {
                    this.#componentId = value;
                }

                getId() {
                    return this.#componentId;
                }

                getParentId() {
                    return this.#parentId;
                }

                /**
                 * @param { string } id
                 */
                setParentId(id) {
                    this.#parentId = id;
                }

                getIsPlaceholder() {
                    return this.#isPlaceholder;
                }

                getInstanceName() {
                    return this.#name;
                }

                getStaticPropsId() {
                    return this.#staticPropsId;
                }

                getDynamicPropsid() {
                    return this.#dynamicPropsId;
                }

                getBindEventsId() {
                    return this.#bindEventsId;
                }

                getCurrentKey() {
                    return this.#currentKey;
                }

                /**
                 * @param {string} value
                 */
                setDynamicPropsFromSlotId(value) {
                    this.#dynamicPropsFromSlotId = value;
                }

                getDynamicPropsFromSlotId() {
                    return this.#dynamicPropsFromSlotId;
                }

                /**
                 * @param {string} value
                 */
                setPropsFromSlotId(value) {
                    this.#propsFromSlotId = value;
                }

                getPropsFromSlotId() {
                    return this.#propsFromSlotId;
                }

                /**
                 * @param {any} value
                 */
                setRepeatValue(value) {
                    this.#currentRepeatValueId = value;
                }

                getRepeatValue() {
                    return this.#currentRepeatValueId;
                }

                getSlotPosition() {
                    return this.#slotPosition;
                }

                getDelegateEventId() {
                    return this.#delegateEventId;
                }

                getRepeaterPropBind() {
                    return this.#repeatPropBind ?? undefined;
                }

                /**
                 * @param {string} value
                 */
                setRepeaterPropBind(value) {
                    this.#repeatPropBind = value;
                }

                getComponentRepeatId() {
                    return this.#componentRepeatId;
                }

                getBindRefId() {
                    return this.#bindRefId;
                }

                getBindRefName() {
                    return this.#bindRefName;
                }

                #getData() {
                    return {
                        componentId: this.#componentId,
                        emit: this.#emit,
                        emitAsync: this.#emitAsync,
                        freezeProp: this.#freezeProp,
                        getChildren: this.#getChildren,
                        getParentId: this.#getParentId,
                        getState: this.#getState,
                        remove: this.#remove,
                        setState: this.#setState,
                        unBind: this.#unBind,
                        unFreezeProp: this.#unFreezeProp,
                        watch: this.#watch,
                        watchParent: this.#watchParent,
                    };
                }

                resetData() {
                    this.active = false;
                    this.#componentId = '';
                    this.#emit = () => {};
                    this.#emitAsync = () => Promise.resolve({ success: true });
                    this.#freezeProp = () => {};
                    this.#getChildren = () => [''];
                    this.#getParentId = () => '';
                    this.#getState = () => {};
                    this.#remove = () => {};
                    this.#setState = () => {};
                    this.#unBind = () => {};
                    this.#unFreezeProp = () => {};
                    this.#watch = () => {};
                    this.#watchParent = () => {};
                }

                /**
                 * @param {import('../type').componentPropsType<import('../type').MobComponentMap,import('../type').MobComponentMap>} data
                 */
                inizializeCustomComponent(data) {
                    if (this.active) return;

                    this.active = true;
                    this.#componentId = data.id;
                    this.#emit = data.emit;
                    this.#emitAsync = data.emitAsync;
                    this.#freezeProp = data.freezeProp;
                    this.#getChildren = data.getChildren;
                    this.#getParentId = data.getParentId;
                    this.#getState = data.getState;
                    this.#remove = data.remove;
                    this.#setState = data.setState;
                    this.#unBind = data.unBind;
                    this.#unFreezeProp = data.unFreezeProp;
                    this.#watch = data.watch;
                    this.#watchParent = data.watchParent;
                    this.#isPlaceholder = false;

                    // First connected callback when web-compoennt is initialzied
                    _connectedCallBack?.({
                        context: this,
                        data: this.#getData(),
                    });
                }

                connectedCallback() {
                    /**
                     * When fragment to repeater item is created to add attribute
                     * skip
                     */
                    const skip = getSkipAddUserComponent();
                    if (skip) return;

                    if (this.#isPlaceholder) {
                        const host = this.shadowRoot?.host;

                        // @ts-ignore
                        if (!useQuery) addUserPlaceholder(host);
                        return;
                    }

                    // Classic lifecycle of web component
                    _connectedCallBack?.({
                        context: this,
                        data: this.#getData(),
                    });
                }

                disconnectedCallback() {
                    if (!this.shadowRoot) return;

                    if (!useQuery) {
                        const host = this.shadowRoot?.host;
                        // @ts-ignore
                        removeUserPlaceholder(host);
                    }

                    if (!this.active) return;

                    _disconnectedCallback?.({
                        context: this,
                        data: this.#getData(),
                    });

                    this.resetData();
                }

                removeCustomComponent() {
                    if (!this.shadowRoot || !this.active) return;

                    // eslint-disable-next-line unicorn/prefer-dom-node-remove
                    this.parentElement?.removeChild(this);
                }

                adoptedCallback() {
                    if (!this.shadowRoot || !this.active) return;

                    _adoptedCallback?.({
                        context: this,
                        data: this.#getData(),
                    });
                }

                /**
                 * @param {string} name
                 * @param {any} oldValue
                 * @param {any} newValue
                 */
                attributeChangedCallback(name, oldValue, newValue) {
                    if (!this.shadowRoot || !this.active) return;

                    /**
                     * Fire custom attribute change ( not id )
                     */
                    _attributeChangedCallback?.({
                        name,
                        oldValue,
                        newValue,
                        context: this,
                        data: this.#getData(),
                    });
                }
            }
        );
    });
};
