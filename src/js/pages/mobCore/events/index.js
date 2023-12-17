import { html, staticProps } from '../../../mobjs';

export const mobCore_events = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: './data/mobCore/events.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobCore_overview">mobCore</a> / <span>Events</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Events</doc-title>
    </doc-container>`;
};
