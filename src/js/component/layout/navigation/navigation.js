//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { StaticProps, SetState, BindProps } from '../../../mobjs/type';
 * @import { Navigation, NavigationSubmenu } from './type';
 **/

import { getCommonData } from '../../../data';
import { html } from '../../../mobjs';

/**
 * @description
 * Create first level items.
 *
 * @param {object} param
 * @param {import('../../../data/type').CommonData['navigation']} param.data
 * @param {StaticProps} param.staticProps
 * @param {SetState<Navigation>} param.setState
 * @param {BindProps<Navigation,NavigationSubmenu>} param.bindProps
 **/
function getItems({ data, staticProps, setState, bindProps }) {
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

/** @type {MobComponent<Navigation>} */
export const NavigationFn = ({
    staticProps,
    setState,
    bindProps,
    addMethod,
}) => {
    const { navigation: data } = getCommonData();

    /**
     * Close all accordion.
     */
    addMethod('closeAllAccordion', ({ fireCallback = true } = {}) => {
        setState('currentAccordionId', -1, { emit: fireCallback });
    });

    return html`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${getItems({
                    data,
                    staticProps,
                    setState,
                    bindProps,
                })}
            </ul>
        </nav>
    `;
};
