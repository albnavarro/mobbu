//@ts-check

import { ATTR_REPEATID } from '../constant';

export const defineRepeaterComponent = () => {
    customElements.define(
        'mobjs-repeater',
        class extends HTMLElement {
            /**
             * @type {string|undefined|null}
             */
            #repeatId;

            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.#repeatId = '';
                this.isRepeaterFirstChildNode = true;

                // @ts-ignore
                const { dataset } = this.shadowRoot?.host ?? {};

                if (dataset) {
                    this.#repeatId =
                        this.shadowRoot?.host.getAttribute(ATTR_REPEATID);
                }
            }

            removeCustomComponent() {
                if (!this.shadowRoot) return;

                // eslint-disable-next-line unicorn/prefer-dom-node-remove
                this.parentElement?.removeChild(this);
            }

            getRepeatId() {
                return this.#repeatId;
            }
        }
    );
};
