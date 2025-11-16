import { html } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').NavigationLabel>} */
export const NavigationLabelFn = ({ bindEffect, getProxi }) => {
    const proxi = getProxi();

    return html`
        <div
            class="l-navigation__label"
            data-sectionname="${proxi.sectioName}"
            ${bindEffect({
                toggleClass: {
                    active: () =>
                        proxi.sectioName === proxi.activeNavigationSection,
                    hide: () => !!proxi.hide,
                },
            })}
        >
            ${proxi.label}
        </div>
    `;
};
