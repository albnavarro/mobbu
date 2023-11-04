import { navigationStore } from '../navigation/store/navStore';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const HeaderToggle = ({ onMount, html }) => {
    onMount(({ element, refs }) => {
        const { hamburger } = refs;

        element.addEventListener('click', () => {
            const { navigationIsOpen } =
                navigationStore.get('navigationIsOpen');

            if (navigationIsOpen) {
                hamburger.classList.remove('is-open');
                navigationStore.emit('closeNavigation');
            } else {
                hamburger.classList.add('is-open');
                navigationStore.emit('openNavigation');
            }

            navigationStore.set('navigationIsOpen', (state) => !state);
        });

        navigationStore.watch('closeNavigation', () => {
            hamburger.classList.remove('is-open');
        });

        return () => {};
    });

    return html`
        <button type="button" class="l-header__toggle">
            <div class="hamburger hamburger--squeeze" ref="hamburger">
                <div class="hamburger-box">
                    <div class="hamburger-inner"></div>
                </div>
            </div>
        </button>
    `;
};
