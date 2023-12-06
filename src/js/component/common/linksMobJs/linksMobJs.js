import { html } from '../../../mobjs';

const items = [
    {
        label: 'html',
        url: 'mobJs_html',
    },
    {
        label: 'onMount',
        url: 'mobJs_onMount',
    },
    {
        label: 'getState',
        url: 'mobJs_getState',
    },
    {
        label: 'setState',
        url: 'mobJs_setState',
    },
    {
        label: 'watch',
        url: 'mobJs_watch',
    },
    {
        label: 'watchSync',
        url: 'mobJs_watchSync',
    },
    {
        label: 'staticProps',
        url: 'mobJs_staticProps',
    },
    {
        label: 'bindProps',
        url: 'mobJs_bindProps',
    },
    {
        label: 'bindEvents',
        url: 'mobJs_bindEvents',
    },
    {
        label: 'delegateEvents',
        url: 'mobJs_delegateEvents',
    },
    {
        label: 'reactive list: (repeat)',
        url: 'mobJs_repeat',
    },
    {
        label: 'unBind',
        url: 'mobJs_unBind',
    },
    {
        label: 'emit',
        url: 'mobJs_emit',
    },
    {
        label: 'emitAsync',
        url: 'mobJs_emitAsync',
    },
    {
        label: 'computed',
        url: 'mobJs_computed',
    },
    {
        label: 'remove',
        url: 'mobJs_remove',
    },
    {
        label: 'removeDOM',
        url: 'mobJs_removeDom',
    },
    {
        label: 'getChildren',
        url: 'mobJs_getChildren',
    },
    {
        label: 'freezeProp',
        url: 'mobJs_freezeProp',
    },
    {
        label: 'unFreezeProp',
        url: 'mobJs_unFreezeProp',
    },
    {
        label: 'getParentId',
        url: 'mobJs_getParentId',
    },
    {
        label: 'watchParent',
        url: 'mobJs_watchParent',
    },
    {
        label: 'syncParent',
        url: 'mobJs_syncParent',
    },
];

const getItems = (staticProps) => {
    return items
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
export const linksMobJs = ({ html, staticProps }) => {
    return html`<div class="c-params-mobjs">
        <ul>
            ${getItems(staticProps)}
        </ul>
    </div>`;
};
