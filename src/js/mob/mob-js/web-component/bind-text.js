import { ATTR_BIND_TEXT_ID, ATTR_COMPONENT_ID } from '../constant';
import { addBindTextPlaceholderMap } from '../modules/bind-text';

export const defineBindTextComponent = () => {
    customElements.define(
        'mobjs-bind-text',
        class extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }

            connectedCallback() {
                const host = /** @type {HTMLElement | undefined} */ (
                    this.shadowRoot?.host
                );

                if (!host?.dataset) return;

                const componentId = host.getAttribute(ATTR_COMPONENT_ID) ?? '';
                const bindTextId = host.getAttribute(ATTR_BIND_TEXT_ID) ?? '';

                addBindTextPlaceholderMap({
                    host,
                    componentId,
                    bindTextId,
                });
            }

            removeCustomComponent() {
                if (!this.shadowRoot) return;

                // eslint-disable-next-line unicorn/prefer-dom-node-remove
                this.parentElement?.removeChild(this);
            }
        }
    );
};
