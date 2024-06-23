import { mobCore } from '../../../mobCore';
import { navigationStore } from '../navigation/store/navStore';

const hanburgerHandler = () => {
    const { navigationIsOpen } = navigationStore.get('navigationIsOpen');
    navigationStore.set('navigationIsOpen', (state) => !state);

    if (navigationIsOpen) {
        navigationStore.emit('closeNavigation');
        return;
    }

    navigationStore.emit('openNavigation');
};

/**
 * @type {import('../../../mobjs/type').mobComponent}
 */
export const HeaderToggleFn = ({ onMount, html, delegateEvents }) => {
    onMount(({ element }) => {
        navigationStore.watch('closeNavigation', () => {
            mobCore.useFrame(() => {
                element.classList.remove('is-open');
            });
        });

        navigationStore.watch('openNavigation', () => {
            mobCore.useFrame(() => {
                element.classList.add('is-open');
            });
        });
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
