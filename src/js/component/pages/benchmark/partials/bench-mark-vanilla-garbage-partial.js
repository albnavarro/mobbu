import { html } from '@mobJs';

/**
 * @param {number} maxComponent
 * @returns {string}
 */
export const benchMarkVanillaGarbagePartial = (maxComponent = 1000) => {
    return html`
        <p>
            Generates and updates a large list of vanilla HTML element with 4
            reactive elements inside.<br />
            ( max component <strong>${maxComponent}</strong> ).
        </p>
    `;
};
