import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { MobBodyScroll, UnFreezeMobPageScroll } from '@mobMotionPlugin';
import { initNavigationScoller } from './animation/nav-scroller';
import { navigationStore } from '@stores/navigation';
import { getFrameDelay } from '@componentLibs/utils/get-first-animation-delay';
import { refreshNavigationScroller, scrollToTopNav } from './utils';
import { closeAllNavAccordion } from './navigation/utils';
import { mobNavigationName } from '@instanceName';

/**
 * @import {ProxiState} from '@mobJsType'
 */

/**
 * @param {object} params
 * @param {HTMLElement} params.main
 * @param {ProxiState<import('./type').NavigationContainer>} params.proxi
 * @returns {void}
 */
function closeNavigation({ main, proxi }) {
    proxi.isOpen = false;

    MobCore.useFrame(() => {
        document.body.style.overflow = '';
        main.classList.remove('shift');
    });
}

/**
 * @param {object} params
 * @param {HTMLElement} params.main
 * @param {ProxiState<import('./type').NavigationContainer>} params.proxi
 * @returns {void}
 */
function openNavigation({ main, proxi }) {
    refreshNavigationScroller();
    proxi.isOpen = true;

    MobCore.useFrame(() => {
        document.body.style.overflow = 'hidden';
        main.classList.add('shift');
    });
}

/**
 * @param {object} params
 * @param {HTMLElement} params.main
 * @returns {void}
 */
function addMainHandler({ main }) {
    main.addEventListener('click', () => {
        navigationStore.set('navigationIsOpen', false);
        UnFreezeMobPageScroll();
    });
}

const toTopBtnHandler = () => {
    scrollToTopNav();
    closeAllNavAccordion();

    const { navigationIsOpen } = navigationStore.get();
    if (!navigationIsOpen) MobBodyScroll.to(0);
};

/** @type {import('@mobJsType').MobComponent<import('./type').NavigationContainer>} */
export const NavigationContainerFn = ({
    onMount,
    addMethod,
    delegateEvents,
    bindEffect,
    getProxi,
}) => {
    const proxi = getProxi();

    onMount(({ element }) => {
        const main = /** @type {HTMLElement} */ (
            document.querySelector('main.main')
        );

        /**
         * Open/Close navigation.
         */
        navigationStore.watch('navigationIsOpen', (val) => {
            if (val && main) {
                openNavigation({ main, proxi });
                return;
            }

            closeNavigation({ main, proxi });
        });

        addMainHandler({ main });

        const { scrollNativationToTop, refreshScroller } =
            initNavigationScoller({
                root: element,
            });

        addMethod('scrollTop', scrollNativationToTop);
        addMethod('refresh', refreshScroller);

        MobCore.useFrameIndex(() => {
            proxi.isMounted = true;
        }, getFrameDelay());

        // eslint-disable-next-line unicorn/consistent-function-scoping
        return () => {};
    });

    return html`
        <div
            class="l-navcontainer"
            ${bindEffect({
                toggleClass: { active: () => proxi.isOpen },
            })}
        >
            <div
                class="l-navcontainer__side"
                ${bindEffect({
                    toggleClass: { 'is-visible': () => proxi.isMounted },
                })}
            >
                <div class="l-navcontainer__percent"></div>
                <button
                    class="l-navcontainer__totop"
                    ${delegateEvents({
                        click: () => {
                            toTopBtnHandler();
                        },
                    })}
                ></button>
            </div>
            <div class="l-navcontainer__wrap">
                <div class="l-navcontainer__scroll">
                    <mob-navigation
                        name="${mobNavigationName}"
                    ></mob-navigation>
                </div>
            </div>
        </div>
    `;
};
