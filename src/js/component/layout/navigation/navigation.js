//@ts-check

/**
 * @import { MobComponent, ReturnBindProps } from '../../../mob/mobjs/type';
 * @import { StaticProps, BindProps } from '../../../mob/mobjs/type';
 * @import { Navigation, NavigationSubmenu } from './type';
 **/

import { getCommonData } from '../../../data';
import { html } from '../../../mob/mobjs';

/**
 * @description
 * Create first level items.
 *
 * @param {object} param
 * @param {import('../../../data/type').CommonData['navigation']} param.data
 * @param {StaticProps} param.staticProps
 * @param {BindProps<Navigation,NavigationSubmenu>} param.bindProps
 * @param {Navigation['state']} param.proxi
 **/
function getItems({ data, staticProps, bindProps, proxi }) {
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
                                  (proxi.currentAccordionId = index),
                          })}
                          ${bindProps(
                              /** @returns{ReturnBindProps<NavigationSubmenu>} */
                              () => ({
                                  isOpen: proxi.currentAccordionId === index,
                              })
                          )}
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
    getProxi,
}) => {
    const proxi = getProxi();
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
                    bindProps,
                    proxi,
                })}
            </ul>
        </nav>
    `;
};
