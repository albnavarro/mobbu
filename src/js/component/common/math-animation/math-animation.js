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
    let { destroy, play, stop, resume } = fake;

    onMount(({ element }) => {
        const { target: targets } = getRefs();
        ({ destroy, play, stop, resume } = mathPairAnimation[proxi.name]({
            targets,
            container: element,
        }));

        play();

        const unsubscribeResize = MobCore.useResize(() => {
            stop();
            destroy();

            ({ destroy, play, stop, resume } = mathPairAnimation[proxi.name]({
                targets,
                container: element,
            }));
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
        <div class="c-math__nav">
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
                .map((_, index) => {
                    return html`<span
                        class="c-math__circle"
                        data-index="${index + 1}"
                        ${setRef('target')}
                    ></span>`;
                })
                .join('')}
        </div>
    </div>`;
};
