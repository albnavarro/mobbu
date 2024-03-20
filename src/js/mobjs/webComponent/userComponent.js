import { mobCore } from '../../mobCore';
import {
    ATTR_BIND_EVENTS,
    ATTR_CHILD_REPEATID,
    ATTR_CURRENT_LIST_VALUE,
    ATTR_DYNAMIC,
    ATTR_INSTANCENAME,
    ATTR_KEY,
    ATTR_PARENT_ID,
    ATTR_PROPS,
    ATTR_SLOT,
    ATTR_WEAK_BIND_EVENTS,
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
                 * @type {string}
                 */
                #componentname;

                /**
                 * @type {string}
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
                 * @type {boolean}
                 */
                #isPlaceholder;

                /**
                 * @type {string}
                 */
                #name;

                /**
                 * @type {string}
                 */
                #staticPropsId;

                /**
                 * @type {string}
                 */
                #dynamicPropsId;

                /**
                 * @type {string}
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
                 * @type {string}
                 */
                #currentRepeatValueId;

                /**
                 * @type {string}
                 */
                #slotPosition;

                /**
                 * @type {string}
                 */
                #currentKey;

                /**
                 * @type {string}
                 */
                #parentId;

                /**
                 * @type {string}
                 */
                #componentRepeatId;

                /**
                 * @type {string}
                 */
                #delegateEventId;

                static get observedAttributes() {
                    return attributeToObserve;
                }

                constructor() {
                    super();
                    this.attachShadow({ mode: 'open' });
                    this.active = false;
                    this.#componentId = mobCore.getUnivoqueId();
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
                    this.#name = '';
                    this.#staticPropsId = '';
                    this.#dynamicPropsId = '';
                    this.#bindEventsId = '';
                    this.#dynamicPropsFromSlotId = '';
                    this.#propsFromSlotId = '';
                    this.#currentRepeatValueId = '';
                    this.#slotPosition = '';
                    this.#currentKey = '';
                    this.#parentId = '';
                    this.#componentRepeatId = '';

                    //
                    this.isUserComponent = true;

                    const host = this.shadowRoot.host;
                    this.#name = host.getAttribute(ATTR_INSTANCENAME);
                    this.#staticPropsId = host.getAttribute(ATTR_PROPS);
                    this.#dynamicPropsId = host.getAttribute(ATTR_DYNAMIC);
                    this.#currentKey = host.getAttribute(ATTR_KEY);
                    this.#bindEventsId = host.getAttribute(ATTR_BIND_EVENTS);
                    this.#currentRepeatValueId = host.getAttribute(
                        ATTR_CURRENT_LIST_VALUE
                    );
                    this.#slotPosition = host.getAttribute(ATTR_SLOT);
                    this.#parentId = host.getAttribute(ATTR_PARENT_ID) ?? '';
                    this.#componentRepeatId =
                        host.getAttribute(ATTR_CHILD_REPEATID);

                    this.#delegateEventId = host.getAttribute(
                        ATTR_WEAK_BIND_EVENTS
                    );

                    /**
                     * Placeholder element that will move to slot.
                     * Add visibility hidden to avoid visiual jump before and after the sobstituition.
                     */
                    if (this.#slotPosition && !this.active) {
                        this.style.visibility = 'hidden';
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
                 * @param { string } value
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

                getRepeatValue() {
                    return this.#currentRepeatValueId;
                }

                getSlotPosition() {
                    return this.#slotPosition;
                }

                getDelegateEventId() {
                    return this.#delegateEventId;
                }

                getComponentRepeatId() {
                    return this.#componentRepeatId;
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
                 * @param {object} data
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
                 * @param {string} name
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
