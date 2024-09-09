//@ts-check

import { mobCore } from '../../../mobCore';
import { navigationStore } from '../navigation/store/navStore';

const hanburgerHandler = () => {
    navigationStore.set('navigationIsOpen', (state) => !state);
};

/**
 * @type {import('../../../mobjs/type').MobComponent}
 */
export const HeaderToggleFn = ({ onMount, html, delegateEvents }) => {
    onMount(({ element }) => {
        navigationStore.watch('navigationIsOpen', (val) => {
            mobCore.useFrame(() => {
                if (val) {
                    element.classList.add('is-open');
                    return;
                }

                element.classList.remove('is-open');
            });
        });

        return () => {};
    });

    return html`
        <button
            class="hamburger hamburger--squeeze"
            type="button"
            ${delegateEvents({
                click: () => hanburgerHandler(),
            })}
        >
            <div class="hamburger-box">
                <div class="hamburger-inner"></div>
            </div>
        </button>
    `;
};
