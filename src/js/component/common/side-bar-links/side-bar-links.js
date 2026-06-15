import { verticalScroller } from '@componentLibs/animation/vertical-scroller';
import { getCommonData } from '@data/index';
import { htmlObject, MobJs } from '@mobJs';
import { PAGE_TEMPLATE_COMPONENT_MOBJS } from '../../../pages';
import { navigationStore } from '@stores/navigation';
import { SideBarLinksButton } from './side-bar-links-button/definition';

/**
 * @import {
 *   BindProps,
 *   MobComponent,
 *   ProxiSelfState,
 *   StaticProps
 * } from '@mobJsType'
 * @import {SideBarLinksButtonType} from './side-bar-links-button/type'
 * @import {SideBarLinks} from './type'
 */

/**
 * This component is a singleton so use module scope.
 */
let init = () => {};
let destroy = () => {};
let updateScroller = () => {};

/** @type {(arg0: number) => void} */
let move = () => {};

/**
 * @param {object} param
 * @param {StaticProps} param.staticProps
 * @param {BindProps<SideBarLinks, SideBarLinksButtonType>} param.bindProps
 * @param {ProxiSelfState<SideBarLinks>} param.proxi
 */
const getItems = ({ staticProps, bindProps, proxi }) => {
    return proxi.data.map((item) => {
        const { label, url, isLabel } = item;

        return isLabel
            ? htmlObject({
                  tag: 'li',
                  content: {
                      tag: 'p',
                      className: 'label',
                      content: label,
                  },
              })
            : htmlObject({
                  tag: 'li',
                  content: {
                      component: SideBarLinksButton,
                      modules: [
                          staticProps(
                              /** @type {SideBarLinksButtonType['props']} */ ({
                                  label,
                                  url,
                              })
                          ),
                          bindProps(() => ({
                              active: proxi.activeSection === url,
                          })),
                      ],
                  },
              });
    });
};

/** @type {MobComponent<SideBarLinks>} */
export const SideBarLinksFn = ({
    staticProps,
    setRef,
    getRef,
    onMount,
    bindProps,
    invalidate,
    bindEffect,
    getSelfProxi,
    getBoundedProxi,
    addMethod,
}) => {
    const mainData = getCommonData();
    const proxi = getSelfProxi();
    const bindProxi = getBoundedProxi();

    /** @type{Record<string, any>} */
    const templateData = {
        [PAGE_TEMPLATE_COMPONENT_MOBJS]:
            mainData.sideBarLinks.mobJsComponentParams,
    };

    onMount(({ element }) => {
        const { screenEl, scrollerEl, scrollbar } = getRef();
        let isActive = false;

        addMethod('getRoot', () => element);

        scrollbar.addEventListener('input', () => {
            // @ts-ignore
            move?.(scrollbar.value);
        });

        navigationStore.watch('navigationIsOpen', (value) => {
            const { templateName } = MobJs.getActiveRoute();
            if (!(templateName in templateData)) return;
            proxi.disable = value;
        });

        const unsubscribeRoute = MobJs.afterRouteChange(
            async ({ currentTemplate, currentRoute }) => {
                const currentData = templateData?.[currentTemplate] ?? [];
                proxi.data = currentData;

                /**
                 * Await list was created, then create scroller
                 */
                await MobJs.tick();
                proxi.activeSection = currentRoute;

                if (currentData.length > 0) {
                    proxi.hide = false;
                    element.hidden = false;

                    /**
                     * Update scroller
                     */
                    if (isActive) {
                        updateScroller();
                        return;
                    }

                    /**
                     * Create scroller
                     */
                    // @ts-ignore
                    ({ init, destroy, move, updateScroller } = verticalScroller(
                        {
                            screen: screenEl,
                            scroller: scrollerEl,
                            scrollbar,
                            fixedTab: false,
                        }
                    ));

                    isActive = true;
                    init();
                    updateScroller();
                    move(0);
                }

                if (currentData.length === 0) {
                    proxi.hide = true;
                    destroy?.();
                    isActive = false;

                    /**
                     * Restore position of element scrolled with tab.
                     */
                    getRef().screenEl.scrollTop = 0;
                    element.hidden = true;
                }
            }
        );

        return () => {
            destroy?.();
            unsubscribeRoute();
            init = () => {};
            destroy = () => {};
            move = () => {};
            updateScroller = () => {};
        };
    });

    return htmlObject({
        tag: 'aside',
        className: 'c-sidebar-links',
        attributes: {
            'aria-label': 'Secondary navigation right',
        },
        modules: [
            setRef('rootEl'),
            bindEffect({
                toggleClass: {
                    hide: () => proxi.hide,
                    disable: () => proxi.disable,
                    visible: () => bindProxi.leftSidebarIsVisible,
                },
                toggleAttribute: {
                    inert: () => (bindProxi.shouldApplyInert ? true : null),
                },
            }),
        ],
        content: [
            {
                className: 'title',
                content: 'Component params:',
            },
            {
                tag: 'input',
                className: 'scrollbar hide-scrollbar',
                attributes: {
                    type: 'range',
                    id: 'test',
                    name: 'test',
                    min: 0,
                    max: 100,
                    value: 0,
                    step: 0.5,
                    tabindex: '-1',
                },
                modules: setRef('scrollbar'),
            },
            {
                tag: 'nav',
                className: 'screen',
                attributes: {
                    'aria-label': 'Related pages',
                },
                modules: setRef('screenEl'),
                content: [
                    {
                        tag: 'ul',
                        modules: setRef('scrollerEl'),
                        content: invalidate({
                            observe: () => proxi.data,
                            render: () => {
                                return getItems({
                                    staticProps,
                                    bindProps,
                                    proxi,
                                });
                            },
                        }),
                    },
                ],
            },
        ],
    });
};
