/**
 * @import {MobComponent} from "@mobJsType"
 */

import { html } from '@mobJs';
import { mathPairAnimation } from './pair-animation';
import { fakeAnimation } from './animations/fake-animation';
import { MobCore } from '@mobCore';

/** @type {MobComponent<import('./type').MathAnimation>} */
export const MathAnimationFn = ({
    getProxi,
    setRef,
    getRef,
    getRefs,
    delegateEvents,
    onMount,
}) => {
    const proxi = getProxi();
    const showNavigationClass = proxi.showNavigation ? 'active' : '';
    const targetSize = 3;
    const gap = targetSize / proxi.numberOfStaggers;

    const staggers = Array.from({ length: proxi.numberOfStaggers }).map(
        (_, index) => {
            return {
                size: targetSize - gap * index,
                opacity: 1 / index,
            };
        }
    );

    /**
     * Create fake methods before onMount to prevent nav buttons error.
     */
    const fake = fakeAnimation();
    let { destroy, play, stop, resume } = fake;

    onMount(({ element }) => {
        const { target: targets } = getRefs();
        const { canvas } = getRef();

        /**
         * Probably style is not computree here. Await first frame available, so canvas has exact dimension.
         */
        MobCore.useFrame(() => {
            ({ destroy, play, stop, resume } = mathPairAnimation[proxi.name](
                {
                    targets,
                    container: element,
                    canvas,
                },
                ...proxi.args
            ));

            play();
        });

        const unsubscribeResize = MobCore.useResize(() => {
            stop();
            destroy();

            ({ destroy, play, stop, resume } = mathPairAnimation[proxi.name](
                {
                    targets,
                    container: element,
                    canvas,
                },
                ...proxi.args
            ));

            play();
        });

        return () => {
            destroy();
            unsubscribeResize();

            // @ts-ignore
            destroy = null;

            // @ts-ignore
            play = null;

            // @ts-ignore
            stop = null;

            // @ts-ignore
            resume = null;
        };
    });

    return html`<div class="c-math">
        <canvas class="c-math__canvas" ${setRef('canvas')}></canvas>
        <div class="c-math__nav ${showNavigationClass}">
            <button
                type="button"
                class="c-math__play"
                ${delegateEvents({
                    click: () => {
                        resume();
                    },
                })}
            ></button>
            <button
                type="button"
                class="c-math__stop"
                ${delegateEvents({
                    click: () => {
                        stop();
                    },
                })}
            ></button>
        </div>
        <div class="c-math__circle-container">
            ${staggers
                .map(({ size, opacity }) => {
                    return html`<span
                        class="c-math__circle"
                        ${setRef('target')}
                        style="width:${size}rem;height:${size}rem;opacity:${opacity}"
                        ><span class="c-math__circle__inner"></span
                    ></span>`;
                })
                .join('')}
        </div>
    </div>`;
};
