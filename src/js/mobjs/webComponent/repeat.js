//@ts-check

import { setWebComponentRepeatParent } from './setWebComponentParent';

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
                    setWebComponentRepeatParent({ context: this });
                }
            }
        }
    );
};
