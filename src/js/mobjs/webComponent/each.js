//@ts-check

import { addEachParent } from '../componentStore/action/each';
import { ATTR_MOBJS_EACH } from '../constant';

export const defineEachComponent = () => {
    customElements.define(
        'mobjs-each',
        class extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });

                // @ts-ignore
                const { dataset } = this.shadowRoot?.host ?? {};

                if (dataset) {
                    const eachId =
                        this.shadowRoot?.host.getAttribute(ATTR_MOBJS_EACH);

                    const parent = /** @type{HTMLElement} */ (this.parentNode);
                    addEachParent({ id: eachId, parent });

                    // eslint-disable-next-line unicorn/prefer-dom-node-remove
                    parent?.removeChild(this);
                }
            }
        }
    );
};
