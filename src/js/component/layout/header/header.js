//@ts-check

import { mobCore } from '../../../mobCore';
import {
    loadUrl,
    mainStore,
    MAIN_STORE_BEFORE_ROUTE_CHANGE,
} from '../../../mobjs';
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
    navigationStore.emit('closeNavigation');
    navigationStore.emit('closeAllAccordion');
    navigationStore.emit('goToTop');
}

/**
 * @type {import('../../../mobjs/type').mobComponent}
 */
export const HeaderFn = ({ html, onMount, delegateEvents }) => {
    onMount(({ ref }) => {
        const { navInfo, title, beta } = ref;

        navigationStore.watch('openNavigation', () => openInfo({ navInfo }));
        navigationStore.watch('closeNavigation', () => closeInfo({ navInfo }));

        mainStore.watch(MAIN_STORE_BEFORE_ROUTE_CHANGE, (route) => {
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
                        ref="titleLink"
                        ${delegateEvents({
                            click: () => {
                                titleHandler();
                            },
                        })}
                    >
                        <div class="l-header__title-container">
                            <h3 ref="title"><span>Mob</span>Project</h3>
                            <h5 ref="beta">beta 0.0.1</h5>
                        </div>
                    </button>
                    <div class="l-header__utils">
                        <mob-header-nav></mob-header-nav>
                    </div>
                </div>
                <div class="l-header__navinfo" ref="navInfo">
                    <p class="p--small"></p>
                </div>
            </div>
        </header>
    `;
};
