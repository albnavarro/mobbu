//@ts-check

import { mobCore } from '../../../mobCore';
import { useMethodByName } from '../../../mobjs';
import { MobBodyScroll } from '../../../mobMotion/plugin';
import { initNavigationScoller } from './animation/navScroller';
import { navigationStore } from './store/navStore';

/**
 * @import {SetState, UseMethodByName} from '../../../mobjs/type'
 */

/**
 * @param {object} params
 * @param {HTMLElement} params.main
 * @param {SetState<import('./type').NavigationContainer>} params.setState
 * @returns {void}
 */
function closeNavigation({ main, setState }) {
    setState('isOpen', false);

    mobCore.useFrame(() => {
        document.body.style.overflow = '';
        main.classList.remove('shift');
    });
}

/**
 * @param {object} params
 * @param {HTMLElement} params.main
 * @param {SetState<import('./type').NavigationContainer>} params.setState
 * @returns {void}
 */
function openNavigation({ main, setState }) {
    /** @type{UseMethodByName<import('./type').NavigationContainer>} */
    const methods = useMethodByName('navigation-container');
    methods?.refresh();
    setState('isOpen', true);

    mobCore.useFrame(() => {
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
    });
}

const toTopBtnHandler = () => {
    /** @type{UseMethodByName<import('./type').NavigationContainer>} */
    const navContainerMethods = useMethodByName('navigation-container');
    navContainerMethods?.scrollTop();

    /** @type{UseMethodByName<import('./type').Navigation>} */
    const mainNavigationMethods = useMethodByName('main_navigation');
    mainNavigationMethods?.closeAllAccordion();

    const { navigationIsOpen } = navigationStore.get();
    if (!navigationIsOpen) MobBodyScroll.to(0);
};

/** @type {import('../../../mobjs/type').MobComponent<import('./type').NavigationContainer>} */
export const NavigationContainerFn = ({
    html,
    onMount,
    addMethod,
    setState,
    delegateEvents,
    bindEffect,
    getState,
}) => {
    onMount(({ element }) => {
        const main = /** @type{HTMLElement} */ (
            document.querySelector('main.main')
        );

        /**
         * Open/Close navigation.
         */
        navigationStore.watch('navigationIsOpen', (val) => {
            if (val && main) {
                openNavigation({ main, setState });
                return;
            }

            closeNavigation({ main, setState });
        });

        addMainHandler({ main });

        const { scrollNativationToTop, refreshScroller } =
            initNavigationScoller({
                root: element,
            });

        addMethod('scrollTop', scrollNativationToTop);
        addMethod('refresh', refreshScroller);

        return () => {};
    });

    return html`
        <div
            class="l-navcontainer"
            ${bindEffect({
                bind: 'isOpen',
                toggleClass: { active: () => getState().isOpen },
            })}
        >
            <div class="l-navcontainer__side">
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
                    <mob-navigation name="main_navigation"></mob-navigation>
                </div>
            </div>
        </div>
    `;
};
