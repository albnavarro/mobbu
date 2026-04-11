/**
 * @import {
 *   BindProps,
 *   MobComponent,
 *   ReturnBindProps,
 *   StaticProps
 * } from "@mobJsType"
 * @import {NavigationButton} from "./navigation-button/type"
 * @import {NavigationLabel} from "./navigation-label/type"
 * @import {NavigationSubmenu} from "./navigation-submenu/type"
 * @import {Navigation} from "./type"
 */

import { fromObject } from '@mobJs';
import { getCommonData } from '@data/index';

/**
 * Create first level items.
 *
 * @param {object} param
 * @param {import('../../../../data/type').CommonData['navigation']} param.data
 * @param {StaticProps} param.staticProps
 * @param {BindProps<Navigation, NavigationSubmenu>} param.bindProps
 * @param {Navigation['state']} param.proxi
 */
function getItems({ data, staticProps, bindProps, proxi }) {
    return data.map((item, index) => {
        const {
            label,
            url,
            activeId,
            children,
            section,
            sectioName,
            scrollToSection,
            forceChildren,
            hide,
        } = item;

        if (section) {
            return fromObject({
                tag: 'mob-navigation-label',
                modules: staticProps(
                    /** @type {NavigationLabel['props']} */ ({
                        label,
                        sectioName,
                        hide: !!hide,
                    })
                ),
            });
        }

        return children
            ? fromObject({
                  tag: 'mob-navigation-submenu',
                  modules: [
                      staticProps(
                          /** @type {NavigationSubmenu['state']} */
                          {
                              headerButton: {
                                  label,
                                  url,
                                  id: index,
                              },
                              children,
                              callback: ({ forceClose = false }) => {
                                  if (forceClose) {
                                      proxi.currentAccordionId = -1;
                                      return;
                                  }

                                  proxi.currentAccordionId = index;
                              },
                          }
                      ),
                      bindProps(
                          /** @returns {ReturnBindProps<NavigationSubmenu>} */
                          () => ({
                              isOpen: proxi.currentAccordionId === index,
                          })
                      ),
                  ],
              })
            : fromObject({
                  tag: 'li',
                  content: {
                      tag: 'mob-navigation-button',
                      modules: staticProps(
                          /** @type {NavigationButton['props']} */ ({
                              label,
                              url,
                              scrollToSection: scrollToSection ?? 'no-scroll',
                              activeId: activeId ?? -1,
                              forceChildren: forceChildren ?? [],
                          })
                      ),
                  },
              });
    });
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
        setState(() => proxi.currentAccordionId, -1, { emit: fireCallback });
    });

    return fromObject({
        className: 'l-navigation',
        content: {
            tag: 'ul',
            className: 'list',
            content: getItems({
                data,
                staticProps,
                bindProps,
                proxi,
            }),
        },
    });
};
