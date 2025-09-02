import { MobCore } from '@mobCore';
import { html, MobJs } from '@mobJs';
import { MobBodyScroll, UnFreezeMobPageScroll } from '@mobMotionPlugin';
import { initNavigationScoller } from './animation/nav-scroller';
import {
    mobNavigationContainerName,
    mobNavigationName,
} from '../../instance-name';
import { navigationStore } from '@stores/navigation';

/**
 * @import {SetState, UseMethodByName} from '@mobJsType'
 */

/**
 * @param {object} params
 * @param {HTMLElement} params.main
 * @param {SetState<import('./type').NavigationContainer>} params.setState
 * @returns {void}
 */
function closeNavigation({ main, setState }) {
    setState('isOpen', false);

    MobCore.useFrame(() => {
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
    /** @type {UseMethodByName<import('./type').NavigationContainer>} */
    const methods = MobJs.useMethodByName(mobNavigationContainerName);
    methods?.refresh();
    setState('isOpen', true);

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
    /** @type {UseMethodByName<import('./type').NavigationContainer>} */
    const navContainerMethods = MobJs.useMethodByName(
        mobNavigationContainerName
    );
    navContainerMethods?.scrollTop();

    /** @type {UseMethodByName<import('./type').Navigation>} */
    const mainNavigationMethods = MobJs.useMethodByName(mobNavigationName);
    mainNavigationMethods?.closeAllAccordion();

    const { navigationIsOpen } = navigationStore.get();
    if (!navigationIsOpen) MobBodyScroll.to(0);
};

/** @type {import('@mobJsType').MobComponent<import('./type').NavigationContainer>} */
export const NavigationContainerFn = ({
    onMount,
    addMethod,
    setState,
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
                toggleClass: { active: () => proxi.isOpen },
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
                    <mob-navigation
                        name="${mobNavigationName}"
                    ></mob-navigation>
                </div>
            </div>
        </div>
    `;
};
