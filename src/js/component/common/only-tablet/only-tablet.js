/**
 * @import {MobComponent} from '@mobJsType'
 */

import { htmlObject, MobJs } from '@mobJs';

let lastValidRoute = 'home';

/** @type{Record<string, string>|null} */
let lastValidParams = null;

MobJs.afterRouteChange(({ currentRoute, previousRoute }) => {
    lastValidParams = MobJs.getActiveParams();
    lastValidRoute = currentRoute === previousRoute ? 'home' : previousRoute;
});

/** @type {MobComponent} */
export const OnlyTabletFunction = ({ delegateEvents }) => {
    return htmlObject({
        className: 'c-only-tablet',
        content: [
            {
                tag: 'section',
                content: [
                    {
                        tag: 'h1',
                        content: '! warning',
                    },
                    {
                        tag: 'p',
                        content:
                            /* HTML */ 'Animation content is available<br/> from <strong>tablet resolution ( 768px )</strong>',
                    },
                    {
                        tag: 'button',
                        attributes: { type: 'button', role: 'link' },
                        modules: delegateEvents({
                            click: () => {
                                MobJs.loadUrl({
                                    url: lastValidRoute,
                                    params: lastValidParams ?? {},
                                });
                            },
                        }),
                        content: 'back',
                    },
                ],
            },
        ],
    });
};
