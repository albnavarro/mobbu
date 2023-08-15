import { getCommonData } from '../../../data';
import { staticProps } from '../../../mobjs';

/**
 * Create second levels item.
 */
function getSubmenu(items) {
    return items
        .map((item) => {
            const { label, url } = item;
            const props = staticProps({
                label,
                url,
                ...{ subMenuClass: 'l-navigation__link--submenu' },
            });

            return /* HTML */ `
                <li class="l-navigation__submenu__item">
                    <NavigationButton
                        data-staticprops="${props}"
                    ></NavigationButton>
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

            const props = staticProps({
                label,
                url,
                arrowClass,
                subMenuClass: '',
                fireRoute,
            });

            return /* HTML */ `
                <li class="l-navigation__item ${hasChildrenClass}">
                    <NavigationButton
                        data-staticprops="${props}"
                    ></NavigationButton>
                    ${submenu}
                </li>
            `;
        })
        .join('');
}

/**
 * @param {import('../../../mobjs/type').componentType}
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
