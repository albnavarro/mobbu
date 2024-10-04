//@ts-check

/**
 * @import { BindProps, MobComponent,  StaticProps } from '../../../mobjs/type';
 * @import { LinksMobJs, LinksMobJsButton } from './type';]
 **/

import { html, mainStore } from '../../../mobjs';
import { PAGE_TEMPLATE_DOCS_MOBJS } from '../../../pages';
import { linksSidebarScroller } from './animation/linksScroller';
import { items } from './data';

/**
 * @param {object} param
 * @param {Array<{label: string, url: string}>} param.data
 * @param {StaticProps} param.staticProps
 * @param {BindProps<LinksMobJs, LinksMobJsButton>} param.bindProps
 */
const getItems = ({ data, staticProps, bindProps }) => {
    return data
        .map((item) => {
            const { label, url } = item;
            return html`<li>
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

        mainStore.watch('activeRoute', (data) => {
            const { templateName, route } = data;
            setState('activeSection', route);

            if (templateName === PAGE_TEMPLATE_DOCS_MOBJS) {
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

            if (templateName !== PAGE_TEMPLATE_DOCS_MOBJS) {
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
            ${getItems({
                staticProps,
                bindProps,
                data: items,
            })}
        </ul>
    </div>`;
};
