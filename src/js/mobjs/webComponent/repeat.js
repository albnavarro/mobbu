//@ts-check

import { addRepeatParent } from '../componentStore/action/repeat';
import { ATTR_MOBJS_REPEAT } from '../constant';

export const defineRepeatComponent = () => {
    customElements.define(
        'mobjs-repeat',
        class extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });

                // @ts-ignore
                const { dataset } = this.shadowRoot?.host ?? {};

                if (dataset) {
                    const repeatId =
                        this.shadowRoot?.host.getAttribute(ATTR_MOBJS_REPEAT);

                    const parent = /** @type{HTMLElement} */ (this.parentNode);
                    addRepeatParent({ id: repeatId, parent });

                    // eslint-disable-next-line unicorn/prefer-dom-node-remove
                    parent?.removeChild(this);
                }
            }
        }
    );
};
