import { MobCore } from '@mobCore';
import { htmlObject } from '@mobJs';
import { MobBodyScroll, UnFreezeMobPageScroll } from '@mobMotionPlugin';
import { initNavigationScoller } from './animation/nav-scroller';
import { navigationStore } from '@stores/navigation';
import { getFrameDelay } from '@componentLibs/utils/get-first-animation-delay';
import { refreshNavigationScroller, scrollToTopNav } from './utils';
import { closeAllNavAccordion } from './navigation/utils';
import { mobNavigationName } from '@instanceName';
import { Navigation } from './navigation/definition';
import { setFocusInsideElement } from '@componentLibs/utils/utils';
import { setFcousToNavigationToggle } from '@layoutComponent/header/nav-toggle/utils';

/**
 * @import {ProxiSelfState} from "@mobJsType"
 */

/**
 * @param {object} params
 * @param {HTMLElement} params.main
 * @param {ProxiSelfState<import('./type').NavigationContainer>} params.proxi
 * @returns {void}
 */
function closeNavigation({ main, proxi }) {
    proxi.isOpen = false;

    MobCore.useFrame(() => {
        document.body.style.overflow = '';
        main.classList.remove('shift');
        setFcousToNavigationToggle();
    });
}

/**
 * @param {object} params
 * @param {HTMLElement} params.root
 * @param {HTMLElement} params.main
 * @param {ProxiSelfState<import('./type').NavigationContainer>} params.proxi
 * @returns {void}
 */
function openNavigation({ root, main, proxi }) {
    refreshNavigationScroller();
    proxi.isOpen = true;

    MobCore.useFrame(() => {
        document.body.style.overflow = 'hidden';
        main.classList.add('shift');

        /**
         * After redraw move focus to active menu element.
         */
        MobCore.useNextTick(() => {
            MobCore.useFrameIndex(() => {
                setFocusInsideElement({
                    element: root,
                    activeClass: '.current',
                });
            }, 2);
        });
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
    getSelfProxi,
}) => {
    const proxi = getSelfProxi();

    onMount(({ element }) => {
        const main = /** @type {HTMLElement} */ (
            document.querySelector('main.main')
        );

        /**
         * Open/Close navigation.
         */
        navigationStore.watch('navigationIsOpen', (val) => {
            if (val && main) {
                openNavigation({ root: element, main, proxi });

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

        /**
         * Close navigation on esc.
         */
        const unsubscribeEscHandler = MobCore.useEscHandler(() => {
            navigationStore.set('navigationIsOpen', false);
            UnFreezeMobPageScroll();
        });

        return () => {
            unsubscribeEscHandler();
        };
    });

    return htmlObject({
        className: 'l-navcontainer',
        modules: bindEffect({
            toggleClass: { active: () => proxi.isOpen },
            toggleAttribute: {
                inert: () => !proxi.isOpen,
            },
        }),
        content: [
            {
                className: 'nav-col js-nav-col',
                content: {
                    className: 'scroll-element js-nav-scroll',
                    content: {
                        component: Navigation,
                        attributes: { name: mobNavigationName },
                    },
                },
            },
            {
                className: 'side-col js-side-col',
                modules: bindEffect({
                    toggleClass: { 'is-visible': () => proxi.isMounted },
                }),
                content: [
                    {
                        className: 'percent js-nav-percent',
                    },
                    {
                        tag: 'button',
                        className: 'totop',
                        modules: delegateEvents({
                            click: () => {
                                toTopBtnHandler();
                            },
                        }),
                    },
                ],
            },
        ],
    });
};
