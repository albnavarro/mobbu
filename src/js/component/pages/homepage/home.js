//@ts-check

/**
 * @import { MobComponent } from '@mobJsType';
 * @import { HomeComponent } from './type';
 **/

import { simpleIntroAnimation } from '@componentLibs/animation/simpleIntro';
import { html } from '@mobJs';

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
