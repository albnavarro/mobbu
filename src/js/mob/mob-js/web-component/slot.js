import { ATTR_COMPONENT_NAME, ATTR_BIND_PROPS, ATTR_PROPS } from '../constant';
import { useSlotQuery } from '../parse/use-query';
import { addSlotPlaceholder } from '../modules/slot';

export const defineSlotComponent = () => {
    customElements.define(
        'mobjs-slot',
        class extends HTMLElement {
            /**
             * @type {string | undefined | null}
             */
            #slotName;

            /**
             * @type {string | undefined | null}
             */
            #staticProps;

            /**
             * @type {string | undefined | null}
             */
            #dynamicProps;

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
                    this.#staticProps =
                        this.shadowRoot?.host.getAttribute(ATTR_PROPS);
                    this.#dynamicProps =
                        this.shadowRoot?.host.getAttribute(ATTR_BIND_PROPS);
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

            getStaticProps() {
                return this.#staticProps;
            }

            getDynamicProps() {
                return this.#dynamicProps;
            }
        }
    );
};
