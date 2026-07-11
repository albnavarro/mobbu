/**
 * @import {MobComponent} from '@mobJsType'
 */

import { htmlObject, MobJs } from '@mobJs';

/** @type {MobComponent} */
export const OnlyTabletFunction = ({ delegateEvents, onMount }) => {
    let lastValidRoute = 'home';

    /** @type{Record<string, string>|null} */
    let lastValidParams = null;

    onMount(() => {
        const unsubScribeRouteChange = MobJs.afterRouteChange(
            ({ currentRoute, previousRoute }) => {
                lastValidParams = MobJs.getActiveParams();
                lastValidRoute =
                    currentRoute === previousRoute ? 'home' : previousRoute;
            }
        );

        return () => {
            unsubScribeRouteChange();
        };
    });

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
