import codeIcon from '../../../../svg/icon-code.svg';
import { getIdByInstanceName, setStateById } from '../../../mobjs';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const CodeButton = ({ getState, onMount, html }) => {
    const { style, drawers } = getState();

    onMount(({ element }) => {
        element.addEventListener('click', () => {
            /**
             * Get overlay id.
             */
            const codeOverlayId = getIdByInstanceName('codeOverlay');

            /**
             * Update overlay urls state.
             */
            setStateById(codeOverlayId, 'urls', drawers);

            /**
             * Open overlay.
             */
            setStateById(codeOverlayId, 'isOpen', true);
        });

        return () => {
            element.remove();
        };
    });

    return html`
        <button class="c-code-btn c-code-btn--${style}">
            <span class="c-code-btn__icon">${codeIcon}</span>
        </button>
    `;
};
