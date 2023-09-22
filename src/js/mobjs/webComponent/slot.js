import { ATTR_REPEATID_PARTIAL } from '../constant';

export const defineSlotComponent = () => {
    customElements.define(
        'mobjs-slot',
        class extends HTMLElement {
            /**
             * @type {String}
             */
            #repeatId;

            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.#repeatId = '';

                // @ts-ignore
                const { dataset } = this.shadowRoot?.host ?? {};

                if (dataset) {
                    this.#repeatId = dataset?.[ATTR_REPEATID_PARTIAL] ?? '';
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
