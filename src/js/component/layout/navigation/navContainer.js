import { bodyScroll } from '../../../mobbu/plugin';
import { initNavigationScoller } from './animation/navScroller';
import { navigationStore } from './store/navStore';

function closeNavigation({ element, main }) {
    element.classList.remove('active');
    main.classList.remove('shift');
    document.body.style.overflow = '';
    navigationStore.emit('closeAllAccordion');
    navigationStore.emit('goToTop');
}

function openNavigation({ element, main }) {
    element.classList.add('active');
    main.classList.add('shift');
    document.body.style.overflow = 'hidden';
    navigationStore.emit('refreshScroller');
}

function addHandler({ main, toTopBtn }) {
    main.addEventListener('click', () => {
        const { navigationIsOpen } = navigationStore.get();
        if (!navigationIsOpen) return;
        navigationStore.set('navigationIsOpen', false);
        navigationStore.emit('closeNavigation');
        navigationStore.emit('goToTop');
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
export const NavigationContainer = ({ render, onMount }) => {
    onMount(({ element }) => {
        const main = document.querySelector('main.main');
        const toTopBtn = element.querySelector('.l-navcontainer__totop');
        navigationStore.watch('openNavigation', () =>
            openNavigation({ element, main })
        );
        navigationStore.watch('closeNavigation', () =>
            closeNavigation({ element, main })
        );
        addHandler({ main, toTopBtn });
        initNavigationScoller({ root: element });
    });

    return render(/* HTML */ `
        <div class="l-navcontainer">
            <div class="l-navcontainer__side">
                <div class="l-navcontainer__percent"></div>
                <button class="l-navcontainer__totop"></button>
            </div>
            <div class="l-navcontainer__wrap">
                <span class="l-navcontainer__angles">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <div class="l-navcontainer__scroll">
                    <Navigation></Navigation>
                </div>
            </div>
        </div>
    `);
};
