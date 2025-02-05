//@ts-check

/**
 * @import { MobComponent, UseMethodByName } from '../../../mobjs/type';
 **/

import { beforeRouteChange, loadUrl, useMethodByName } from '../../../mobjs';
import { navigationStore } from '../navigation/store/navStore';

function titleHandler() {
    loadUrl({ url: '#home' });
    navigationStore.set('navigationIsOpen', false);

    /** @type{UseMethodByName<import('../navigation/type').Navigation>} */
    const mainNavigationMethods = useMethodByName('main_navigation');
    mainNavigationMethods?.closeAllAccordion();

    /** @type{UseMethodByName<import('../navigation/type').NavigationContainer>} */
    const navContainerMethods = useMethodByName('navigation-container');
    navContainerMethods?.scrollTop();
}

/** @type {MobComponent<import('./type').Header>} */
export const HeaderFn = ({
    html,
    delegateEvents,
    setState,
    getState,
    bindEffect,
}) => {
    beforeRouteChange(({ route }) => {
        setState('isNotHome', route !== 'home');
    });

    navigationStore.watch('navigationIsOpen', (val) => {
        setState('infoIsOpen', val);
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
                                    bind: 'isNotHome',
                                    toggleClass: {
                                        visible: () => getState().isNotHome,
                                    },
                                })}
                            >
                                <span>Mob</span>Project
                            </h3>
                            <h5
                                ${bindEffect({
                                    bind: 'isNotHome',
                                    toggleClass: {
                                        visible: () => getState().isNotHome,
                                    },
                                })}
                            >
                                beta 0.0.1
                            </h5>
                        </div>
                    </button>
                    <div class="l-header__utils">
                        <mob-header-nav></mob-header-nav>
                    </div>
                </div>
                <div
                    class="l-header__navinfo"
                    ${bindEffect({
                        bind: 'infoIsOpen',
                        toggleClass: { open: () => getState().infoIsOpen },
                    })}
                >
                    <p class="p--small"></p>
                </div>
            </div>
        </header>
    `;
};
