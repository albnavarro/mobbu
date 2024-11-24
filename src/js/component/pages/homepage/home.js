//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { HomeComponent } from './type';
 **/

import { getLegendData } from '../../../data';
import {
    resetCodeButton,
    updateCodeButton,
} from '../../common/codeButton/utils';
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

        playAnimation({ playIntro, playText, playSvg });

        /**
         * Code button
         */
        const { home } = getLegendData();
        const { source } = home;
        updateCodeButton({
            drawers: [
                {
                    label: 'description',
                    source: source.description,
                },
                {
                    label: 'definition',
                    source: source.definition,
                },
                {
                    label: 'component',
                    source: source.component,
                },
                {
                    label: 'Logo animation',
                    source: source.logoAnimation,
                },
                {
                    label: 'text animation',
                    source: source.textAnimation,
                },
            ],
            color: 'black',
        });

        return () => {
            destroy();
            destroyText();
            resetCodeButton();
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
