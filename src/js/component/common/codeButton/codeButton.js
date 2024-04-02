import codeIcon from '../../../../svg/icon-code.svg';
import { getIdByInstanceName, setStateById } from '../../../mobjs';
import { navigationStore } from '../../layout/navigation/store/navStore';

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

        const unsubscribeOpenNav = navigationStore.watch(
            'openNavigation',
            () => {
                element.classList.remove('active');
            }
        );

        const unsubscribeCloseNav = navigationStore.watch(
            'closeNavigation',
            () => {
                const { drawers } = getState();
                if (drawers.length === 0) return;

                element.classList.add('active');
            }
        );

        return () => {
            unsubscribeCloseNav();
            unsubscribeOpenNav();
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
