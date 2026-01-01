/**
 * @import {MobComponent} from "@mobJsType"
 */

import { html } from '@mobJs';
import { mathPairAnimation } from './pair-animation';
import { fakeAnimation } from './animations/fake-animation';

/** @type {MobComponent<import('./type').MathAnimation>} */
export const MathAnimationFn = ({
    getProxi,
    setRef,
    getRefs,
    delegateEvents,
    onMount,
}) => {
    const proxi = getProxi();
    const staggers = Array.from({ length: 5 });

    /**
     * Create fake methods before onMount to prevent nav buttons error.
     */
    const fake = fakeAnimation();
    let { destroy, play, stop } = fake;

    onMount(() => {
        const { target: circles } = getRefs();
        console.log(circles);

        const animation = mathPairAnimation[proxi.name];
        destroy = animation().destroy;
        play = animation().play;
        stop = animation().stop;

        play();

        return () => {
            destroy();

            // @ts-ignore
            destroy = null;
            // @ts-ignore
            play = null;
            // @ts-ignore
            stop = null;
        };
    });

    return html`<div class="c-math">
        <div class="c-math__nav">
            <button
                type="button"
                class="c-math__play"
                ${delegateEvents({
                    click: () => {
                        play();
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
        ${staggers
            .map(() => {
                return html`<span
                    class="c-math__circle"
                    ${setRef('target')}
                ></span>`;
            })
            .join('')}
    </div>`;
};
