import { getCommonData } from '../../../data';
import { html } from '../../../mobjs';
import { navigationStore } from './store/navStore';

/**
 * Create first level items.
 */
function getItems({ data, staticProps, setState, bindProps, bindEvents }) {
    return data
        .map((item, index) => {
            const {
                label,
                url,
                activeId,
                children,
                section,
                sectioName,
                scrollToSection,
            } = item;

            if (section) {
                return html`
                    <mob-navigation-label
                        ${staticProps({ label, sectioName })}
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
                              ${bindEvents({
                                  click: () => {
                                      // Close accordion if click first level button.
                                      //setState('currentAccordionId', -1);
                                  },
                              })}
                              ${staticProps({
                                  label,
                                  url,
                                  scrollToSection:
                                      scrollToSection ?? 'no-scroll',
                                  activeId: activeId ?? -1,
                              })}
                          ></mob-navigation-button>
                      </li>
                  `;
        })
        .join('');
}

/**
 * @param {import('../../../mobjs/type').componentType} param
 */
export const Navigation = ({
    html,
    staticProps,
    setState,
    bindProps,
    bindEvents,
}) => {
    const { navigation: data } = getCommonData();

    /**
     * Close all accordion.
     */
    navigationStore.watch('closeAllAccordion', () => {
        setState('currentAccordionId', -1);
    });

    return html`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${getItems({
                    data,
                    staticProps,
                    setState,
                    bindProps,
                    bindEvents,
                })}
            </ul>
        </nav>
    `;
};
