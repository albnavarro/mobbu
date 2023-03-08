import { core } from '../../../mobbu';
import { items } from '../../../../data/navigation.json';

function getSubmenu(items) {
    return items
        .map((item) => {
            const { label, url } = item;

            return `
            <li class="l-navigation__submenu__item">
                <a class="l-navigation__link" href="${url}">
                    ${label}
                </a>
            </li>
        `;
        })
        .join('');
}

function getItems() {
    return items
        .map((item) => {
            const { label, url, children } = item;

            const { hasChildrenClass, linkTag, arrowClass, submenu } = children
                ? {
                      hasChildrenClass: 'has-child',
                      linkTag: 'button',
                      arrowClass: 'l-navigation__link--arrow',
                      submenu: `
                        <ul class="l-navigation__submenu">
                            ${getSubmenu(children)}
                        </ul>
                        `,
                  }
                : {
                      hasChildrenClass: '',
                      linkTag: 'a',
                      arrowClass: '',
                      submenu: '',
                  };

            return `
                <li class="l-navigation__item ${hasChildrenClass}">
                    <${linkTag} class="l-navigation__link ${arrowClass}" href="${url}">
                        ${label}
                    </${linkTag}>
                    ${submenu}
                </li>
            `;
        })
        .join('');
}

export const navigation = () => {
    return new Promise((resolve) => {
        const component = document.querySelector(
            '[data-component="navigation"]'
        );
        if (!component) return resolve({ active: false });

        const content = `
            <ul class="l-navigation__list">
                ${getItems()}
            </ul>
            `;

        const nav = document.createElement('nav');
        nav.classList.add('l-navigation');
        nav.innerHTML = content;
        core.useFrame(() => {
            component.parentNode.replaceChild(nav, component);
            resolve({ active: true });
        });
    });
};
