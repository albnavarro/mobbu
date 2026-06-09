/**
 * Close overlay
 *
 * @param {import('@mobJsType').ProxiSelfState<{ state: { controlsActive: boolean } }>} proxi
 */
export const createAsideEscHandler = (proxi) => {
    /** @param {KeyboardEvent} event */
    return function escHandler(event) {
        if (event?.code?.toLowerCase?.() === 'escape') {
            proxi.controlsActive = false;
            event.preventDefault();
        }
    };
};

const focusableSelector = [
    'a[href]',
    'button:not([disabled]):not([tabindex="-1"])',
    'input:not([disabled]):not([tabindex="-1"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * @param {object} params
 * @param {HTMLElement[]} params.elements
 * @param {import('../../../mob/mob-core/events/tab-handler/type').TabDirection} params.direction
 * @param {() => void} params.preventDefault
 */
export const tabLoopTrap = ({ elements, direction, preventDefault }) => {
    const innerElements = elements.flatMap((element) => [
        ...element.querySelectorAll(focusableSelector),
    ]);

    if (innerElements.length === 0) return;

    const firstElement = innerElements[0];
    const lastElement = innerElements.at(-1);
    const activeElement = document.activeElement;

    if (direction === 'BACKWARD') {
        if (activeElement === firstElement) {
            preventDefault();
            if (lastElement)
                /** @type {HTMLElement} */ (lastElement).focus({
                    preventScroll: true,
                });
        }
    } else {
        if (activeElement === lastElement) {
            preventDefault();
            if (firstElement)
                /** @type {HTMLElement} */ (firstElement).focus({
                    preventScroll: true,
                });
        }
    }
};

/**
 * @param {object} params
 * @param {HTMLElement} params.element
 * @param {string} params.activeClass
 */
export const setFocusInsideElement = ({ element, activeClass }) => {
    const activeElement = /** @type {HTMLElement} */ (
        element.querySelector(activeClass)
    );
    if (!activeElement) return;
    activeElement.focus({ preventScroll: true });
};

/**
 * @param {string} value
 */
export const removeSpanTags = (value) => {
    return value.replaceAll(/<span\b[^>]*>(.*?)<\/span>/gi, '$1');
};
