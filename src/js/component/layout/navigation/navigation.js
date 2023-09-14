import { getCommonData } from '../../../data';

/**
 * Create first level items.
 */
function getItems({ data, staticProps, setState, bindProps }) {
    return data
        .map((item, index) => {
            const { label, url, children } = item;

            return children
                ? /* HTML */ `
                      <mob-navigation-submenu
                          ${staticProps({
                              headerButton: {
                                  label,
                                  url,
                              },
                              children,
                              callback: () =>
                                  setState('currentAccordionId', index),
                          })}
                          ${bindProps({
                              bind: ['currentAccordionId'],
                              props: ({ currentAccordionId }) => {
                                  return {
                                      isOpen: currentAccordionId === index,
                                  };
                              },
                          })}
                      >
                      </mob-navigation-submenu>
                  `
                : /* HTML */ `
                      <li class="l-navigation__item">
                          <mob-navigation-button
                              ${staticProps({
                                  label,
                                  url,
                              })}
                          ></mob-navigation-button>
                      </li>
                  `;
        })
        .join('');
}

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const Navigation = ({ render, staticProps, setState, bindProps }) => {
    const { navigation: data } = getCommonData();

    return render(/* HTML */ `
        <mob-navigation class="l-navigation">
            <ul class="l-navigation__list">
                ${getItems({ data, staticProps, setState, bindProps })}
            </ul>
        </mob-navigation>
    `);
};
