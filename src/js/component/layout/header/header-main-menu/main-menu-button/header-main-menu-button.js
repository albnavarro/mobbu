/**
 * @import {MobComponent} from "@mobJsType"
 * @import {HeaderMainMenuButton} from "./type"
 */

import { html } from '@mobJs';

/** @type {MobComponent<HeaderMainMenuButton>} */
export const HeaderMainMenuButtonFn = ({ getProxi, bindEffect, computed }) => {
    const proxi = getProxi();

    computed(
        () => proxi.active,
        () => {
            return proxi.section === proxi.activeNavigationSection;
        }
    );

    return html`
        <button
            type="button"
            class="header-main-menu__button"
            ${bindEffect({
                toggleClass: { current: () => proxi.active },
            })}
        >
            ${proxi.label}
        </button>
    `;
};
