import { MobCore } from '@mobCore';
import { htmlObject, MobJs } from '@mobJs';
import { MobMotionCore } from '@mobMotion';
import { docContainerStore } from '@stores/doc-container';

/**
 * @import {MobComponent} from '@mobJsType'
 */

/** @type {MobComponent<import('./type').DocContainerType>} */
export const DocContainerFn = ({
    getSelfProxi,
    delegateEvents,
    bindEffect,
    onMount,
    watch,
}) => {
    const proxi = getSelfProxi();

    /**
     * Control sidebar links visibility on tablet.
     */
    watch(
        () => proxi.rightSidebarVisible,
        (shoulVisible) => {
            docContainerStore.set('shouldApplyInert', !shoulVisible);
        }
    );

    onMount(() => {
        /**
         * Close sidebar on resize.
         */
        const unsubscribeResize = MobCore.useResize(() => {
            const shouldCloseRight = MobMotionCore.mq('min', 'desktop');
            if (shouldCloseRight) proxi.rightSidebarVisible = false;
        });

        /**
         * Close sidebar on route change.
         */
        const unsubScribeRoute = MobJs.afterRouteChange(() => {
            proxi.rightSidebarVisible = false;
        });

        /**
         * Close sidebar on esc.
         */
        const unsubscribeEscHandler = MobCore.useEscHandler(() => {
            if (!proxi.rightSidebarVisible) return;
            proxi.rightSidebarVisible = false;
        });

        return () => {
            unsubscribeResize();
            unsubScribeRoute();
            unsubscribeEscHandler();
            openSideBarLinkTablet(false);
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
                modules: [
                    bindEffect({
                        toggleClass: {
                            visible: () => proxi.rightSidebarVisible,
                        },
                    }),
                ],
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

                                    'aria-label': () =>
                                        proxi.rightSidebarVisible
                                            ? 'close sidebar'
                                            : 'open sidebar',
                                },
                            }),
                        ],
                        content: [
                            {
                                tag: 'span',
                                className: 'off-canvas-icon',
                                modules: bindEffect({
                                    toggleClass: {
                                        active: () => proxi.rightSidebarVisible,
                                    },
                                }),
                            },
                            {
                                className: 'off-canvas-backdrop',
                                modules: [
                                    bindEffect({
                                        toggleClass: {
                                            active: () =>
                                                proxi.rightSidebarVisible,
                                        },
                                    }),
                                    delegateEvents({
                                        click: () => {
                                            proxi.rightSidebarVisible = false;
                                        },
                                    }),
                                ],
                            },
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
