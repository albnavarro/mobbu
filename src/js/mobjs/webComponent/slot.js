import { ATTR_SLOT_NAME_PARTIAL } from '../constant';

export const defineSlotComponent = () => {
    customElements.define(
        'mobjs-slot',
        class extends HTMLElement {
            /**
             * @type {String}
             */
            #slotName;

            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.#slotName = '';

                // @ts-ignore
                const { dataset } = this.shadowRoot?.host ?? {};

                if (dataset) {
                    this.#slotName = dataset?.[ATTR_SLOT_NAME_PARTIAL] ?? '';
                }
            }

            removeCustomComponent() {
                if (!this.shadowRoot) return;

                // eslint-disable-next-line unicorn/prefer-dom-node-remove
                this.parentElement?.removeChild(this);
            }

            getSlotName() {
                return this.#slotName;
            }
        }
    );
};
