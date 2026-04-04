import { html } from '@mobJs';

/** @type {import('@mobJsType').MobComponent} */
export const DocTitleSmallFn = () => {
    return html`
        <div class="l-doc-breadcrumbs">
            <mobjs-slot></mobjs-slot>
        </div>
    `;
};
