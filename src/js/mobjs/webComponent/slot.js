import {
    ATTR_DYNAMIC_PARTIAL,
    ATTR_PROPS_PARTIAL,
    ATTR_SLOT_NAME_PARTIAL,
} from '../constant';

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
                    this.#slotName = dataset?.[ATTR_SLOT_NAME_PARTIAL] ?? '';
                    this.#staticProps = dataset?.[ATTR_PROPS_PARTIAL] ?? '';
                    this.#dynamicProps = dataset?.[ATTR_DYNAMIC_PARTIAL] ?? '';
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
