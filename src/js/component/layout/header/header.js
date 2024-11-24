//@ts-check

/**
 * @import { MobComponent, UseMethodByName } from '../../../mobjs/type';
 **/

import { mobCore } from '../../../mobCore';
import { beforeRouteChange, loadUrl, useMethodByName } from '../../../mobjs';
import { navigationStore } from '../navigation/store/navStore';

function openInfo({ navInfo }) {
    mobCore.useFrame(() => {
        navInfo.classList.add('open');
    });
}

function closeInfo({ navInfo }) {
    mobCore.useFrame(() => {
        navInfo.classList.remove('open');
    });
}

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

/** @type {MobComponent} */
export const HeaderFn = ({ html, onMount, delegateEvents, setRef, getRef }) => {
    onMount(() => {
        const { navInfo, title, beta } = getRef();

        navigationStore.watch('navigationIsOpen', (val) => {
            if (val) {
                openInfo({ navInfo });
                return;
            }

            closeInfo({ navInfo });
        });

        beforeRouteChange(({ route }) => {
            title.classList.toggle('visible', route !== 'home');
            beta.classList.toggle('visible', route !== 'home');
        });

        return () => {};
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
                        ${setRef('titleLink')}
                        ${delegateEvents({
                            click: () => {
                                titleHandler();
                            },
                        })}
                    >
                        <div class="l-header__title-container">
                            <h3 ${setRef('title')}><span>Mob</span>Project</h3>
                            <h5 ${setRef('beta')}>beta 0.0.1</h5>
                        </div>
                    </button>
                    <div class="l-header__utils">
                        <mob-header-nav></mob-header-nav>
                    </div>
                </div>
                <div class="l-header__navinfo" ${setRef('navInfo')}>
                    <p class="p--small"></p>
                </div>
            </div>
        </header>
    `;
};
