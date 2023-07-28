import codeIcon from '../../../../svg/icon-code.svg';
import { getIdByInstanceName, setStateById } from '../../../mobjs';
import { overlayDrawers } from '../codeOverlay/definition';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const CodeButton = ({ getState, render, onMount }) => {
    const { style, drawers } = getState();

    /**
     * Props with nested object is not merged deep by mobJs
     * So merge with original data and set to '' is
     * props is not passed in component
     */
    const drawersMergedWithDefaults = overlayDrawers.reduce(
        (previous, current) => {
            return {
                ...previous,
                ...{ [current]: drawers?.[current] ?? '' },
            };
        },
        {}
    );

    onMount(({ element }) => {
        element.addEventListener('click', () => {
            /**
             * Get overlay id.
             */
            const codeOverlayId = getIdByInstanceName('codeOverlay');

            /**
             * Update overlay urls state.
             */
            setStateById(codeOverlayId, 'urls', drawersMergedWithDefaults);

            /**
             * If description is active set to default active content.
             */
            if (drawersMergedWithDefaults.description.length)
                setStateById(codeOverlayId, 'activeContent', 'description');

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
        <button class="c-code-btn c-code-btn--${style}">
            <span class="c-code-btn__icon">${codeIcon}</span>
        </button>
    `);
};
