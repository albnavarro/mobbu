import { core } from '../../../mobbu';

let isOpen = false;

function addHandler({ root } = {}) {
    const button = root.querySelector('.l-navcontainer__toggle');

    button.addEventListener('click', () => {
        if (isOpen) {
            root.classList.remove('active');
            button.classList.remove('open');
        } else {
            root.classList.add('active');
            button.classList.add('open');
        }

        isOpen = !isOpen;
    });
}

export const createNavContainer = () => {
    return new Promise((resolve) => {
        const component = document.querySelector(
            '[data-component="navigation_container"]'
        );
        if (!component) return resolve();

        const content = `
        <div class="l-navcontainer__side">
            <button class="l-navcontainer__toggle">
                <span></span>
            </button>
        </div>
        <div class="l-navcontainer__wrap">
            <div class="l-navcontainer__header">
            </div>
            <component data-component="navigation"></component>
        </div>
    `;

        const container = document.createElement('div');
        container.classList.add('l-navcontainer');
        container.innerHTML = content;

        core.useFrame(() => {
            component.parentNode.replaceChild(container, component);
            const root = document.querySelector('.l-navcontainer');
            addHandler({ root });
            resolve();
        });
    });
};
