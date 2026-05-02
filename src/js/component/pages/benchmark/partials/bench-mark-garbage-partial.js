import { htmlObject } from '@mobJs';

/**
 * @param {number} maxComponent
 * @returns {HTMLElement}
 */
export const benchMarkGarbagePartial = (maxComponent = 1000) => {
    return htmlObject({
        tag: 'p',
        content: /* HTML */ `
            Generates and updates a large list of components with 5 reactive
            elements inside.<br />
            ( max component <strong>${maxComponent}</strong> ).
        `,
    });
};
