import codeIcon from '../../../../svg/icon-code.svg';
import { getIdByInstanceName, setStateById } from '../../../mobjs';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const CodeButton = ({ getState, render, onMount }) => {
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

    return render(/* HTML */ `
        <code-button class="c-code-btn c-code-btn--${style}">
            <span class="c-code-btn__icon">${codeIcon}</span>
        </code-button>
    `);
};
