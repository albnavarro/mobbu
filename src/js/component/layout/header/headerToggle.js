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
 * @param {import('../../../mobjs/type').componentType}
 */
export const HeaderToggle = ({ onMount, html, delegateEvents }) => {
    onMount(({ element }) => {
        navigationStore.watch('closeNavigation', () => {
            element.classList.remove('is-open');
        });

        navigationStore.watch('openNavigation', () => {
            element.classList.add('is-open');
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
