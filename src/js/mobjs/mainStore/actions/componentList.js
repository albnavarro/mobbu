// @ts-check

import { mainStore } from '../mainStore';

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
        constructorCallback: () => {},
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
                static get observedAttributes() {
                    return attributeToObserve;
                }

                constructor() {
                    super();
                    this.attachShadow({ mode: 'open' });
                    this.active = false;
                    this.componentId = undefined;
                    this.emit = () => {};
                    this.emitAsync = () => {};
                    this.freezeProp = () => {};
                    this.freezeProp = () => {};
                    this.getChildren = () => {};
                    this.getParentId = () => {};
                    this.getState = () => {};
                    this.remove = () => {};
                    this.setState = () => {};
                    this.unBind = () => {};
                    this.unFreezeProp = () => {};
                    this.watch = () => {};
                    this.watchImmediate = () => {};
                    this.watchParent = () => {};

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
                            id: this.componentId,
                        });
                    }
                }

                getData() {
                    return {
                        componentId: this.componentId,
                        emit: this.emit,
                        emitAsync: this.emitAsync,
                        freezeProp: this.freezeProp,
                        getChildren: this.getChildren,
                        getParentId: this.getParentId,
                        getState: this.getState,
                        remove: this.remove,
                        setState: this.setState,
                        unBind: this.unBind,
                        unFreezeProp: this.unFreezeProp,
                        watch: this.watch,
                        watchImmediate: this.watchImmediate,
                        watchParent: this.watchParent,
                    };
                }

                resetData() {
                    this.active = false;
                    this.componentId = null;
                    this.emit = () => {};
                    this.emitAsync = () => {};
                    this.freezeProp = () => {};
                    this.getChildren = () => {};
                    this.getParentId = () => {};
                    this.getState = () => {};
                    this.remove = () => {};
                    this.setState = () => {};
                    this.unBind = () => {};
                    this.unFreezeProp = () => {};
                    this.watch = () => {};
                    this.watchImmediate = () => {};
                    this.watchParent = () => {};
                }

                /**
                 * @param {Object} data
                 */
                inizializeCustomComponent(data) {
                    this.active = true;
                    this.componentId = data.id;
                    this.emit = data.emit;
                    this.emitAsync = data.emitAsync;
                    this.freezeProp = data.freezeProp;
                    this.getChildren = data.getChildren;
                    this.getParentId = data.getParentId;
                    this.getState = data.getState;
                    this.remove = data.remove;
                    this.setState = data.setState;
                    this.unBind = data.unBind;
                    this.unFreezeProp = data.unFreezeProp;
                    this.watch = data.watch;
                    this.watchImmediate = data.watchImmediate;
                    this.watchParent = data.watchParent;

                    _connectedCallBack({
                        context: this,
                        data: this.getData(),
                    });
                }

                disconnectedCallback() {
                    if (!this.shadowRoot || !this.active) return;

                    _disconnectedCallback({
                        context: this,
                        data: this.getData(),
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
                        data: this.getData(),
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
                        data: this.getData(),
                    });
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
