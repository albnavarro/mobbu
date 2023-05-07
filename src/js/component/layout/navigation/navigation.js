import { createProps } from '../../../mobjs';
import { getCommonData } from '../../../mobjs/route';

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

            return /* HTML */ `
                <li class="l-navigation__submenu__item">
                    <NavigationButton data-props="${props}"></NavigationButton>
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

            const { hasChildrenClass, arrowClass, submenu, fireRoute } =
                children
                    ? {
                          hasChildrenClass: 'has-child',
                          arrowClass: 'l-navigation__link--arrow',
                          submenu: /* HTML */ `
                              <ul class="l-navigation__submenu">
                                  ${getSubmenu(children)}
                              </ul>
                          `,
                          fireRoute: false,
                      }
                    : {
                          hasChildrenClass: '',
                          arrowClass: '',
                          submenu: '',
                          fireRoute: true,
                      };

            const props = createProps({
                label,
                url,
                arrowClass,
                subMenuClass: '',
                fireRoute,
            });

            return /* HTML */ `
                <li class="l-navigation__item ${hasChildrenClass}">
                    <NavigationButton data-props="${props}"></NavigationButton>
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

    return render(/* HTML */ `
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${getItems(data)}
            </ul>
        </nav>
    `);
};
