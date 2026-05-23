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
 * @param {HTMLElement} params.element
 * @param {import('../../../mob/mob-core/events/tab-handler/type').TabDirection} params.direction
 * @param {() => void} params.preventDefault
 */
export const tabLoopTrap = ({ element, direction, preventDefault }) => {
    const innerElement = [...element.querySelectorAll(focusableSelector)];
    if (innerElement.length === 0) return;

    const firstElement = innerElement[0];
    const lastElement = innerElement.at(-1);
    const activeElement = document.activeElement;

    if (direction === 'BACKWARD') {
        if (activeElement === firstElement) {
            preventDefault();
            if (lastElement) /** @type {HTMLElement} */ (lastElement).focus();
        }
    } else {
        if (activeElement === lastElement) {
            preventDefault();
            if (firstElement) /** @type {HTMLElement} */ (firstElement).focus();
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
    activeElement.focus();
};
