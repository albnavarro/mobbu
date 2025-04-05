//@ts-check

import { html } from '@mobJs';

/** @type {import("@mobJsType").MobComponent<import("./type").HorizontalScrollerSection>} */
export const HorizontalScrollerSectionFn = ({ getState }) => {
    const { id, pinClass } = getState();

    return html`
        <section
            class="l-h-scroller__column js-column"
            data-shadow="section-${id}"
        >
            <div class="l-h-scroller__wrap">
                <span class="l-h-scroller__indicator js-indicator ${pinClass}">
                    <span></span>
                </span>
                <div class="l-h-scroller__title js-title">
                    <h1>${id}</h1>
                </div>
            </div>
        </section>
    `;
};
