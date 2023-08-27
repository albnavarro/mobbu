import { getCommonData } from '../../../data';

/**
 * Create first level items.
 */
function getItems(data, staticProps) {
    return data
        .map((item) => {
            const { label, url, children } = item;

            const { DOM } = children
                ? {
                      DOM: /* HTML */ `
                          <NavigationSubmenu
                              ${staticProps({
                                  headerButton: {
                                      label,
                                      url,
                                  },
                                  children,
                              })}
                          >
                          </NavigationSubmenu>
                      `,
                  }
                : {
                      hasChildrenClass: '',
                      DOM: /* HTML */ `
                          <li class="l-navigation__item">
                              <NavigationButton
                                  ${staticProps({
                                      label,
                                      url,
                                      arrowClass: '',
                                      fireRoute: true,
                                  })}
                              ></NavigationButton>
                          </li>
                      `,
                  };

            return /* HTML */ `
                ${DOM}</li>
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
