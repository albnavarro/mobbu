import logo from '../../../../svg/logov9.svg';
import pieceArrow from '../../../../svg/piece-arrow.svg';
import { detectFirefox, detectSafari } from '../../../utils/utils';
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
        });

        play();

        return () => {
            destroy();
        };
    });

    return html`<div>
        <div class="l-index__top-left">${pieceArrow}</div>
        <div class="l-index__logo">${logo}</div>
        <div class="l-index__top-right">${pieceArrow}</div>
    </div>`;
};
