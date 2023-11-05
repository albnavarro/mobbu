import { getCommonData } from '../../../data';
import { html } from '../../../mobjs';

/**
 * Create first level items.
 */
function getItems({ data, staticProps, setState, bindProps }) {
    return data
        .map((item, index) => {
            const { label, url, children, section } = item;

            if (section) {
                return html`
                    <mob-navigation-label
                        ${staticProps({ label })}
                    ></mob-navigation-label>
                `;
            }

            return children
                ? html`
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
                : html`
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
export const Navigation = ({ html, staticProps, setState, bindProps }) => {
    const { navigation: data } = getCommonData();

    return html`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${getItems({ data, staticProps, setState, bindProps })}
            </ul>
        </nav>
    `;
};
