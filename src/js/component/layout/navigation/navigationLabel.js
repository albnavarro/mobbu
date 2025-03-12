//@ts-check

import { html } from '../../../mobjs';
import { navigationStore } from './store/navStore';

/** @type {import('../../../mobjs/type').MobComponent<import('./type').NavigationLabel>} */
export const NavigationLabelFn = ({ getState, bindStore, bindEffect }) => {
    bindStore(navigationStore);
    const { label, sectioName } = getState();

    return html`
        <div
            class="l-navigation__label"
            data-sectionname="${sectioName}"
            ${bindEffect({
                bind: 'activeNavigationSection',
                toggleClass: {
                    active: () =>
                        getState().sectioName ===
                        getState().activeNavigationSection,
                },
            })}
        >
            ${label}
        </div>
    `;
};
