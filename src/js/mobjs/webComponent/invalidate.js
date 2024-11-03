//@ts-check

import { setParentInvalidate } from '../modules/invalidate/action/setParentInvalidate';
import { ATTR_INVALIDATE } from '../constant';

export const defineInvalidateComponent = () => {
    customElements.define(
        'mobjs-invalidate',
        class extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });

                // @ts-ignore
                const { dataset } = this.shadowRoot?.host ?? {};

                if (dataset) {
                    const host = /** @type {HTMLElement} */ (
                        this.shadowRoot?.host
                    );
                    const invalidateId = host.getAttribute(ATTR_INVALIDATE);
                    setParentInvalidate({ invalidateId, host });
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
