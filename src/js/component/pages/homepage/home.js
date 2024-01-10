import { getLegendData } from '../../../data';
import { homeAnimation } from './animation';
import { homeTextAnimation } from './animation/text';

const playAnimation = async ({ playText, playIntro, playSvg }) => {
    playText();
    await playIntro();
    playSvg();
};

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const HomeComponent = ({ html, onMount, staticProps, getState }) => {
    const { logo, sideShape } = getState();

    onMount(({ element, refs }) => {
        const {
            textStagger,
            block1,
            block2,
            block3,
            block4,
            block5,
            block6,
            block7,
            block8,
            M_left,
            M_right,
            around,
        } = refs;

        const { playIntro, playSvg, destroySvg } = homeAnimation({
            element,
            logoRefs: [
                { block1 },
                { block2 },
                { block3 },
                { block4 },
                { block5 },
                { block6 },
                { block7 },
                { block8 },
                { M_left },
                { M_right },
            ],
            around,
        });

        const { playText, destroyText } = homeTextAnimation({
            refs: textStagger,
        });

        playAnimation({ playText, playIntro, playSvg });

        return () => {
            destroySvg();
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

        <div class="l-index__top-left">${sideShape}</div>
        <div class="l-index__logo">${logo}</div>
        <div class="l-index__top-right">${sideShape}</div>
        <!-- <div class="test-grid"> -->
        <!--     <div class="test-grid__grid"><span>test</span></div> -->
        <!--     <div class="test-grid__cont"><span>test</span></div> -->
        <!-- </div> -->
    </div>`;
};
