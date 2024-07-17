//@ts-check

import { addIvalidateParent } from '../componentStore/action/invalidate';
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
                    const invalidateId =
                        this.shadowRoot?.host.getAttribute(ATTR_INVALIDATE);

                    const parent = /** @type{HTMLElement} */ (this.parentNode);
                    addIvalidateParent({ id: invalidateId, parent });

                    // eslint-disable-next-line unicorn/prefer-dom-node-remove
                    parent?.removeChild(this);
                }
            }
        }
    );
};
