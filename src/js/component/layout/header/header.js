//@ts-check

/**
 * @import { MobComponent, UseMethodByName } from '../../../mob/mobjs/type';
 **/

import { html, MobJs } from '../../../mob/mobjs';
import { navigationStore } from '../navigation/store/navStore';

function titleHandler() {
    MobJs.loadUrl({ url: '#home' });
    navigationStore.set('navigationIsOpen', false);

    /** @type{UseMethodByName<import('../navigation/type').Navigation>} */
    const mainNavigationMethods = MobJs.useMethodByName('main_navigation');
    mainNavigationMethods?.closeAllAccordion();

    /** @type{UseMethodByName<import('../navigation/type').NavigationContainer>} */
    const navContainerMethods = MobJs.useMethodByName('navigation-container');
    navContainerMethods?.scrollTop();
}

/** @type {MobComponent<import('./type').Header>} */
export const HeaderFn = ({ delegateEvents, bindEffect, getProxi, onMount }) => {
    const proxi = getProxi();

    onMount(() => {
        setTimeout(() => {
            proxi.isMounted = true;
        }, 500);
    });

    return html`
        <header class="l-header">
            <div class="l-header__container">
                <div class="l-header__grid">
                    <div class="l-header__toggle">
                        <mob-header-toggle></mob-header-toggle>
                    </div>
                    <button
                        type="button"
                        class="l-header__title"
                        ${delegateEvents({
                            click: () => {
                                titleHandler();
                            },
                        })}
                    >
                        <div class="l-header__title-container">
                            <h3
                                ${bindEffect({
                                    toggleClass: {
                                        visible: () => proxi.isMounted,
                                    },
                                })}
                            >
                                <span>Mob</span>Project
                            </h3>
                            <h5
                                ${bindEffect({
                                    toggleClass: {
                                        visible: () => proxi.isMounted,
                                    },
                                })}
                            >
                                v 1.0
                            </h5>
                        </div>
                    </button>
                    <div class="l-header__utils">
                        <mob-header-nav></mob-header-nav>
                    </div>
                </div>
            </div>
        </header>
    `;
};
