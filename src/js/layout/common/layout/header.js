import data from '../../../../data/header.json';
import { core } from '../../../mobbu';
import { componentListCreate } from '../baseComponent/componentList';
import { navigationStore } from '../navigation/navStore';

function getLinks() {
    const { links } = data;

    return links
        .map((link) => {
            const { label, url } = link;
            return `
                <li class="l-header__sidenav__item">
                    <a href="${url}" class="l-header__sidenav__link">
                        ${label}
                    </a>
                </li>
            `;
        })
        .join('');
}

function getTitle() {
    const { title } = data;
    return `
        <h1 class="l-header__title">
            ${title}
        </h1>
    `;
}

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

export const createHeader = () => {
    const component = document.querySelector('[data-component="header"]');
    if (!component) return;

    const { homeUrl } = data;
    const content = `
        <div class="l-header__container">
            <div class="l-header__grid">
                <button type="button" class="l-header__toggle">
                </button>
                <div class="l-header__title">
                    <a href="${homeUrl}">
                        ${getTitle()}
                    </a>
                </div>
                <div class="l-header__utils">
                    <ul class="l-header__sidenav">
                        ${getLinks()}
                    </ul>
                </div>
            </div>
            <div class="l-header__navinfo">
                <p class="p--small">
                    Drag or Scroll
                </p>
                <component
                    data-component="code_button"
                    data-js="/js",
                    data-scss="/scss",
                    data-html="/html",
                    data-style="primary">
                </component>
                <component
                    data-component="code_button"
                    data-js="/js",
                    data-scss="/scss",
                    data-html="/html2",
                    data-style="primary">
                </component>
            </div>
        </div>
`;

    const header = document.createElement('header');
    header.classList.add('l-header');
    header.innerHTML = content;
    core.useFrame(() => {
        component.parentNode.replaceChild(header, component);
        const root = document.querySelector('.l-header__container');
        const toggle = root.querySelector('.l-header__toggle');
        const navInfo = root.querySelector('.l-header__navinfo');

        componentListCreate({ element: root });

        navigationStore.watch('openNavigation', () => openInfo({ navInfo }));
        navigationStore.watch('closeNavigation', () => closeInfo({ navInfo }));
        addHandler({ button: toggle });
    });
};
