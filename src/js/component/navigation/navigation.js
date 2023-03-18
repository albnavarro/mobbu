import { getCommonData } from '../../route';
import { navAccordion } from './navAccordion';
import { navigationScoller } from './navScroller';

/**
 * Create second levels item.
 */
function getSubmenu(items) {
    return items
        .map((item) => {
            const { label, url } = item;

            return `
            <li class="l-navigation__submenu__item">
                <a class="l-navigation__link l-navigation__link--submenu" href="${url}">
                    ${label}
                </a>
            </li>
        `;
        })
        .join('');
}

/**
 * Create first level items.
 */
function getItems(data) {
    return data
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

/**
 * inizialize module
 */
export const Navigation = ({ render, onMount }) => {
    onMount(() => {
        navAccordion();
        navigationScoller();
    });

    const { navigation: data } = getCommonData();

    return render(`
         <ul class="l-navigation__list">
             ${getItems(data)}
         </ul>
    `);
};
