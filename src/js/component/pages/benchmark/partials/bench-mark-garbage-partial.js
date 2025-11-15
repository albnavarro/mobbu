import { html } from '@mobJs';

/**
 * @param {number} maxComponent
 * @returns {string}
 */
export const benchMarkGarbagePartial = (maxComponent = 1000) => {
    return html`
        <p>
            Generates and updates a large list of components with 5 reactive
            elements inside.<br />
            ( max component <strong>${maxComponent}</strong> ).
        </p>
    `;
};
