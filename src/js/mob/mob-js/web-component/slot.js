import { ATTR_SLOT_NAME } from '../constant';
import { shouldUseSlotQuery } from '../parse/strategy';
import { addSlotPlaceholder } from '../modules/slot';

export const defineSlotComponent = () => {
    customElements.define(
        'mobjs-slot',
        class extends HTMLElement {
            /**
             * @type {string | undefined | null}
             */
            #slotName;

            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.#slotName = '';
                this.isSlot = true;
            }

            connectedCallback() {
                const host = this.shadowRoot?.host;
                if (!host) return;

                // @ts-ignore
                if (!shouldUseSlotQuery) addSlotPlaceholder(host);

                // @ts-ignore
                const { dataset } = this.shadowRoot?.host ?? {};

                if (dataset) {
                    this.#slotName =
                        this.shadowRoot?.host.getAttribute(ATTR_SLOT_NAME);
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
