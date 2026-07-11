/**
 * @import {MobComponent} from '@mobJsType'
 * @import {QuickNav} from './type'
 */

import { htmlObject, MobJs } from '@mobJs';

/** @type {MobComponent<QuickNav>} */
export const QuickNavFunction = ({
    getSelfProxi,
    bindEffect,
    addMethod,
    setRef,
    delegateEvents,
    onMount,
}) => {
    const proxi = getSelfProxi();

    addMethod('update', (prop, value) => {
        proxi[prop] = value;
    });

    onMount(() => {
        /**
         * Reset, on route change.
         */
        const unsubscribeRouteChange = MobJs.beforeRouteChange(() => {
            proxi.active = false;
            proxi.nextRoute = '';
            proxi.prevRoute = '';
            proxi.backRoute = '';
        });

        return () => {
            unsubscribeRouteChange();
        };
    });

    return htmlObject({
        tag: 'nav',
        className: 'c-quick-nav-container',
        attributes: { 'aria-label': 'Showcase navigation' },
        modules: bindEffect([
            {
                toggleClass: { active: () => proxi.active },
                toggleAttribute: { inert: () => !proxi.active },
            },
        ]),
        content: [
            {
                tag: 'button',
                className: 'c-quick-nav is-prev',
                attributes: {
                    type: 'button',
                    role: 'link',
                    'aria-label': 'previous showcase item',
                },
                modules: [
                    setRef('previous'),
                    delegateEvents({
                        click: () => {
                            MobJs.loadUrl({ url: proxi.prevRoute });
                        },
                    }),
                    bindEffect({
                        toggleAttribute: {
                            disabled: () =>
                                !proxi.prevRoute || proxi.prevRoute.length === 0
                                    ? true
                                    : null,
                        },
                    }),
                ],
            },
            {
                tag: 'button',
                className: 'c-quick-nav is-back',
                attributes: {
                    type: 'button',
                    role: 'link',
                    'aria-label': 'back to showcase list',
                },
                modules: [
                    setRef('back'),
                    delegateEvents({
                        click: () => {
                            MobJs.loadUrl({ url: proxi.backRoute });
                        },
                    }),
                    bindEffect({
                        toggleAttribute: {
                            disabled: () =>
                                !proxi.backRoute || proxi.backRoute.length === 0
                                    ? true
                                    : null,
                        },
                    }),
                ],
            },
            {
                tag: 'button',
                className: 'c-quick-nav is-next',
                attributes: {
                    type: 'button',
                    role: 'link',
                    'aria-label': 'next showcase item',
                },
                modules: [
                    setRef('next'),
                    delegateEvents({
                        click: () => {
                            MobJs.loadUrl({ url: proxi.nextRoute });
                        },
                    }),
                    bindEffect({
                        toggleAttribute: {
                            disabled: () =>
                                !proxi.nextRoute || proxi.nextRoute.length === 0
                                    ? true
                                    : null,
                        },
                    }),
                ],
            },
        ],
    });
};
