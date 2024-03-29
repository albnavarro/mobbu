import { html } from '../../../mobjs';
import { items } from './data';

const data = {
    mobjs: items,
};

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
 * @param {import('../../../mobjs/type').componentType}
 */
export const linksMobJs = ({ html, staticProps, getState }) => {
    const { section } = getState();

    return html`<div class="c-params-mobjs">
        <ul>
            ${getItems({ staticProps, data: data?.[section] ?? [] })}
        </ul>
    </div>`;
};
