//@ts-check

import { ATTR_BIND_TEXT_ID, ATTR_COMPONENT_ID } from '../constant';
import { addBindTextParent } from '../modules/bindtext';

export const defineBindTextComponent = () => {
    customElements.define(
        'mobjs-bind-text',
        class extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });

                // @ts-ignore
                const { dataset } = this.shadowRoot?.host ?? {};

                if (dataset) {
                    const host = this.shadowRoot.host;
                    const componentId = host.getAttribute(ATTR_COMPONENT_ID);
                    const bindTextId = host.getAttribute(ATTR_BIND_TEXT_ID);
                    const parentElement = this.parentElement;

                    addBindTextParent({
                        id: componentId,
                        bindTextId,
                        parentElement,
                    });

                    // eslint-disable-next-line unicorn/prefer-dom-node-remove
                    parentElement?.removeChild(this);
                }
            }
        }
    );
};
