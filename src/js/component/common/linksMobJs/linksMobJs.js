//@ts-check

/**
 * @import { MobComponent, StaticProps } from '../../../mobjs/type';
 * @import { LinksMobJs } from './type';]
 **/

import { html } from '../../../mobjs';
import { linksSidebarScroller } from './animation/linksScroller';
import { items } from './data';

const data = {
    mobjs: items,
};

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
    getState,
    setRef,
    getRef,
    onMount,
}) => {
    const { section } = getState();

    onMount(() => {
        const { screenEl, scrollerEl, scrollbar } = getRef();

        const { move } = linksSidebarScroller({
            screen: screenEl,
            scroller: scrollerEl,
            scrollbar,
        });

        scrollbar.addEventListener('input', () => {
            // @ts-ignore
            move(scrollbar.value);
        });

        move(0);

        return () => {};
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
            ${getItems({ staticProps, data: data?.[section] ?? [] })}
        </ul>
    </div>`;
};
