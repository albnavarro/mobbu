import { html } from '@mobJs';

/** @type {import('@mobJsType').MobComponent} */
export const DocTitleFn = () => {
    return html`
        <div class="c-doc-title">
            <h2><mobjs-slot></mobjs-slot></h2>
        </div>
    `;
};
