//@ts-check

/**
 * @import { DelegateEvents, MobComponent, StaticProps } from '../../../../mobjs/type';
 **/

import { getCommonData } from '../../../../data';
import { html, loadUrl } from '../../../../mobjs';
import { navigationStore } from '../../navigation/store/navStore';

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

/** @type {MobComponent} */
export const FooterNavFn = ({ html, delegateEvents, staticProps }) => {
    return html`
        <ul class="footer-nav">
            ${getItems({ delegateEvents, staticProps })}
        </ul>
    `;
};
