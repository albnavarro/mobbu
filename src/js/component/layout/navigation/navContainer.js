import { mobCore } from '../../../mobCore';
import { core } from '../../../mobMotion';
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
    navigationStore.emit('refreshScroller');

    mobCore.useFrame(() => {
        document.body.style.overflow = 'hidden';
        element.classList.add('active');
        main.classList.add('shift');
    });
}

function addHandler({ main, toTopBtn }) {
    main.addEventListener('click', () => {
        const { navigationIsOpen } = navigationStore.get();
        if (!navigationIsOpen) return;
        navigationStore.set('navigationIsOpen', false);
        navigationStore.emit('closeNavigation');
    });

    toTopBtn.addEventListener('click', () => {
        navigationStore.emit('closeAllAccordion');
        navigationStore.emit('goToTop');

        const { navigationIsOpen } = navigationStore.get();
        if (!navigationIsOpen) bodyScroll.to(0);
    });
}

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const NavigationContainer = ({ html, onMount }) => {
    onMount(({ element, refs }) => {
        const main = document.querySelector('main.main');
        let lastMq = '';
        const { toTopBtn, wrap } = refs;

        /**
         * Open navigation.
         */
        navigationStore.watch('openNavigation', () =>
            openNavigation({ element, main })
        );

        /**
         * Close navigation.
         */
        navigationStore.watch('closeNavigation', () =>
            closeNavigation({ element, main })
        );

        /**
         * Reset scrollPositon from mobile to desktop.
         */
        mobCore.useResize(() => {
            const isDesktop = core.mq('max', 'desktop');
            const currentMq = isDesktop ? 'desk' : 'mob';
            if (currentMq !== lastMq) wrap.scrollTo(0, 0);
            lastMq = currentMq;
        });

        addHandler({ main, toTopBtn });
        initNavigationScoller({ root: element });

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
                    <mob-navigation></mob-navigation>
                </div>
            </div>
        </div>
    `;
};
