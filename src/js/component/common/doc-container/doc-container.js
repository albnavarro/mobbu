import { getSideBarLinksRoot } from '@commonComponent/side-bar-links/utils';
import { tabLoopTrap } from '@componentLibs/utils/utils';
import { MobCore } from '@mobCore';
import { htmlObject, MobJs } from '@mobJs';
import { MobMotionCore } from '@mobMotion';
import { docContainerStore } from '@stores/doc-container';

/**
 * @import {
 *   GetRef,
 *   MobComponent
 * } from '@mobJsType'
 */

/**
 * Component is a singleton
 */
let unsubscribeTabHandler = () => {};

/**
 * @param {object} params
 * @param {GetRef<import('./type').DocContainerType>} params.getRef
 */
const createTabHandler = ({ getRef }) => {
    unsubscribeTabHandler = MobCore.useTabHandler(
        ({ direction, preventDefault }) => {
            if (MobMotionCore.mq('min', 'desktop')) return;

            const aside = getRef().asideRight;
            const sideBarLinks = getSideBarLinksRoot();
            if (!aside) return;

            tabLoopTrap({
                elements: [aside, sideBarLinks],
                direction,
                preventDefault,
            });
        }
    );
};

/** @type {MobComponent<import('./type').DocContainerType>} */
export const DocContainerFn = ({
    getSelfProxi,
    getBoundedProxi,
    delegateEvents,
    bindEffect,
    onMount,
    watch,
    setRef,
    getRef,
    addMethod,
}) => {
    const proxi = getSelfProxi();
    const boundedProxi = getBoundedProxi();

    addMethod('closeSidebarLeft', () => {
        proxi.rightSidebarVisible = false;
    });

    /**
     * Control sidebar links visibility on tablet.
     */
    watch(
        () => proxi.rightSidebarVisible,
        (shoulVisible) => {
            if (MobMotionCore.mq('min', 'desktop')) {
                docContainerStore.set('rightSidebarIsVisible', true);
                docContainerStore.set('rightSidebarIsInert', false);
                unsubscribeTabHandler();
                return;
            }

            docContainerStore.set('rightSidebarIsInert', !shoulVisible);
            docContainerStore.set('rightSidebarIsVisible', shoulVisible);

            if (shoulVisible) {
                createTabHandler({ getRef });
                return;
            }

            unsubscribeTabHandler();
        },
        { wait: true, immediate: true }
    );

    onMount(() => {
        /**
         * Close sidebar on resize.
         */
        const unsubscribeResize = MobCore.useResize(() => {
            if (MobMotionCore.mq('min', 'desktop')) {
                proxi.rightSidebarVisible = true;
                return;
            }

            proxi.rightSidebarVisible = false;
        });

        /**
         * Close sidebar on route change.
         */
        const unsubScribeRoute = MobJs.afterRouteChange(() => {
            if (MobMotionCore.mq('min', 'desktop')) return;

            proxi.rightSidebarVisible = false;
        });

        /**
         * Close sidebar on esc.
         */
        const unsubscribeEscHandler = MobCore.useEscHandler(() => {
            if (
                !proxi.rightSidebarVisible ||
                MobMotionCore.mq('min', 'desktop')
            )
                return;

            proxi.rightSidebarVisible = false;
            getRef().asideToggleButton.focus({ preventScroll: true });
        });

        return () => {
            unsubscribeResize();
            unsubScribeRoute();
            unsubscribeEscHandler();
            unsubscribeTabHandler();
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
                    setRef('asideRight'),
                    bindEffect({
                        toggleClass: {
                            visible: () => proxi.rightSidebarVisible,
                        },
                    }),
                ],
                content: [
                    {
                        tag: 'button',
                        className: 'off-canvas-control-button',
                        attributes: {
                            type: 'button',
                            'aria-controls': 'right-sidbar',
                        },
                        modules: [
                            setRef('asideToggleButton'),
                            delegateEvents({
                                click: () => {
                                    proxi.rightSidebarVisible =
                                        !proxi.rightSidebarVisible;
                                },
                            }),
                            bindEffect({
                                toggleAttribute: {
                                    disabled: () =>
                                        boundedProxi.rightSidebarIsEmpty
                                            ? true
                                            : null,
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
