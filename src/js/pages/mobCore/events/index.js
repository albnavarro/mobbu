import { html, staticProps } from '../../../mobjs';

export const mobCore_events = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobCore/events.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobCore / <span>events</span></doc-title-small
        >
        <doc-title slot="section-title">Events</doc-title>
    </doc-container>`;
};
