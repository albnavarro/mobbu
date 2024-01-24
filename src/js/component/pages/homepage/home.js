import { getLegendData } from '../../../data';
import { m3Animation } from './animation';
import { homeTextAnimation } from './animation/text';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const HomeComponent = ({ html, onMount, staticProps, getState }) => {
    const { svg } = getState();

    onMount(async ({ refs }) => {
        const {
            textStagger,
            around_bottom,
            around_top,
            back_green,
            back_green_1,
            circle,
            dark_green,
            fill_middle,
            main_letter,
            reflex,
            stroke,
            stroke_back,
        } = refs;

        const { destroy, playIntro, playSvg } = m3Animation({
            refs: [
                around_bottom,
                around_top,
                back_green,
                back_green_1,
                circle,
                dark_green,
                fill_middle,
                main_letter,
                reflex,
                stroke,
                stroke_back,
            ],
        });

        const { playText, destroyText } = homeTextAnimation({
            refs: textStagger,
        });

        await playIntro();
        playText();
        playSvg();

        return () => {
            destroy();
            destroyText();
        };
    });

    const { home } = getLegendData();
    const { source } = home;

    return html`<div>
        <code-button
            ${staticProps({
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
                style: 'legend',
            })}
        >
        </code-button>
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
