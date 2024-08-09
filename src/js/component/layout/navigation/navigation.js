//@ts-check

import { getCommonData } from '../../../data';
import { html } from '../../../mobjs';
import { navigationStore } from './store/navStore';

/**
 * @description
 * Create first level items.
 *
 * @param {object} param
 * @param {any} param.data
 * @param {import('../../../mobjs/type').StaticProps} param.staticProps
 * @param {import('../../../mobjs/type').SetState<import('./type').Navigation>} param.setState
 * @param {import('../../../mobjs/type').BindProps<import('./type').Navigation,import('./type').NavigationSubmenu>} param.bindProps
 * @param {import('../../../mobjs/type').BindEvents} param.bindEvents
 *
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
 * @type {import('../../../mobjs/type').mobComponent<import('./type').Navigation>}
 */
export const NavigationFn = ({
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
