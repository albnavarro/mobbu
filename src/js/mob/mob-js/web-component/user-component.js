import { MobCore } from '../../mob-core';
import {
    ATTR_BIND_EVENTS,
    ATTR_BIND_REFS_ID,
    ATTR_BIND_REFS_NAME,
    ATTR_CHILD_REPEATID,
    ATTR_CURRENT_LIST_VALUE,
    ATTR_BIND_PROPS,
    ATTR_INSTANCENAME,
    ATTR_KEY,
    ATTR_PARENT_ID,
    ATTR_PROPS,
    ATTR_REPEATER_PROP_BIND,
    ATTR_SLOT,
    ATTR_WEAK_BIND_EVENTS,
} from '../constant';
import { useQuery } from '../parse/use-query';
import {
    addUserPlaceholder,
    getSkipAddUserComponent,
    removeUserPlaceholder,
} from '../modules/user-component';

/**
 * @param {{ [key: string]: import('../main-store/type').ComponentListMap }} componentList
 */
export const defineUserComponent = (componentList) => {
    Object.entries(componentList).forEach(([key, value]) => {
        const {
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
                 * @type {import('../type').ComponentPropsType<
                 *     import('../type').MobComponentMap,
                 *     import('../type').MobComponentMap
                 * >}
                 */
                #params;

                /**
                 * @type {boolean}
                 */
                #isPlaceholder;

                /**
                 * @type {string | undefined | null}
                 */
                #name;

                /**
                 * @type {string | undefined | null}
                 */
                #staticPropsId;

                /**
                 * @type {string | undefined | null}
                 */
                #dynamicPropsId;

                /**
                 * @type {string | undefined | null}
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
                 * @type {string | undefined | null}
                 */
                #currentRepeatValueId;

                /**
                 * @type {string | undefined | null}
                 */
                #slotPosition;

                /**
                 * @type {string | undefined | null}
                 */
                #currentKey;

                /**
                 * @type {string | undefined | null}
                 */
                #parentId;

                /**
                 * @type {string | undefined | null}
                 */
                #componentRepeatId;

                /**
                 * @type {string | undefined | null}
                 */
                #delegateEventId;

                /**
                 * @type {string | undefined | null}
                 */
                #repeatPropBind;

                /**
                 * @type {string | undefined | null}
                 */
                #bindRefId;

                /**
                 * @type {string | undefined | null}
                 */
                #bindRefName;

                static get observedAttributes() {
                    return attributeToObserve;
                }

                constructor() {
                    super();

                    this.attachShadow({ mode: 'open' });
                    this.active = false;
                    this.#componentId = MobCore.getUnivoqueId();
                    // @ts-ignore
                    this.#params = {};
                    this.#componentname = key;

                    // Default symbols without attribute
                    this.#isPlaceholder = true;
                    this.isUserComponent = true;
                    this.#dynamicPropsFromSlotId = '';
                    this.#propsFromSlotId = '';

                    /** Host exist */
                    const host = this.shadowRoot?.host;
                    if (!host) return;

                    /**
                     * When fragment to repeater item is created to add attribute skip
                     */
                    const skip = getSkipAddUserComponent();
                    if (skip) return;

                    /**
                     * Placeholder element that will move to slot. Add visibility hidden to avoid visiual jump before
                     * and after the sobstituition.
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
                }

                getComponentName() {
                    return this.#componentname;
                }

                /**
                 * @param {string} value
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
                 * @param {string} id
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

                resetParams() {
                    this.active = false;
                    this.#componentId = '';
                    // @ts-ignore
                    this.#params = {};
                }

                /**
                 * Disable placeholder state before add to DOM
                 *
                 * @returns Void
                 */
                disablePlaceHolderState() {
                    this.#isPlaceholder = false;
                }

                /**
                 * Add params after web component ( not placeholder ) is added to DOM.
                 *
                 * @param {import('../type').ComponentPropsType<
                 *     import('../type').MobComponentMap,
                 *     import('../type').MobComponentMap
                 * >} data
                 */
                inizializeCustomComponent(data) {
                    if (this.active) return;

                    this.active = true;
                    this.#componentId = data.id;
                    this.#params = data;
                    this.#isPlaceholder = false;

                    // First connected callback when web-compoennt is initialzied
                    _connectedCallBack?.({
                        context: this,
                        params: this.#params,
                    });
                }

                connectedCallback() {
                    /**
                     * When fragment to repeater item is created to add attribute skip
                     */
                    const skip = getSkipAddUserComponent();
                    if (skip) return;

                    if (this.#isPlaceholder) {
                        const host = this.shadowRoot?.host;

                        if (host) {
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
                                ATTR_BIND_PROPS,
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
                            ].map(
                                (attribute) =>
                                    host.getAttribute(attribute) ?? ''
                            );
                        }

                        // @ts-ignore
                        if (!useQuery) addUserPlaceholder(host);
                        return;
                    }
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
                        params: this.#params,
                    });

                    this.resetParams();
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
                        params: this.#params,
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
                        params: this.#params,
                    });
                }
            }
        );
    });
};
