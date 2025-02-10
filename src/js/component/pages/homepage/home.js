//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { HomeComponent } from './type';
 **/

import { simpleIntroAnimation } from '../../lib/animation/simpleIntro';
import { homeTextAnimation } from './animation/text';

/**
 * @param {object} params
 * @param {() => Promise<void>} params.playIntro
 * @param {() => void} params.playText
 * @param {() => void} params.playSvg
 * @returns {Promise<void>}
 */
const playAnimation = async ({ playIntro, playText, playSvg }) => {
    playText();
    await playIntro();
    playSvg();
};

/** @type {MobComponent<HomeComponent>} */
export const HomeComponentFn = ({
    html,
    onMount,
    getState,
    setState,
    setRef,
    getRefs,
    bindEffect,
}) => {
    const { svg } = getState();

    onMount(({ element }) => {
        const { textStagger } = getRefs();
        const svg_group = [...element.querySelectorAll('[ref="svg_group"]')];

        const { destroy, playIntro, playSvg } = simpleIntroAnimation({
            refs: /** @type{HTMLElement[]} */ (svg_group),
        });

        const { playText, destroyText } = homeTextAnimation({
            refs: textStagger,
        });

        setTimeout(() => {
            playAnimation({ playIntro, playText, playSvg });
            setState('isMounted', true);
        }, 500);

        return () => {
            destroy();
            destroyText();
        };
    });

    return html`<div class="l-index">
        <div class="l-index__content">
            <div class="l-index__main">
                <a class="l-index__main__item" href="./#mobCore-overview">
                    <div class="has-overflow">
                        <h1 class="l-index__stagger" ${setRef('textStagger')}>
                            <span>Mob</span>Core
                        </h1>
                    </div>
                    <div class="has-overflow">
                        <h6 class="l-index__stagger" ${setRef('textStagger')}>
                            store & window events
                        </h6>
                    </div>
                </a>
                <a class="l-index__main__item" href="./#mobJs-overview">
                    <div class="has-overflow">
                        <h1 class="l-index__stagger" ${setRef('textStagger')}>
                            <span>Mob</span>Js
                        </h1>
                    </div>
                    <div class="has-overflow">
                        <h6 class="l-index__stagger" ${setRef('textStagger')}>
                            js component library
                        </h6>
                    </div>
                </a>
                <a class="l-index__main__item" href="./#mobMotion-overview">
                    <div class="has-overflow">
                        <h1 class="l-index__stagger" ${setRef('textStagger')}>
                            <span>Mob</span>Motion
                        </h1>
                    </div>
                    <div class="has-overflow">
                        <h6 class="l-index__stagger" ${setRef('textStagger')}>
                            js animation library
                        </h6>
                    </div>
                </a>
                <a class="l-index__main__item" href="./#svg-overview">
                    <div class="has-overflow">
                        <h1 class="l-index__stagger" ${setRef('textStagger')}>
                            <span>Gra</span>phics
                        </h1>
                    </div>
                    <div class="has-overflow">
                        <h6 class="l-index__stagger" ${setRef('textStagger')}>
                            Vectorial illustration.
                        </h6>
                    </div>
                </a>
            </div>
            <div
                class="l-index__extras"
                ${bindEffect({
                    bind: 'isMounted',
                    toggleClass: { active: () => getState().isMounted },
                })}
            >
                <h2>Extras</h2>
                <a class="" href="./#plugin-overview">
                    <div class="l-index__extras__item">
                        <h6>
                            <span>MobMotion plugin</span>
                        </h6>
                    </div>
                </a>
                <a class="" href="./#canvas-overview">
                    <div class="l-index__extras__item">
                        <h6>
                            <span>Canvas 2D experiment</span>
                        </h6>
                    </div>
                </a>
            </div>
        </div>

        <div class="l-index__logo">${svg}</div>
    </div>`;
};
