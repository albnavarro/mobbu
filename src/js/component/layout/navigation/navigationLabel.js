//@ts-check

import { html } from '@mobJs';
import { navigationStore } from './store/navStore';

/** @type {import('@mobJsType').MobComponent<import('./type').NavigationLabel>} */
export const NavigationLabelFn = ({ bindStore, bindEffect, getProxi }) => {
    bindStore(navigationStore);
    const proxi = getProxi();

    return html`
        <div
            class="l-navigation__label"
            data-sectionname="${proxi.sectioName}"
            ${bindEffect({
                toggleClass: {
                    active: () =>
                        proxi.sectioName === proxi.activeNavigationSection,
                },
            })}
        >
            ${proxi.label}
        </div>
    `;
};
