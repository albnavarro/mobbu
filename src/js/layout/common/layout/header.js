import { core } from '../../../mobbu';
import { componentListCreate } from '../baseComponent/componentList';
import { navigationStore } from '../navigation/navStore';

function addHandler({ button }) {
    // Toggle button
    button.addEventListener('click', () => {
        const { navigationIsOpen } = navigationStore.get('navigationIsOpen');

        if (navigationIsOpen) {
            button.classList.remove('open');
            navigationStore.emit('closeNavigation');
        } else {
            button.classList.add('open');
            navigationStore.emit('openNavigation');
        }

        navigationStore.set('navigationIsOpen', (state) => !state);
    });
}

function openInfo({ navInfo }) {
    navInfo.classList.add('open');
}

function closeInfo({ navInfo }) {
    navInfo.classList.remove('open');
}

export const createHeader = async () => {
    const component = document.querySelector('[data-component="header"]');
    if (!component) return;

    const content = await fetch('../partials/layout/header.html')
        .then((response) => response.text())
        .then((html) => html)
        .catch((err) => console.warn('Something went wrong.', err));

    const header = document.createElement('header');
    header.classList.add('l-header');
    header.innerHTML = content;

    core.useFrame(() => {
        component.parentNode.replaceChild(header, component);
        const root = document.querySelector('.l-header__container');
        const toggle = root.querySelector('.l-header__toggle');
        const navInfo = root.querySelector('.l-header__navinfo');
        navigationStore.watch('openNavigation', () => openInfo({ navInfo }));
        navigationStore.watch('closeNavigation', () => closeInfo({ navInfo }));
        addHandler({ button: toggle });

        /**
         * Create child component
         */
        componentListCreate({ element: root });
    });
};
