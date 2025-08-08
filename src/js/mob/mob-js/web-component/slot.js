import { ATTR_COMPONENT_NAME } from '../constant';
import { useSlotQuery } from '../parse/strategy';
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

                // @ts-ignore
                const { dataset } = this.shadowRoot?.host ?? {};

                if (dataset) {
                    this.#slotName =
                        this.shadowRoot?.host.getAttribute(ATTR_COMPONENT_NAME);
                }
            }

            connectedCallback() {
                const host = this.shadowRoot?.host;
                if (!host) return;

                // @ts-ignore
                if (!useSlotQuery) addSlotPlaceholder(host);
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
