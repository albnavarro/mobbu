//@ts-check

import { html } from '../../../mobjs';
import { items } from './data';

const data = {
    mobjs: items,
};

/**
 * @param {object} param
 * @param {Array<{label: string, url: string}>} param.data
 * @param {import('../../../mobjs/type').StaticProps} param.staticProps
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

/**
 * @type {import('../../../mobjs/type').MobComponent<import('./type').LinksMobJs>}
 */
export const LinksMobJsFn = ({ html, staticProps, getState }) => {
    const { section } = getState();

    return html`<div class="c-params-mobjs">
        <ul>
            ${getItems({ staticProps, data: data?.[section] ?? [] })}
        </ul>
    </div>`;
};
