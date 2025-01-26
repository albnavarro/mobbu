//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { HomeComponent } from './type';
 **/

import { simpleIntroAnimation } from '../../lib/animation/simpleIntro';
import { homeTextAnimation } from './animation/text';

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
    setRef,
    getRefs,
}) => {
    const { svg } = getState();

    onMount(({ element }) => {
        const { textStagger } = getRefs();
        const svg_group = element.querySelectorAll('[ref="svg_group"]');

        const { destroy, playIntro, playSvg } = simpleIntroAnimation({
            refs: svg_group,
        });

        const { playText, destroyText } = homeTextAnimation({
            refs: textStagger,
        });

        setTimeout(() => {
            playAnimation({ playIntro, playText, playSvg });
        }, 500);

        return () => {
            destroy();
            destroyText();
        };
    });

    return html`<div>
        <div class="l-index__content">
            <a class="l-index__item" href="./#mobCore-overview">
                <div class="l-index__inner-content">
                    <h1 class="l-index__stagger" ${setRef('textStagger')}>
                        <span>Mob</span>Core
                    </h1>
                </div>
                <div class="l-index__inner-content">
                    <h2 class="l-index__stagger" ${setRef('textStagger')}>
                        store & window events
                    </h2>
                </div>
            </a>
            <a class="l-index__item" href="./#mobJs-overview">
                <div class="l-index__inner-content">
                    <h1 class="l-index__stagger" ${setRef('textStagger')}>
                        <span>Mob</span>Js
                    </h1>
                </div>
                <div class="l-index__inner-content">
                    <h2 class="l-index__stagger" ${setRef('textStagger')}>
                        js component library
                    </h2>
                </div>
            </a>
            <a class="l-index__item" href="./#mobMotion-overview">
                <div class="l-index__inner-content">
                    <h1 class="l-index__stagger" ${setRef('textStagger')}>
                        <span>Mob</span>Motion
                    </h1>
                </div>
                <div class="l-index__inner-content">
                    <h2 class="l-index__stagger" ${setRef('textStagger')}>
                        js animation library
                    </h2>
                </div>
            </a>
        </div>

        <div class="l-index__logo">${svg}</div>
    </div>`;
};
