//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 **/

import { html, loadUrl } from '../../../../mobjs';
import { navigationStore } from '../../navigation/store/navStore';

const data = [
    {
        label: 'About',
        url: 'about',
        section: 'about',
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
        label: 'Illustration',
        url: 'svg-overview',
        section: 'svg',
    },
    {
        label: 'Plugin',
        url: 'plugin-overview',
        section: 'plugin',
    },
    {
        label: 'Canvas 2d',
        url: 'canvas-overview',
        section: 'canvas',
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
                            navigationStore.set('navigationIsOpen', false);
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

/** @type {import("../../../../mobjs/type").MobComponent} */
export const FooterNavFn = ({ html, delegateEvents, staticProps }) => {
    return html`
        <ul class="footer-nav">
            ${getItems({ delegateEvents, staticProps })}
        </ul>
    `;
};
