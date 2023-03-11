import { navigationStore } from '.';
import { core } from '../../../mobbu';

let isOpen = false;

/**
 * Add Open/Close handler
 */
function addHandler({ root } = {}) {
    const button = root.querySelector('.l-navcontainer__toggle');

    button.addEventListener('click', () => {
        if (isOpen) {
            root.classList.remove('active');
            button.classList.remove('open');
            document.body.style.overflow = '';

            // Close all accordion item on navigation close.
            navigationStore.emit('closeAllItems');
        } else {
            root.classList.add('active');
            button.classList.add('open');
            document.body.style.overflow = 'hidden';

            // Refresh scroller on open
            navigationStore.emit('refreshScroller');
        }

        isOpen = !isOpen;
    });
}

/**
 * Create container
 */
export const createNavContainer = () => {
    return new Promise((resolve) => {
        const component = document.querySelector(
            '[data-component="navigation_container"]'
        );
        if (!component) return resolve({ hasContainer: false });

        const content = `
            <div class="l-navcontainer__side">
                <button class="l-navcontainer__toggle">
                    <span></span>
                </button>
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
            const root = document.querySelector('.l-navcontainer');
            addHandler({ root });
            resolve({ hasContainer: true });
        });
    });
};
