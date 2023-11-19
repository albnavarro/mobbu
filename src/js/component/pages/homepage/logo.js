import logo from '../../../../svg/logo.svg';
import pieceArrow from '../../../../svg/piece-arrow.svg';
import { homeAnimation } from './animation';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const HomeLogo = ({ html, onMount }) => {
    onMount(({ element, refs }) => {
        const {
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

        const { play, destroy } = homeAnimation({
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

        play();

        return () => {
            destroy();
        };
    });

    return html`<div>
        <div class="l-index__content">
            <div class="l-index__item" ref="mobjs">
                <div class="l-index__inner-content">
                    <h1><span>Mob</span>Js</h1>
                    <h2>js component library</h2>
                </div>
            </div>
            <div class="l-index__item" ref="mobmotion">
                <div class="l-index__inner-content">
                    <h1><span>Mob</span>Motion</h1>
                    <h2>js animation library</h2>
                </div>
            </div>
        </div>

        <div class="l-index__top-left">${pieceArrow}</div>
        <div class="l-index__logo">${logo}</div>
        <div class="l-index__top-right">${pieceArrow}</div>
    </div>`;
};
