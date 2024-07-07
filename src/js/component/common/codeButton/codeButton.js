//@ts-check

// @ts-ignore
import codeIcon from '../../../../svg/icon-code.svg';
import { setStateByName } from '../../../mobjs';
import { navigationStore } from '../../layout/navigation/store/navStore';

/**
 * @type {import('../../../mobjs/type').mobComponent<import('./type').CodeButton>}
 */
export const CodeButtonFn = ({
    getState,
    watchSync,
    onMount,
    html,
    delegateEvents,
}) => {
    /**
     * @type {import('../../../mobjs/type').SetStateByName<import('../codeOverlay/type').CodeOverlay>}
     */
    const setCodeOvrlayState = setStateByName('codeOverlay');

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
                    setCodeOvrlayState('urls', drawers);
                },
            })}
        >
            <span class="c-code-btn__icon">${codeIcon}</span>
        </button>
    `;
};
