//@ts-check

import { html, loadUrl } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';

const data = [
    {
        label: 'About',
        url: 'about',
        section: 'about',
    },
    {
        label: 'Canvas 2d',
        url: 'canvas-overview',
        section: 'canvas',
    },
    {
        label: 'Illustration',
        url: 'svg-overview',
        section: 'svg',
    },
    {
        label: 'MobCore',
        url: 'mobCore-overview',
        section: 'mobCore',
    },
    {
        label: 'MobJs',
        url: 'mobJs-overview',
        section: 'mobJs',
    },
    {
        label: 'MobMotion',
        url: 'mobMotion-overview',
        section: 'mobMotion',
    },
    {
        label: 'Plugin',
        url: 'plugin-overview',
        section: 'plugin',
    },
];

const getItems = ({ delegateEvents, staticProps }) => {
    return data
        .map(({ label, url, section }) => {
            return html`<li class="footer-nav__item">
                <footer-nav-button
                    ${delegateEvents({
                        click: () => {
                            loadUrl({ url });
                        },
                    })}
                    ${staticProps({
                        label,
                        section,
                    })}
                ></footer-nav-button>
            </li> `;
        })
        .join('');
};

/**
 * @type {import("../../../../mobjs/type").mobComponent}
 */
export const FooterNavFn = ({ html, delegateEvents, staticProps }) => {
    if (motionCore.mq('max', 'desktop')) return html` <span></span> `;

    return html`
        <ul class="footer-nav">
            ${getItems({ delegateEvents, staticProps })}
        </ul>
    `;
};
