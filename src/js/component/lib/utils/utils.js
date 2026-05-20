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
 * @param {HTMLElement} element
 */
export const getFocusTrapHandler = (element) => {
    /** @param {KeyboardEvent} event */
    return function trapHandler(event) {
        if (event.key !== 'Tab') return;

        const innerElement = [...element.querySelectorAll(focusableSelector)];
        if (innerElement.length === 0) return;

        const firstElement = innerElement[0];
        const lastElement = innerElement.at(-1);
        const activeElement = document.activeElement;

        if (event.shiftKey) {
            if (activeElement === firstElement) {
                event.preventDefault();
                if (lastElement)
                    /** @type {HTMLElement} */ (lastElement).focus();
            }
        } else {
            if (activeElement === lastElement) {
                event.preventDefault();
                if (firstElement)
                    /** @type {HTMLElement} */ (firstElement).focus();
            }
        }
    };
};
