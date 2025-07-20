import { html } from '@mobJs';

export const benchMarkGarbagePartial = () => {
    return html`
        <p>
            Generates and updates a large list of components with 5 reactive
            elements inside.<br />
            ( max component <strong>1000</strong> ).
        </p>
    `;
};
