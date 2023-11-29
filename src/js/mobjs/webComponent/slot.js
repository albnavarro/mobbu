import { ATTR_COMPONENT_NAME, ATTR_DYNAMIC, ATTR_PROPS } from '../constant';

export const defineSlotComponent = () => {
    customElements.define(
        'mobjs-slot',
        class extends HTMLElement {
            /**
             * @type {String}
             */
            #slotName;

            /**
             * @type {String}
             */
            #staticProps;

            /**
             * @type {String}
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
                        this.shadowRoot?.host.getAttribute(ATTR_DYNAMIC);
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

            getStaticProps() {
                return this.#staticProps;
            }

            getDynamicProps() {
                return this.#dynamicProps;
            }
        }
    );
};
