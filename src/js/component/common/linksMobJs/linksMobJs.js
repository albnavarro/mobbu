//@ts-check

/**
 * @import { MobComponent, StaticProps } from '../../../mobjs/type';
 * @import { LinksMobJs } from './type';]
 **/

import { html, mainStore } from '../../../mobjs';
import { PAGE_TEMPLATE_DOCS_MOBJS } from '../../../pages';
import { linksSidebarScroller } from './animation/linksScroller';
import { items } from './data';

/**
 * @param {object} param
 * @param {Array<{label: string, url: string}>} param.data
 * @param {StaticProps} param.staticProps
 */
const getItems = ({ data, staticProps }) => {
    return data
        .map((item) => {
            const { label, url } = item;
            return html`<li>
                <links-mobjs-button
                    ${staticProps({
                        label,
                        url,
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
}) => {
    onMount(() => {
        const { screenEl, scrollerEl, scrollbar } = getRef();

        const { init, destroy, move } = linksSidebarScroller({
            screen: screenEl,
            scroller: scrollerEl,
            scrollbar,
        });

        init();
        move(0);

        scrollbar.addEventListener('input', () => {
            // @ts-ignore
            move?.(scrollbar.value);
        });

        mainStore.watch('activeRoute', (data) => {
            const { templateName } = data;

            if (templateName === PAGE_TEMPLATE_DOCS_MOBJS) {
                screenEl.classList.add('active');
            }

            if (templateName !== PAGE_TEMPLATE_DOCS_MOBJS) {
                screenEl.classList.remove('active');
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
            ${getItems({ staticProps, data: items })}
        </ul>
    </div>`;
};
