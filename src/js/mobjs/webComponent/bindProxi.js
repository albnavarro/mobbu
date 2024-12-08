//@ts-check

import { ATTR_BIND_PROXI_ID, ATTR_COMPONENT_ID } from '../constant';
import { addBindProxiPlaceHolderMap } from '../modules/bindProxi';

export const defineBindProxiComponent = () => {
    customElements.define(
        'mobjs-bind-proxi',
        class extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }

            connectedCallback() {
                // @ts-ignore
                const { dataset } = this.shadowRoot?.host ?? {};

                if (dataset) {
                    const host = this.shadowRoot?.host;
                    const componentId = host?.getAttribute(ATTR_COMPONENT_ID);
                    const bindProxiId = host?.getAttribute(ATTR_BIND_PROXI_ID);

                    addBindProxiPlaceHolderMap({
                        host,
                        componentId,
                        bindProxiId,
                    });
                }
            }

            removeCustomComponent() {
                if (!this.shadowRoot) return;

                // eslint-disable-next-line unicorn/prefer-dom-node-remove
                this.parentElement?.removeChild(this);
            }
        }
    );
};
