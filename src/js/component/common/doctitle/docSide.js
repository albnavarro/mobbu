//@ts-check

import { html } from '../../../mobjs';

/** @type {import("../../../mobjs/type").MobComponent} */
export const DocTitleFn = () => {
    return html`
        <div class="c-doc-title">
            <h2><mobjs-slot></mobjs-slot></h2>
        </div>
    `;
};
