//@ts-check

import { html } from '../../../mob/mobjs';

/** @type {import("../../../mob/mobjs/type").MobComponent} */
export const DocTitleSmallFn = () => {
    return html`
        <div class="c-doc-title-small">
            <mobjs-slot></mobjs-slot>
        </div>
    `;
};
