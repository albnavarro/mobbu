// @ts-check

import { ATTR_IS_COMPONENT, ATTR_IS_COMPONENT_VALUE } from '../../constant';
import { mainStore } from '../mainStore';

/**
 * @param {Object} context
 */
const isPlaceholder = (context) => {
    return !context.shadowRoot.host.dataset[ATTR_IS_COMPONENT_VALUE];
};

/**
 * @description
 *
 * @returns void
 */
export const setComponentList = (list = {}) => {
    const listParsed = Object.values(list).reduce(
        (previous, current) => ({ ...previous, ...current }),
        {}
    );

    mainStore.set('componentList', listParsed);

    const componentParams = {
        connectedCallback: () => {},
        disconnectedCallback: () => {},
        adoptedCallback: () => {},
        attributeChangedCallback: () => {},
        attributeToObserve: [],
    };

    const listParsed2 = { ...listParsed, 'c-mobjs': { componentParams } };

    /**
     * Register custom HTML tag component.
     * Thios custom TAG will be converted in native DOM element during parse.
     */
    Object.entries(listParsed2).forEach(([key, value]) => {
        const {
            connectedCallback: _connectedCallBack,
            disconnectedCallback: _disconnectedCallback,
            adoptedCallback: _adoptedCallback,
            attributeChangedCallback: _attributeChangedCallback,
            attributeToObserve,
        } = value.componentParams;

        customElements.define(
            key,
            class extends HTMLElement {
                static get observedAttributes() {
                    return [...attributeToObserve, ATTR_IS_COMPONENT];
                }

                constructor() {
                    super();
                    this.attachShadow({ mode: 'open' });

                    if (this.shadowRoot)
                        this.shadowRoot.innerHTML = /* HTML */ `
                            <slot></slot>
                        `;
                }

                disconnectedCallback() {
                    if (!this.shadowRoot) return;

                    if (isPlaceholder(this)) return;

                    _disconnectedCallback({
                        context: this,
                        id: this.shadowRoot.host.id,
                    });
                }

                adoptedCallback() {
                    if (!this.shadowRoot) return;

                    if (isPlaceholder(this)) return;

                    _adoptedCallback({
                        context: this,
                        id: this.shadowRoot.host.id,
                    });
                }

                /**
                 * @param {String} name
                 * @param {any} oldValue
                 * @param {any} newValue
                 */
                attributeChangedCallback(name, oldValue, newValue) {
                    let isConnected = false;

                    if (!this.shadowRoot) return;

                    /**
                     * Fire custom attribute change ( not id )
                     */
                    if (name !== ATTR_IS_COMPONENT) {
                        _attributeChangedCallback({
                            name,
                            oldValue,
                            newValue,
                            context: this,
                            id: this.shadowRoot.host.id,
                        });
                    }

                    /**
                     * Fire connetct when id change.
                     * So component is mounted.
                     */
                    if (name === ATTR_IS_COMPONENT && !isConnected) {
                        isConnected = true;

                        _connectedCallBack({
                            context: this,
                            id: this.shadowRoot.host.id,
                        });
                    }
                }
            }
        );
    });
};

/**
 * @description
 *
 * @returns {Object} Object with all component definition.
 */
export const getComponentList = () => {
    const { componentList } = mainStore.get();
    return componentList;
};
