import { html } from '@mobJs';

export const benchMarkGarbagePartial = () => {
    return html`
        <p>
            Generation of up to 2000 basic components with a reactive prop<br />
            Generating a large number of components repeatedly can increase
            memory consumption until they are deleted and the garbage collector
            empties the memory
        </p>
    `;
};
