import { setParentInvalidate } from '../modules/invalidate/action/set/set-parent-invalidate';
import { ATTR_INVALIDATE } from '../constant';

export const defineInvalidateComponent = () => {
    customElements.define(
        'mobjs-invalidate',
        class extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }

            connectedCallback() {
                const host = /** @type {HTMLElement | undefined} */ (
                    this.shadowRoot?.host
                );

                if (!host?.dataset) return;

                const invalidateId = host.getAttribute(ATTR_INVALIDATE) ?? '';
                setParentInvalidate({ invalidateId, host });
            }

            removeCustomComponent() {
                if (!this.shadowRoot) return;

                // eslint-disable-next-line unicorn/prefer-dom-node-remove
                this.parentElement?.removeChild(this);
            }
        }
    );
};
