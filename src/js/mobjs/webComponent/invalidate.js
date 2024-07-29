//@ts-check

const setParent = ({ invalidateId, context }) => {
    const parent = /** @type{HTMLElement} */ (context.parentNode);
    addInvalidateParent({ id: invalidateId, parent });
    return parent;
};

import { addInvalidateParent } from '../componentStore/action/invalidate';
import { awaitNextLoop } from '../componentStore/utils';
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

                    /**
                     * Set parent immediately
                     */
                    setParent({ invalidateId, context: this });

                    /**
                     * Update parent after first loop
                     * Repater should move element.
                     */
                    (async () => {
                        await awaitNextLoop();
                        const parent = setParent({
                            invalidateId,
                            context: this,
                        });

                        // eslint-disable-next-line unicorn/prefer-dom-node-remove
                        parent?.removeChild(this);
                    })();
                }
            }
        }
    );
};
