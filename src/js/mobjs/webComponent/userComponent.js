import {
    ATTR_BIND_EVENTS_PARTIAL,
    ATTR_CURRENT_LIST_VALUE_PARTIAL,
    ATTR_DYNAMIC_PARTIAL,
    ATTR_INSTANCENAME_PARTIAL,
    ATTR_PROPS_PARTIAL,
} from '../constant';

export const defineUserComponent = (componentList) => {
    Object.entries(componentList).forEach(([key, value]) => {
        const {
            constructorCallback: _constructorCallback,
            connectedCallback: _connectedCallBack,
            disconnectedCallback: _disconnectedCallback,
            adoptedCallback: _adoptedCallback,
            attributeChangedCallback: _attributeChangedCallback,
            styleSlot,
            attributeToObserve,
        } = value.componentParams;

        customElements.define(
            key,
            class extends HTMLElement {
                /**
                 * @type {String}
                 */
                #componentId;

                /**
                 * @type {Function}
                 */
                #emit;

                /**
                 * @type {Function}
                 */
                #emitAsync;

                /**
                 * @type {Function}
                 */
                #freezeProp;

                /**
                 * @type {Function}
                 */
                #getChildren;

                /**
                 * @type {Function}
                 */
                #getParentId;

                /**
                 * @type {Function}
                 */
                #getState;

                /**
                 * @type {Function}
                 */
                #remove;

                /**
                 * @type {Function}
                 */
                #setState;

                /**
                 * @type {Function}
                 */
                #unBind;

                /**
                 * @type {Function}
                 */
                #unFreezeProp;

                /**
                 * @type {Function}
                 */
                #watch;

                /**
                 * @type {Function}
                 */
                #watchSync;

                /**
                 * @type {Function}
                 */
                #watchParent;

                /**
                 * @type {Boolean}
                 */
                #isPlaceholder;

                /**
                 * @type {String}
                 */
                #instanceName;

                /**
                 * @type {String}
                 */
                #staticPropsId;

                /**
                 * @type {String}
                 */
                #dynamicPropsId;

                /**
                 * @type {String}
                 */
                #bindEventsId;

                /**
                 * @type {String}
                 */
                #dynamicPropsFromSlotId;

                /**
                 * @type {String}
                 */
                #propsFromSlotId;

                /**
                 * @type {String}
                 */
                #currentListValueId;

                /**
                 * @type {String}
                 */
                #slotPosition;

                static get observedAttributes() {
                    return attributeToObserve;
                }

                constructor() {
                    super();
                    this.attachShadow({ mode: 'open' });
                    this.active = false;
                    this.#componentId = '';
                    this.#emit = () => {};
                    this.#emitAsync = () => {};
                    this.#freezeProp = () => {};
                    this.#freezeProp = () => {};
                    this.#getChildren = () => {};
                    this.#getParentId = () => {};
                    this.#getState = () => {};
                    this.#remove = () => {};
                    this.#setState = () => {};
                    this.#unBind = () => {};
                    this.#unFreezeProp = () => {};
                    this.#watch = () => {};
                    this.#watchSync = () => {};
                    this.#watchParent = () => {};

                    //
                    this.#isPlaceholder = true;
                    this.#instanceName = '';
                    this.#staticPropsId = '';
                    this.#dynamicPropsId = '';
                    this.#bindEventsId = '';
                    this.#dynamicPropsFromSlotId = '';
                    this.#propsFromSlotId = '';
                    this.#currentListValueId = '';
                    this.#slotPosition = '';

                    //
                    this.isUserComponent = true;

                    // @ts-ignore
                    const { dataset } = this.shadowRoot?.host ?? {};

                    if (dataset) {
                        this.#instanceName =
                            dataset?.[ATTR_INSTANCENAME_PARTIAL] ?? '';
                        this.#staticPropsId =
                            dataset?.[ATTR_PROPS_PARTIAL] ?? '';
                        this.#dynamicPropsId =
                            dataset?.[ATTR_DYNAMIC_PARTIAL] ?? '';
                        this.#bindEventsId =
                            dataset?.[ATTR_BIND_EVENTS_PARTIAL] ?? '';
                        this.#currentListValueId =
                            dataset?.[ATTR_CURRENT_LIST_VALUE_PARTIAL] ?? '';
                        this.#slotPosition =
                            this.shadowRoot?.host.getAttribute('slot');
                    }

                    if (this.shadowRoot) {
                        const style = document.createElement('style');
                        style.textContent = styleSlot;
                        this.shadowRoot.append(style);

                        /**
                         * Slot content is accessible by external javascript.
                         */
                        const slot = document.createElement('slot');
                        this.shadowRoot.append(slot);

                        _constructorCallback({
                            context: this,
                        });
                    }
                }

                /**
                 * @param { String } value
                 */
                setId(value) {
                    this.#componentId = value;
                }

                getId() {
                    return this.#componentId;
                }

                getIsPlaceholder() {
                    return this.#isPlaceholder;
                }

                getInstanceName() {
                    return this.#instanceName;
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

                /**
                 * @param {String} value
                 */
                setDynamicPropsFromSlotId(value) {
                    this.#dynamicPropsFromSlotId = value;
                }

                getDynamicPropsFromSlotId() {
                    return this.#dynamicPropsFromSlotId;
                }

                /**
                 * @param {String} value
                 */
                setPropsFromSlotId(value) {
                    this.#propsFromSlotId = value;
                }

                getPropsFromSlotId() {
                    return this.#propsFromSlotId;
                }

                getCurrentListValueId() {
                    return this.#currentListValueId;
                }

                getSlotPosition() {
                    return this.#slotPosition;
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
                        watchSync: this.#watchSync,
                        watchParent: this.#watchParent,
                    };
                }

                resetData() {
                    this.active = false;
                    this.#componentId = '';
                    this.#emit = () => {};
                    this.#emitAsync = () => {};
                    this.#freezeProp = () => {};
                    this.#getChildren = () => {};
                    this.#getParentId = () => {};
                    this.#getState = () => {};
                    this.#remove = () => {};
                    this.#setState = () => {};
                    this.#unBind = () => {};
                    this.#unFreezeProp = () => {};
                    this.#watch = () => {};
                    this.#watchSync = () => {};
                    this.#watchParent = () => {};
                }

                /**
                 * @param {Object} data
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
                    this.#watchSync = data.watchSync;
                    this.#watchParent = data.watchParent;

                    _connectedCallBack({
                        context: this,
                        data: this.#getData(),
                    });

                    this.#isPlaceholder = false;
                }

                disconnectedCallback() {
                    if (!this.shadowRoot || !this.active) return;

                    _disconnectedCallback({
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

                    _adoptedCallback({
                        context: this,
                        data: this.#getData(),
                    });
                }

                /**
                 * @param {String} name
                 * @param {any} oldValue
                 * @param {any} newValue
                 */
                attributeChangedCallback(name, oldValue, newValue) {
                    if (!this.shadowRoot || !this.active) return;

                    /**
                     * Fire custom attribute change ( not id )
                     */
                    _attributeChangedCallback({
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
