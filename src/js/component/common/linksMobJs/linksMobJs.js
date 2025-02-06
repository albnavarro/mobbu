//@ts-check

/**
 * @import { BindProps, GetState, MobComponent,  StaticProps } from '../../../mobjs/type';
 * @import { LinksMobJs, LinksMobJsButton } from './type';]
 **/

import { getCommonData } from '../../../data';
import { afterRouteChange, getActiveRoute, html, tick } from '../../../mobjs';
import {
    PAGE_TEMPLATE_COMPONENT_MOBJS,
    PAGE_TEMPLATE_TRAVERSAL_MOBJS,
} from '../../../pages';
import { navigationStore } from '../../layout/navigation/store/navStore';
import { verticalScroller } from '../../lib/animation/verticalScroller';

/**
 * @param {object} param
 * @param {StaticProps} param.staticProps
 * @param {GetState<LinksMobJs>} param.getState
 * @param {BindProps<LinksMobJs, LinksMobJsButton>} param.bindProps
 */
const getItems = ({ staticProps, getState, bindProps }) => {
    const { data } = getState();

    return data
        .map((item) => {
            const { label, url, isLabel } = item;

            return isLabel
                ? html`<h3 class="c-params-mobjs__label">${label}</h3>`
                : html`<li>
                      <links-mobjs-button
                          ${staticProps({
                              label,
                              url,
                          })}
                          ${bindProps({
                              bind: ['activeSection'],
                              props: ({ activeSection }) => {
                                  return {
                                      active: activeSection === url,
                                  };
                              },
                          })}
                      ></links-mobjs-button>
                  </li>`;
        })
        .join('');
};

/** @type {MobComponent<LinksMobJs>} */
export const LinksMobJsFn = ({
    html,
    staticProps,
    setRef,
    getRef,
    onMount,
    setState,
    bindProps,
    invalidate,
    getState,
    bindEffect,
}) => {
    const mainData = getCommonData();

    /** @type{Record<string, any>} */
    const templateData = {
        [PAGE_TEMPLATE_COMPONENT_MOBJS]:
            mainData.sideBarLinks.mobJsComponentParams,
        [PAGE_TEMPLATE_TRAVERSAL_MOBJS]: mainData.sideBarLinks.mobJsTraversal,
    };

    onMount(() => {
        const { screenEl, scrollerEl, scrollbar } = getRef();

        // eslint-disable-next-line unicorn/consistent-function-scoping
        let init = () => {};
        // eslint-disable-next-line unicorn/consistent-function-scoping
        let destroy = () => {};
        // eslint-disable-next-line unicorn/consistent-function-scoping
        let move = () => {};
        // eslint-disable-next-line unicorn/consistent-function-scoping
        let updateScroller = () => {};
        // eslint-disable-next-line unicorn/consistent-function-scoping
        let hideScrolBar = () => {};

        let isActive = false;

        scrollbar.addEventListener('input', () => {
            // @ts-ignore
            move?.(scrollbar.value);
        });

        navigationStore.watch('navigationIsOpen', (value) => {
            const { templateName } = getActiveRoute();
            if (!(templateName in templateData)) return;
            setState('hide', !value);
        });

        const unsubscribeRoute = afterRouteChange(
            async ({ templateName, route }) => {
                const currentData = templateData?.[templateName] ?? [];
                setState('data', currentData);

                /**
                 * Await list was created, then create scroller
                 */
                await tick();
                setState('activeSection', route);

                if (currentData.length > 0) {
                    setState('hide', true);

                    /**
                     * Update scroller
                     */
                    if (isActive) {
                        updateScroller();
                        hideScrolBar();
                        return;
                    }

                    /**
                     * Create scroller
                     */
                    // @ts-ignore
                    ({ init, destroy, move, updateScroller, hideScrolBar } =
                        verticalScroller({
                            screen: screenEl,
                            scroller: scrollerEl,
                            scrollbar,
                        }));

                    isActive = true;
                    init();
                    updateScroller();
                    // @ts-ignore
                    move(0);
                    hideScrolBar();
                }

                if (currentData.length === 0) {
                    setState('hide', false);
                    destroy?.();
                    isActive = false;
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

    return html`<div
        class="c-params-mobjs"
        ${setRef('screenEl')}
        ${bindEffect({
            bind: 'hide',
            toggleClass: { active: () => getState().hide },
        })}
    >
        <input
            type="range"
            id="test"
            name="test"
            min="0"
            max="100"
            value="0"
            step=".5"
            ${setRef('scrollbar')}
            class="c-params-mobjs__scrollbar"
        />
        <ul ${setRef('scrollerEl')}>
            ${invalidate({
                bind: ['data'],
                persistent: true,
                render: () => {
                    return getItems({
                        staticProps,
                        bindProps,
                        getState,
                    });
                },
            })}
        </ul>
    </div>`;
};
