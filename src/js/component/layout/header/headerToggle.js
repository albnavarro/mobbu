import { navigationStore } from '../navigation/store/navStore';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const HeaderToggle = ({ onMount, render }) => {
    onMount(({ element }) => {
        const hamburger = element.querySelector('.hamburger');

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

    return render(/* HTML */ `
        <mob-header-toggle type="button" class="l-header__toggle">
            <div class="hamburger hamburger--squeeze">
                <div class="hamburger-box">
                    <div class="hamburger-inner"></div>
                </div>
            </div>
        </mob-header-toggle>
    `);
};
