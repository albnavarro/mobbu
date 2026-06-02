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
import { setFocusInsideElement, tabLoopTrap } from '@componentLibs/utils/utils';
import { setFcousToNavigationToggle } from '@layoutComponent/header/nav-toggle/utils';
import { getHeaderElement } from '@layoutComponent/header/utils';

let unsubscribeTabHandler = () => {};
let unsubscribeEscHandler = () => {};

/**
 * @import {ProxiSelfState} from '@mobJsType'
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
 * CLose nav on main Node click
 *
 * - Skip if target container in header, ( prevent double toggle ).
 *
 * @returns {void}
 */
function addMainHandler() {
    MobCore.usePointerDown(({ target }) => {
        const navigationIsOpen = navigationStore.getProp('navigationIsOpen');
        const header = getHeaderElement();

        if (
            !navigationIsOpen ||
            !target ||
            header.contains(/** @type {HTMLElement} */ (target))
        )
            return;

        navigationStore.set('navigationIsOpen', false);
        UnFreezeMobPageScroll();
        setFcousToNavigationToggle();
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
            document.querySelector('.main-app-content')
        );

        /**
         * Open/Close navigation.
         */
        navigationStore.watch('navigationIsOpen', (val) => {
            if (val && main) {
                openNavigation({ root: element, main, proxi });

                /**
                 * Tab loop inside overlay
                 */
                unsubscribeTabHandler = MobCore.useTabHandler(
                    ({ direction, preventDefault }) => {
                        tabLoopTrap({ element, direction, preventDefault });
                    }
                );

                /**
                 * Close navigation on esc.
                 */
                unsubscribeEscHandler = MobCore.useEscHandler(() => {
                    navigationStore.set('navigationIsOpen', false);
                    UnFreezeMobPageScroll();
                    setFcousToNavigationToggle();
                });

                return;
            }

            closeNavigation({ main, proxi });
            unsubscribeEscHandler();
            unsubscribeTabHandler();
        });

        addMainHandler();

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
        return () => {
            unsubscribeEscHandler();
            unsubscribeTabHandler();
        };
    });

    return htmlObject({
        className: 'l-navcontainer',
        attributes: { id: 'site-navigation' },
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
