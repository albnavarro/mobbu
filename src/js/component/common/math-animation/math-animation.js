/**
 * @import {MobComponent} from "@mobJsType"
 */

import { html } from '@mobJs';

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

    onMount(() => {
        const { target: circles } = getRefs();
        console.log(circles);
    });

    return html`<div class="c-math">
        <div class="c-math__nav">
            <button
                type="button"
                class="c-math__play"
                ${delegateEvents({
                    click: () => {
                        console.log('play', proxi.name);
                    },
                })}
            ></button>
            <button
                type="button"
                class="c-math__stop"
                ${delegateEvents({
                    click: () => {
                        console.log('stop', proxi.name);
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
