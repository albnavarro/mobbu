import codeIcon from '../../../../svg/icon-code.svg';
import { setStateById } from '../../../mobjs';
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
            const overlayCode = document.querySelector('.js-overlay');
            const { id } = overlayCode;

            /**
             * Update overlay urls state.
             */
            setStateById(id, 'urls', drawersMergedWithDefaults);

            /**
             * If description is active set to default active content.
             */
            if (drawersMergedWithDefaults.description.length)
                setStateById(id, 'activeContent', 'description');

            /**
             * Open overlay.
             */
            setStateById(id, 'isOpen', true);
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
