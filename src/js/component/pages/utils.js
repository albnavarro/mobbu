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
