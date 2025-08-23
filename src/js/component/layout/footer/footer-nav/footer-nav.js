/**
 * @import {DelegateEvents, MobComponent, StaticProps} from '@mobJsType';
 */

import { html, MobJs } from '@mobJs';
import { getCommonData } from '@data/index';
import { navigationStore } from '@stores/navigation';

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {StaticProps<import('./type').FooterNavButton>} params.staticProps
 */
const getItems = ({ delegateEvents, staticProps }) => {
    const data = getCommonData();

    return data.footer.nav
        .map(({ label, url, section }) => {
            return html`<li class="footer-nav__item">
                <footer-nav-button
                    ${delegateEvents({
                        click: () => {
                            MobJs.loadUrl({ url });
                            navigationStore.set('navigationIsOpen', false);
                        },
                    })}
                    ${staticProps(
                        /** @type {import('./type').FooterNavButton['state']} */ ({
                            label,
                            section,
                        })
                    )}
                ></footer-nav-button>
            </li> `;
        })
        .join('');
};

/** @type {MobComponent} */
export const FooterNavFn = ({ delegateEvents, staticProps }) => {
    return html`
        <ul class="footer-nav">
            ${getItems({ delegateEvents, staticProps })}
        </ul>
    `;
};
