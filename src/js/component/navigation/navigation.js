import { createProps } from '../../baseComponent/mainStore';
import { getCommonData } from '../../route';

/**
 * Create second levels item.
 */
function getSubmenu(items) {
    return items
        .map((item) => {
            const { label, url } = item;
            const props = createProps({
                label,
                url,
                ...{ subMenuClass: 'l-navigation__link--submenu' },
            });

            return `
                <li class="l-navigation__submenu__item">
                    <component data-props="${props}" data-component="NavigationButton"/>
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

            const { hasChildrenClass, arrowClass, submenu } = children
                ? {
                      hasChildrenClass: 'has-child',
                      arrowClass: 'l-navigation__link--arrow',
                      submenu: `
                        <ul class="l-navigation__submenu">
                            ${getSubmenu(children)}
                        </ul>
                        `,
                  }
                : {
                      hasChildrenClass: '',
                      arrowClass: '',
                      submenu: '',
                  };

            const props = createProps({
                label,
                url,
                arrowClass,
                subMenuClass: '',
            });

            return `
                <li class="l-navigation__item ${hasChildrenClass}">
                    <component data-props="${props}" data-component="NavigationButton"/>
                    ${submenu}
                </li>
            `;
        })
        .join('');
}

/**
 * inizialize module
 */
export const Navigation = ({ render }) => {
    const { navigation: data } = getCommonData();

    return render(`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
             ${getItems(data)}
            </ul>
        </nav>
    `);
};
