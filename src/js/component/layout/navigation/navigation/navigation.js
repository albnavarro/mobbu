import { htmlObject } from '@mobJs';
import { getCommonData } from '@data/index';
import { NavigationLabel } from './navigation-label/definition';
import { NavigationSubmenu } from './navigation-submenu/definition';
import { NavigationButton } from './navigation-button/definition';

/**
 * @import {
 *   BindProps,
 *   MobComponent,
 *   ReturnBindProps,
 *   StaticProps
 * } from "@mobJsType"
 * @import {NavigationButtonType} from "./navigation-button/type"
 * @import {NavigationLabelType} from "./navigation-label/type"
 * @import {NavigationSubmenuType} from "./navigation-submenu/type"
 * @import {Navigation} from "./type"
 */

/**
 * Create first level items.
 *
 * @param {object} param
 * @param {import('../../../../data/type').CommonData['navigation']} param.data
 * @param {StaticProps} param.staticProps
 * @param {BindProps<Navigation, NavigationSubmenuType>} param.bindProps
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
            return htmlObject({
                component: NavigationLabel,
                modules: staticProps(
                    /** @type {NavigationLabelType['props']} */ ({
                        label,
                        sectioName,
                        hide: !!hide,
                    })
                ),
            });
        }

        return children
            ? htmlObject({
                  component: NavigationSubmenu,
                  modules: [
                      staticProps(
                          /** @type {NavigationSubmenuType['state']} */
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
                          /** @returns {ReturnBindProps<NavigationSubmenuType>} */
                          () => ({
                              isOpen: proxi.currentAccordionId === index,
                          })
                      ),
                  ],
              })
            : htmlObject({
                  tag: 'li',
                  content: {
                      component: NavigationButton,
                      modules: staticProps(
                          /** @type {NavigationButtonType['props']} */ ({
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

    return htmlObject({
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
