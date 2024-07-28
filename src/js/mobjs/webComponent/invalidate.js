//@ts-check

import { setWebComponentInvalidareParent } from './setWebComponentParent';

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
                    setWebComponentInvalidareParent({ context: this });
                }
            }
        }
    );
};
