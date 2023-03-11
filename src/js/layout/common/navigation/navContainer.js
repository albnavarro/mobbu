import { core } from '../../../mobbu';
import { navigationStore } from './navStore';

let root = {};

function closeNavigation() {
    root.classList.remove('active');
    document.body.style.overflow = '';

    // Close all accordion item on navigation close.
    navigationStore.emit('closeAllItems');
}

function openNavigation() {
    root.classList.add('active');
    document.body.style.overflow = 'hidden';

    navigationStore.emit('refreshScroller');
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
            </div>
            <div class="l-navcontainer__wrap">
                <div class="l-navcontainer__scroll">
                    <div class="l-navcontainer__header">
                        <h2>
                            header
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
            resolve({ hasContainer: true });
            navigationStore.watch('openNavigation', openNavigation);
            navigationStore.watch('closeNavigation', closeNavigation);
        });
    });
};
