import { ATTR_BIND_OBJECT_ID, ATTR_COMPONENT_ID } from '../constant';
import { addBindObjectPlaceHolderMap } from '../modules/bind-object';

export const defineBindObjectComponent = () => {
    customElements.define(
        'mobjs-bind-object',
        class extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }

            connectedCallback() {
                // @ts-ignore
                const { dataset } = this.shadowRoot?.host ?? {};

                if (dataset) {
                    const host =
                        this.shadowRoot?.host ?? document.createElement('div');
                    const componentId =
                        host?.getAttribute(ATTR_COMPONENT_ID) ?? '';
                    const bindObjectId =
                        host?.getAttribute(ATTR_BIND_OBJECT_ID) ?? '';

                    addBindObjectPlaceHolderMap({
                        host,
                        componentId,
                        bindObjectId,
                    });
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
