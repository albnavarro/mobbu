import { html } from '@mobJs';

export const benchMarkGarbagePartial = () => {
    return html`
        <p>
            Generating a large number of components repeatedly can increase
            memory consumption until they are deleted and the garbage collector
            empties the memory.<br />
            ( max value <strong>2000</strong> ).
        </p>
    `;
};
