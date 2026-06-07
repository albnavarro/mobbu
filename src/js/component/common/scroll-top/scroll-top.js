/**
 * @import {MobComponent} from '@mobJsType'
 */

import { htmlObject, MobJs } from '@mobJs';
import { getIcons } from '@data/index';

/** @type {MobComponent} */
export const ScrollTopFn = ({ delegateEvents }) => {
    const topSvg = getIcons()['up'];

    return htmlObject({
        tag: 'button',
        attributes: {
            type: 'button',
            'aria-label': 'Scroll to top',
        },
        className: 'c-scroll-top',
        modules: [
            delegateEvents({
                click: () => {
                    scrollTo({ top: 0 });

                    const root = MobJs.getRoot();
                    if (!root) return;

                    const h1 = /** @type {HTMLElement | null} */ (
                        root.querySelector('h1')
                    );

                    h1?.setAttribute('tabindex', '-1');
                    if (!focus) return;

                    h1?.focus({ preventScroll: true });
                },
            }),
        ],
        content: topSvg,
    });
};
