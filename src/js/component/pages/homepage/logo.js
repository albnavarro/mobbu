import logo from '../../../../svg/logov3.svg';
import pieceArrow from '../../../../svg/piece-arrow.svg';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const HomeLogo = ({ html }) => {
    return html`<div>
        <div class="l-index__top-left">${pieceArrow}</div>
        <div class="l-index__logo">${logo}</div>
        <div class="l-index__top-right">${pieceArrow}</div>
    </div>`;
};
