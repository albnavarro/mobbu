import { getLegendData } from '../../../data';
import { getIdByInstanceName, setStateById } from '../../../mobjs';
import { simpleIntroAnimation } from '../../lib/animation/simpleIntro';
import { homeTextAnimation } from './animation/text';

const playAnimation = async ({ playIntro, playText, playSvg }) => {
    playText();
    await playIntro();
    playSvg();
};

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const HomeComponentFn = ({ html, onMount, getState }) => {
    const { svg } = getState();

    onMount(async ({ refs }) => {
        const { textStagger, svg_group } = refs;

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
        const codeButtonId = getIdByInstanceName('global-code-button');
        setStateById(codeButtonId, 'drawers', [
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
        ]);
        setStateById(codeButtonId, 'color', 'black');

        return () => {
            destroy();
            destroyText();
            setStateById(codeButtonId, 'drawers', []);
        };
    });

    return html`<div>
        <div class="l-index__content">
            <a class="l-index__item" href="./#mobCore_overview">
                <div class="l-index__inner-content">
                    <h1 class="l-index__stagger" ref="textStagger">
                        <span>Mob</span>Core
                    </h1>
                </div>
                <div class="l-index__inner-content">
                    <h2 class="l-index__stagger" ref="textStagger">
                        store & window events
                    </h2>
                </div>
            </a>
            <a class="l-index__item" href="./#mobJs_overview">
                <div class="l-index__inner-content">
                    <h1 class="l-index__stagger" ref="textStagger">
                        <span>Mob</span>Js
                    </h1>
                </div>
                <div class="l-index__inner-content">
                    <h2 class="l-index__stagger" ref="textStagger">
                        js component library
                    </h2>
                </div>
            </a>
            <a class="l-index__item" href="./#mobMotion_overview">
                <div class="l-index__inner-content">
                    <h1 class="l-index__stagger" ref="textStagger">
                        <span>Mob</span>Motion
                    </h1>
                </div>
                <div class="l-index__inner-content">
                    <h2 class="l-index__stagger" ref="textStagger">
                        js animation library
                    </h2>
                </div>
            </a>
        </div>

        <div class="l-index__logo">${svg}</div>
    </div>`;
};
