import { core } from '../../../mobbu';
import { navigationStore } from './navStore';

let root = {};
let main = {};

function closeNavigation() {
    root.classList.remove('active');
    main.classList.remove('shift');
    document.body.style.overflow = '';

    // Close all accordion item on navigation close.
    navigationStore.emit('closeAllItems');
}

function openNavigation() {
    root.classList.add('active');
    main.classList.add('shift');
    document.body.style.overflow = 'hidden';

    navigationStore.emit('refreshScroller');
}

function addHandler() {
    main.addEventListener('click', () => {
        const { navigationIsOpen } = navigationStore.get();
        if (!navigationIsOpen) return;
        navigationStore.set('navigationIsOpen', false);
        navigationStore.emit('closeNavigation');
    });
}

/**
 * Create container
 */
export const navigationContainer = () => {
    return new Promise((resolve) => {
        const component = document.querySelector(
            '[data-component="navigation_container"]'
        );
        if (!component) return resolve({ hasContainer: false });

        const content = `
            <div class="l-navcontainer__side">
                <div class="l-navcontainer__percent">
                </div>
            </div>
            <div class="l-navcontainer__wrap">
                <div class="l-navcontainer__scroll">
                    <div class="l-navcontainer__header">
                        <h2>
                            Drag or Scroll
                        </h2>
                    </div>
                    <component data-component="navigation"></component>
                </div>
            </div>
    `;

        const container = document.createElement('div');
        container.classList.add('l-navcontainer');
        container.innerHTML = content;

        core.useFrame(() => {
            component.parentNode.replaceChild(container, component);
            root = document.querySelector('.l-navcontainer');
            main = document.querySelector('main.main');
            navigationStore.watch('openNavigation', openNavigation);
            navigationStore.watch('closeNavigation', closeNavigation);
            addHandler();
            resolve({ hasContainer: true });
        });
    });
};
