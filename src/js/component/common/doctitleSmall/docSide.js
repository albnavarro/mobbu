//@ts-check

import { html } from '../../../mobjs';

/** @type {import("../../../mobjs/type").MobComponent} */
export const DocTitleSmallFn = () => {
    return html`
        <div class="c-doc-title-small">
            <mobjs-slot></mobjs-slot>
        </div>
    `;
};
