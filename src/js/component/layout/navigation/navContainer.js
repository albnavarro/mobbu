//@ts-check

import { mobCore } from '../../../mobCore';
import { useMethodByName } from '../../../mobjs';
import { motionCore } from '../../../mobMotion';
import { bodyScroll } from '../../../mobMotion/plugin';
import { initNavigationScoller } from './animation/navScroller';
import { navigationStore } from './store/navStore';

function closeNavigation({ element, main }) {
    mobCore.useFrame(() => {
        document.body.style.overflow = '';
        element.classList.remove('active');
        main.classList.remove('shift');
    });
}

function openNavigation({ element, main }) {
    useMethodByName('navigation-container')?.refresh();

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
        useMethodByName('navigation-container')?.scrollTop();
        useMethodByName('main_navigation')?.closeAllAccordion();

        const { navigationIsOpen } = navigationStore.get();
        if (!navigationIsOpen) bodyScroll.to(0);
    });
}

/** @type {import('../../../mobjs/type').MobComponent} */
export const NavigationContainerFn = ({ html, onMount, addMethod }) => {
    onMount(({ element, ref }) => {
        const main = document.querySelector('main.main');
        let lastMq = '';
        const { toTopBtn, wrap } = ref;

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
                <button class="l-navcontainer__totop" ref="toTopBtn"></button>
            </div>
            <div class="l-navcontainer__wrap" ref="wrap">
                <div class="l-navcontainer__scroll">
                    <mob-navigation name="main_navigation"></mob-navigation>
                </div>
            </div>
        </div>
    `;
};
