/**
 * @import {MobComponent} from '@mobJsType'
 * @import {
 *   AsyncTimeline,
 *   AsyncTimelineControls
 * } from './type'
 */

import { MobCore } from '@mobCore';
import { htmlObject, MobJs } from '@mobJs';
import { asyncTimelineanimation } from './animation/animation';
import { H1Standalone } from '@commonComponent/typography/h1-standalone/definition';
import { DetailOffcanvas } from '@commonComponent/detail-off-canvas/definition';

/**
 * @param {object} params
 * @param {AsyncTimelineControls} params.buttons
 * @returns {HTMLElement[]}
 */
function getControls({ buttons }) {
    return Object.entries(buttons).map(([className, value]) => {
        const { label } = value;

        return htmlObject({
            tag: 'li',
            className: 'controls-item',
            content: {
                tag: 'button',
                attributes: { type: 'button' },
                className: `controls-button ${className}`,
                content: label,
            },
        });
    });
}

/** @type {MobComponent<AsyncTimeline>} */
export const AsyncTimelineFunction = ({
    onMount,
    getState,
    setRef,
    getRef,
    bindEffect,
    getSelfProxi,
}) => {
    const proxi = getSelfProxi();

    let methods = {};

    /** @type {() => void} */
    let destroy;

    onMount(({ element }) => {
        const { canvas } = getRef();

        /**
         * - Wait one frame to get right canvas dimension.
         */
        MobCore.useFrame(() => {
            MobCore.useNextTick(() => {
                destroy?.();

                methods = asyncTimelineanimation({
                    canvas,
                    ...getState(),
                });

                // @ts-ignore
                destroy = methods.destroy;

                // @ts-ignore
                methods?.play?.();
            });
        });

        const unsubscribeResize = MobCore.useResize(() => {
            destroy?.();

            methods = asyncTimelineanimation({
                canvas,
                ...getState(),
            });

            // @ts-ignore
            destroy = methods.destroy;

            // @ts-ignore
            methods?.play?.();
        });

        /**
         * Inizalize controls handler.
         */
        for (const [className, value] of Object.entries(proxi.buttons)) {
            const { method } = value;
            const btn = element.querySelector(`.${className}`);
            // @ts-ignore
            btn?.addEventListener('click', () => methods?.[method]());
        }

        MobCore.useFrame(() => {
            /**
             * Here proxi can be destroyed;
             */
            if (!('isMounted' in proxi)) return;
            proxi.isMounted = true;
        });

        return () => {
            unsubscribeResize();
            destroy?.();
        };
    });

    return htmlObject({
        content: {
            className: 'c-canvas',
            content: [
                {
                    component: H1Standalone,
                    modules: MobJs.staticProps(
                        /** @type {import('@commonComponent/typography/h1-standalone/type').H1Standalone['props']} */ ({
                            text: 'Sync timeline',
                        })
                    ),
                },
                {
                    component: DetailOffcanvas,
                    content: getControls({ buttons: proxi.buttons }),
                },
                {
                    className: 'l-background-shape',
                    content: proxi.background,
                },
                {
                    className: 'canvas-container',
                    modules: bindEffect({
                        toggleClass: { active: () => proxi.isMounted },
                    }),
                    content: {
                        tag: 'canvas',
                        modules: setRef('canvas'),
                    },
                },
            ],
        },
    });
};
