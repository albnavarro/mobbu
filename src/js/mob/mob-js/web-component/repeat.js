import { setParentRepeater } from '../modules/repeater/action/set-parent-repeater';
import { ATTR_MOBJS_REPEAT } from '../constant';
import { getSkipAddUserComponent } from '../modules/user-component';

export const defineRepeatComponent = () => {
    customElements.define(
        'mobjs-repeat',
        class extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }

            connectedCallback() {
                const skip = getSkipAddUserComponent();
                if (skip) return;

                // @ts-ignore
                const { dataset } = this.shadowRoot?.host ?? {};

                if (dataset) {
                    const host = /** @type {HTMLElement} */ (
                        this.shadowRoot?.host
                    );
                    const repeatId =
                        host?.getAttribute(ATTR_MOBJS_REPEAT) ?? '';
                    setParentRepeater({ repeatId, host });
                }
            }

            removeCustomComponent() {
                if (!this.shadowRoot) return;

                // eslint-disable-next-line unicorn/prefer-dom-node-remove
                this.parentElement?.removeChild(this);
            }
        }
    );
};
