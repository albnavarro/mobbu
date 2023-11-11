import { navigationStore } from '../navigation/store/navStore';

const hanburgerHandler = (event) => {
    const target = event.target;
    const { navigationIsOpen } = navigationStore.get('navigationIsOpen');

    if (navigationIsOpen) {
        target.classList.remove('is-open');
        navigationStore.emit('closeNavigation');
    } else {
        target.classList.add('is-open');
        navigationStore.emit('openNavigation');
    }

    navigationStore.set('navigationIsOpen', (state) => !state);
};

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const HeaderToggle = ({ onMount, html, delegateEvents }) => {
    onMount(({ refs }) => {
        const { hamburger } = refs;

        navigationStore.watch('closeNavigation', () => {
            hamburger.classList.remove('is-open');
        });

        return () => {};
    });

    return html`
        <button type="button" class="l-header__toggle">
            <div
                class="hamburger hamburger--squeeze"
                ref="hamburger"
                ${delegateEvents({
                    click: (event) => {
                        hanburgerHandler(event);
                    },
                })}
            >
                <div class="hamburger-box">
                    <div class="hamburger-inner"></div>
                </div>
            </div>
        </button>
    `;
};
