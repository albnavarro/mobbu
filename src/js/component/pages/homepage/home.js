//@ts-check

/**
 * @import { MobComponent } from '../../../mob/mobjs/type';
 * @import { HomeComponent } from './type';
 **/

import { html } from '../../../mob/mobjs';
import { simpleIntroAnimation } from '../../lib/animation/simpleIntro';

/**
 * @param {object} params
 * @param {() => Promise<void>} params.playIntro
 * @param {() => void} params.playSvg
 * @returns {Promise<void>}
 */
const playAnimation = async ({ playIntro, playSvg }) => {
    await playIntro();
    playSvg();
};

/** @type {MobComponent<HomeComponent>} */
export const HomeComponentFn = ({ onMount, getState, setState }) => {
    const { svg } = getState();

    onMount(({ element }) => {
        const svg_group = [...element.querySelectorAll('[ref="svg_group"]')];

        const { destroy, playIntro, playSvg } = simpleIntroAnimation({
            refs: /** @type{HTMLElement[]} */ (svg_group),
        });

        setTimeout(() => {
            playAnimation({ playIntro, playSvg });
            setState('isMounted', true);
        }, 500);

        return () => {
            destroy();
        };
    });

    return html`<div class="l-index">
        <div class="l-index__logo">${svg}</div>
    </div>`;
};
