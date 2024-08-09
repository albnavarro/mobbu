//@ts-check

const setParent = ({ repeatId, context }) => {
    const parent = /** @type{HTMLElement} */ (context.parentNode);
    addRepeatParent({ id: repeatId, parent });
    return parent;
};

import { addRepeatParent } from '../modules/repeater';
import { ATTR_MOBJS_REPEAT } from '../constant';
import { awaitNextLoop } from '../queque/utils';

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

                    /**
                     * Set parent immediately
                     */
                    setParent({ repeatId, context: this });

                    /**
                     * Update parent after first loop
                     * Repater should move element.
                     */
                    (async () => {
                        await awaitNextLoop();
                        const parent = setParent({ repeatId, context: this });

                        // eslint-disable-next-line unicorn/prefer-dom-node-remove
                        parent?.removeChild(this);
                    })();
                }
            }
        }
    );
};
