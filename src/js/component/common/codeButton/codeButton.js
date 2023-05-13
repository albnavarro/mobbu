import codeIcon from '../../../../svg/icon-code.svg';
import { getIdByName, setStateById } from '../../../mobjs';
import { overlayDrawers } from '../codeOverlay/definition';

/**
 * Create component
 */
export const CodeButton = ({ props, render, onMount }) => {
    const { style, drawers } = props;

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
            const codeOverlayId = getIdByName('codeOverlay');

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
