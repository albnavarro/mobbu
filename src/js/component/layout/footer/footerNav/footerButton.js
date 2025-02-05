//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { FooterNavButton } from './type';
 **/

import { navigationStore } from '../../navigation/store/navStore';

/** @type {MobComponent<FooterNavButton>} */
export const FooterNavButtonFn = ({ html, getState, setState, bindEffect }) => {
    const { label, section } = getState();

    navigationStore.watch('activeNavigationSection', (current) => {
        setState('active', current === section);
    });

    return html`
        <button
            type="button"
            class="footer-nav__button"
            ${bindEffect({
                bind: 'active',
                toggleClass: { current: () => getState().active },
            })}
        >
            ${label}
        </button>
    `;
};
