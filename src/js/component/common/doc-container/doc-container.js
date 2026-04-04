import { html } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 */

/** @type {MobComponent} */
export const DocContainerFn = () => {
    return html`
        <div class="c-doc-container">
            <div class="left"></div>
            <div class="content">
                <mobjs-slot name="docs"></mobjs-slot>
            </div>
            <div class="right">
                <mobjs-slot name="section-title-small"></mobjs-slot>
                <mobjs-slot name="section-title"></mobjs-slot>
                <mobjs-slot name="section-links"></mobjs-slot>
            </div>
        </div>
    `;
};
