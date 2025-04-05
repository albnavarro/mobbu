//@ts-check

import { html } from '@mobJs';

/** @type {import("@mobJsType").MobComponent} */
export const DocTitleSmallFn = () => {
    return html`
        <div class="c-doc-title-small">
            <mobjs-slot></mobjs-slot>
        </div>
    `;
};
