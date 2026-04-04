//@ts-check

import { html } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').HorizontalScrollerSection>} */
export const HorizontalScrollerSectionFn = ({ getState }) => {
    const { id, pinClass } = getState();

    return html`
        <section class="column js-column" data-shadow="section-${id}">
            <div class="wrap">
                <span class="h-scroller-indicator js-indicator ${pinClass}">
                    <span></span>
                </span>
                <div class="title js-title">
                    <h1>${id}</h1>
                </div>
            </div>
        </section>
    `;
};
