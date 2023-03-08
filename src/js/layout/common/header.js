import data from '../../../data/header.json';
import { core } from '../../mobbu';

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

function getSubtitle() {
    const { subtitle } = data;
    return `
        <h2 class="l-header__subtitle">
            ${subtitle}
        </h2>
    `;
}

export const createHeader = () => {
    const component = document.querySelector('[data-component="header"]');
    if (!component) return;

    const { homeUrl } = data;
    const content = `
        <div class="container l-header__container">
            <div class="l-header__grid">
                <div class="l-header__col">
                    <a href="${homeUrl}">
                        ${getTitle()}
                        ${getSubtitle()}
                    </a>
                </div>
                <div class="l-header__col l-header__col--dx">
                    <ul class="l-header__sidenav">
                        ${getLinks()}
                    </ul>
                </div>
            </div>
        </div>
`;

    const header = document.createElement('header');
    header.classList.add('l-header');
    header.innerHTML = content;
    core.useFrame(() => {
        component.parentNode.replaceChild(header, component);
    });
};
