import { getCommonData } from '../../../data';

/**
 * Create first level items.
 */
function getItems(data, staticProps) {
    return data
        .map((item) => {
            const { label, url, children } = item;

            const { hasChildrenClass, arrowClass, submenu, fireRoute } =
                children
                    ? {
                          hasChildrenClass: 'has-child',
                          arrowClass: 'l-navigation__link--arrow',
                          submenu: /* HTML */ `
                              <NavigationSubmenu ${staticProps({ children })}>
                              </NavigationSubmenu>
                          `,
                          fireRoute: false,
                      }
                    : {
                          hasChildrenClass: '',
                          arrowClass: '',
                          submenu: '',
                          fireRoute: true,
                      };

            return /* HTML */ `
                <li class="l-navigation__item ${hasChildrenClass}">
                    <NavigationButton
                        ${staticProps({
                            label,
                            url,
                            arrowClass,
                            subMenuClass: '',
                            fireRoute,
                        })}
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
export const Navigation = ({ render, staticProps }) => {
    const { navigation: data } = getCommonData();

    return render(/* HTML */ `
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${getItems(data, staticProps)}
            </ul>
        </nav>
    `);
};
