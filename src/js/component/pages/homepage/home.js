import logo from '../../../../svg/logo.svg';
import pieceArrow from '../../../../svg/piece-arrow.svg';
import { getLegendData } from '../../../data';
import { homeAnimation } from './animation';
import { homeTextAnimation } from './animation/text';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const HomeComponent = ({ html, onMount, staticProps }) => {
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

        const { playSvg, destroySvg } = homeAnimation({
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

        playSvg();
        playText();

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
                        label: 'animation',
                        source: source.animation,
                    },
                ],
                style: 'legend',
            })}
        >
        </code-button>
        <div class="l-index__content">
            <div class="l-index__item" ref="mobjs">
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
            </div>
            <div class="l-index__item" ref="mobMotion">
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
            </div>
        </div>

        <div class="l-index__top-left">${pieceArrow}</div>
        <div class="l-index__logo">${logo}</div>
        <div class="l-index__top-right">${pieceArrow}</div>
    </div>`;
};
