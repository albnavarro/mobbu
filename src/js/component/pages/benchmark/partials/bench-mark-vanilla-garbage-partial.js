import { htmlObject } from '@mobJs';

/**
 * @param {number} maxComponent
 * @returns {HTMLElement}
 */
export const benchMarkVanillaGarbagePartial = (maxComponent = 1000) => {
    return htmlObject({
        tag: 'p',
        content: `
            Generates and updates a large list of vanilla HTML element with 4
            reactive elements inside.<br />
            ( max component <strong>${maxComponent}</strong> ).
        `,
    });
};
