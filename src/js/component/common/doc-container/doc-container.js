import { html } from '@mobJs';

/**
 * @import {MobComponent} from '@mobJsType';
 */

/** @type {MobComponent} */
export const DocContainerFn = () => {
    return html`
        <div class="c-doc-container">
            <div class="c-doc-container__right-sidebar">
                <right-sidebar></right-sidebar>
            </div>
            <div class="c-doc-container__content">
                <mobjs-slot name="docs"></mobjs-slot>
            </div>
            <div class="c-doc-container__side">
                <mobjs-slot name="section-title-small"></mobjs-slot>
                <mobjs-slot name="section-title"></mobjs-slot>
                <mobjs-slot name="section-links"></mobjs-slot>
            </div>
        </div>
    `;
};
