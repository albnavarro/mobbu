import codeIcon from '../../../../svg/icon-code.svg';
import { getIdByInstanceName, setStateById } from '../../../mobjs';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const CodeButton = ({
    getState,
    watchSync,
    onMount,
    html,
    delegateEvents,
}) => {
    onMount(({ element }) => {
        watchSync('color', (value) => {
            if (value === 'black') {
                element.classList.remove('c-code-btn--white');
                element.classList.add('c-code-btn--black');
            }

            if (value === 'white') {
                element.classList.add('c-code-btn--white');
                element.classList.remove('c-code-btn--black');
            }
        });

        watchSync('drawers', (value) => {
            const isActive = value.length > 0;
            element.classList.toggle('active', isActive);
        });

        return () => {
            element.remove();
        };
    });

    return html`
        <button
            class="c-code-btn"
            ${delegateEvents({
                click: () => {
                    const { drawers } = getState();

                    /**
                     * Get overlay id.
                     */
                    const codeOverlayId = getIdByInstanceName('codeOverlay');

                    /**
                     * Update overlay urls state.
                     */
                    setStateById(codeOverlayId, 'urls', drawers);
                },
            })}
        >
            <span class="c-code-btn__icon">${codeIcon}</span>
        </button>
    `;
};
