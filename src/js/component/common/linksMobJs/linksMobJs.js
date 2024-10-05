//@ts-check

/**
 * @import { BindProps, GetState, MobComponent,  StaticProps } from '../../../mobjs/type';
 * @import { LinksMobJs, LinksMobJsButton } from './type';]
 **/

import { html, mainStore, tick } from '../../../mobjs';
import { PAGE_TEMPLATE_DOCS_MOBJS } from '../../../pages';
import { navigationStore } from '../../layout/navigation/store/navStore';
import { linksSidebarScroller } from './animation/linksScroller';
import { mobJsComponentParams } from './data';

const templateData = {
    [PAGE_TEMPLATE_DOCS_MOBJS]: mobJsComponentParams,
};

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
}) => {
    onMount(() => {
        const { screenEl, scrollerEl, scrollbar } = getRef();

        let init;
        let destroy;
        let move;
        let isActive = false;

        scrollbar.addEventListener('input', () => {
            // @ts-ignore
            move?.(scrollbar.value);
        });

        navigationStore.watch('navigationIsOpen', (value) => {
            const {
                activeRoute: { templateName },
            } = mainStore.get();

            if (!(templateName in templateData)) return;

            screenEl.classList.toggle('active', !value);
        });

        mainStore.watch('afterRouteChange', async (data) => {
            const { templateName, route } = data;
            const currentData = templateData?.[templateName] ?? [];
            setState('data', currentData);

            /**
             * Await list was created, then create scroller
             */
            await tick();

            setState('activeSection', route);

            if (currentData.length > 0) {
                screenEl.classList.add('active');
                if (isActive) return;

                const methods = linksSidebarScroller({
                    screen: screenEl,
                    scroller: scrollerEl,
                    scrollbar,
                });

                init = methods.init;
                destroy = methods.destroy;
                move = methods.move;
                isActive = true;
                init();
                move(0);
            }

            if (currentData.length === 0) {
                screenEl.classList.remove('active');
                destroy?.();
                isActive = false;
            }
        });

        return () => {
            destroy?.();
        };
    });

    return html`<div class="c-params-mobjs" ${setRef('screenEl')}>
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
