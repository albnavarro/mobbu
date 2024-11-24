//@ts-check

import { mobCore } from '../../../mobCore';
import { useMethodByName } from '../../../mobjs';
import { motionCore } from '../../../mobMotion';
import { bodyScroll } from '../../../mobMotion/plugin';
import { initNavigationScoller } from './animation/navScroller';
import { navigationStore } from './store/navStore';

/**
 * @import {UseMethodByName} from '../../../mobjs/type'
 */

function closeNavigation({ element, main }) {
    mobCore.useFrame(() => {
        document.body.style.overflow = '';
        element.classList.remove('active');
        main.classList.remove('shift');
    });
}

function openNavigation({ element, main }) {
    /** @type{UseMethodByName<import('./type').NavigationContainer>} */
    const methods = useMethodByName('navigation-container');
    methods?.refresh();

    mobCore.useFrame(() => {
        document.body.style.overflow = 'hidden';
        element.classList.add('active');
        main.classList.add('shift');
    });
}

function addHandler({ main, toTopBtn }) {
    main.addEventListener('click', () => {
        navigationStore.set('navigationIsOpen', false);
    });

    toTopBtn.addEventListener('click', () => {
        /** @type{UseMethodByName<import('./type').NavigationContainer>} */
        const navContainerMethods = useMethodByName('navigation-container');
        navContainerMethods?.scrollTop();

        /** @type{UseMethodByName<import('./type').Navigation>} */
        const mainNavigationMethods = useMethodByName('main_navigation');
        mainNavigationMethods?.closeAllAccordion();

        const { navigationIsOpen } = navigationStore.get();
        if (!navigationIsOpen) bodyScroll.to(0);
    });
}

/** @type {import('../../../mobjs/type').MobComponent<import('./type').NavigationContainer>} */
export const NavigationContainerFn = ({
    html,
    onMount,
    addMethod,
    setRef,
    getRef,
}) => {
    onMount(({ element }) => {
        const main = document.querySelector('main.main');
        let lastMq = '';
        const { toTopBtn, wrap } = getRef();

        /**
         * Open/Close navigation.
         */
        navigationStore.watch('navigationIsOpen', (val) => {
            if (val) {
                openNavigation({ element, main });
                return;
            }

            closeNavigation({ element, main });
        });

        /**
         * Reset scrollPositon from mobile to desktop.
         */
        mobCore.useResize(() => {
            const isDesktop = motionCore.mq('max', 'desktop');
            const currentMq = isDesktop ? 'desk' : 'mob';
            if (currentMq !== lastMq) wrap.scrollTo(0, 0);
            lastMq = currentMq;
        });

        addHandler({ main, toTopBtn });

        const { scrollNativationToTop, refreshScroller } =
            initNavigationScoller({
                root: element,
            });

        addMethod('scrollTop', scrollNativationToTop);
        addMethod('refresh', refreshScroller);

        return () => {};
    });

    return html`
        <div class="l-navcontainer">
            <div class="l-navcontainer__side">
                <div class="l-navcontainer__percent"></div>
                <button
                    class="l-navcontainer__totop"
                    ${setRef('toTopBtn')}
                ></button>
            </div>
            <div class="l-navcontainer__wrap" ${setRef('wrap')}>
                <div class="l-navcontainer__scroll">
                    <mob-navigation name="main_navigation"></mob-navigation>
                </div>
            </div>
        </div>
    `;
};
