//@ts-check

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {HomeComponent} from "./type"
 */

import { simpleIntroAnimation } from '@componentLibs/animation/simple-intro';
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
export const HomeComponentFn = ({ onMount, getProxi }) => {
    const proxi = getProxi();
    const { svg } = proxi;

    onMount(({ element }) => {
        const svg_group = [...element.querySelectorAll('svg')];

        const { destroy, playIntro, playSvg } = simpleIntroAnimation({
            refs: /** @type {HTMLOrSVGElement[]} */ (svg_group),
        });

        setTimeout(() => {
            playAnimation({ playIntro, playSvg });
        }, 500);

        return () => {
            destroy();
        };
    });

    return html`<div class="l-index">
        <div class="l-index__logo">
            ${svg
                .map((item) => {
                    return html`${item}`;
                })
                .join('')}
        </div>
    </div>`;
};
