import {
    ATTR_BIND_EVENTS,
    ATTR_CURRENT_LIST_VALUE,
    ATTR_DYNAMIC,
    ATTR_INSTANCENAME,
    ATTR_KEY,
    ATTR_PARENT_ID,
    ATTR_PROPS,
    ATTR_REPEATID,
} from '../constant';
import { addRepeatTargetComponent } from '../temporaryData/repeaterTargetComponent';

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
                #componentname;

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

                /**
                 * @type {String}
                 */
                #currentKey;

                /**
                 * @type {String}
                 */
                #parentId;

                /**
                 * @type {String}
                 */
                #repeatId;

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
                    this.#componentname = key;

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
                    this.#currentKey = '';
                    this.#parentId = '';
                    this.#repeatId = '';

                    //
                    this.isUserComponent = true;

                    // @ts-ignore
                    const { dataset } = this.shadowRoot?.host ?? {};

                    if (dataset) {
                        this.#instanceName =
                            this.shadowRoot?.host.getAttribute(
                                ATTR_INSTANCENAME
                            );
                        this.#staticPropsId =
                            this.shadowRoot?.host.getAttribute(ATTR_PROPS);
                        this.#dynamicPropsId =
                            this.shadowRoot?.host.getAttribute(ATTR_DYNAMIC);
                        this.#currentKey =
                            this.shadowRoot?.host.getAttribute(ATTR_KEY);
                        this.#bindEventsId =
                            this.shadowRoot?.host.getAttribute(
                                ATTR_BIND_EVENTS
                            );
                        this.#currentListValueId =
                            this.shadowRoot?.host.getAttribute(
                                ATTR_CURRENT_LIST_VALUE
                            );
                        this.#slotPosition =
                            this.shadowRoot?.host.getAttribute('slot');
                        this.#parentId =
                            this.shadowRoot?.host.getAttribute(
                                ATTR_PARENT_ID
                            ) ?? '';
                        this.#repeatId =
                            this.shadowRoot?.host.getAttribute(ATTR_REPEATID);

                        if (this.#repeatId && this.#repeatId !== '') {
                            addRepeatTargetComponent({
                                repeatId: this.#repeatId,
                                repepeateParentId: this.#parentId,
                                targetComponent: this.#componentname,
                            });
                        }
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

                getComponentName() {
                    return this.#componentname;
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

                getParentId() {
                    return this.#parentId;
                }

                /**
                 * @param { String } value
                 */
                setParentId(id) {
                    this.#parentId = id;
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

                getCurrentKey() {
                    return this.#currentKey;
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
