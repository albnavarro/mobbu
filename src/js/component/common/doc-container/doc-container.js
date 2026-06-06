import { MobCore } from '@mobCore';
import { htmlObject, MobJs } from '@mobJs';
import { MobMotionCore } from '@mobMotion';

/**
 * @import {MobComponent} from '@mobJsType'
 */

/** @type {MobComponent<import('./type').DocContainerType>} */
export const DocContainerFn = ({
    getSelfProxi,
    delegateEvents,
    bindEffect,
    onMount,
}) => {
    const proxi = getSelfProxi();

    onMount(() => {
        const unsubscribeResize = MobCore.useResize(() => {
            const shouldCloseRight = MobMotionCore.mq('min', 'desktop');
            if (shouldCloseRight) proxi.rightSidebarVisible = false;
        });

        const unsubScribeRoute = MobJs.afterRouteChange(() => {
            proxi.rightSidebarVisible = false;
        });

        return () => {
            unsubscribeResize();
            unsubScribeRoute();
        };
    });

    return htmlObject({
        className: 'c-doc-container',
        content: [
            {
                className: 'left-placeholder',
            },
            {
                tag: 'main',
                content: {
                    tag: 'mobjs-slot',
                    attributes: { name: 'docs' },
                },
            },
            {
                tag: 'aside',
                className: 'right',
                attributes: {
                    id: 'right-sidbar',
                    'aria-label': 'right section utils',
                },
                modules: bindEffect({
                    toggleClass: {
                        visible: () => proxi.rightSidebarVisible,
                    },
                }),
                content: [
                    {
                        tag: 'button',
                        className: 'off-canvas-control',
                        attributes: {
                            type: 'button',
                            'aria-controls': 'right-sidbar',
                        },
                        modules: [
                            delegateEvents({
                                click: () => {
                                    proxi.rightSidebarVisible =
                                        !proxi.rightSidebarVisible;
                                },
                            }),
                            bindEffect({
                                toggleAttribute: {
                                    'aria-expanded': () =>
                                        proxi.rightSidebarVisible
                                            ? 'true'
                                            : 'false',
                                },
                            }),
                        ],
                    },
                    {
                        tag: 'mobjs-slot',
                        attributes: { name: 'section-title-small' },
                    },
                    {
                        tag: 'mobjs-slot',
                        attributes: { name: 'section-title' },
                    },
                    {
                        tag: 'mobjs-slot',
                        attributes: { name: 'section-links' },
                    },
                ],
            },
        ],
    });
};
